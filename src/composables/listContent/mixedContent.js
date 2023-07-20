import { computed, watch, unref, ref } from 'vue';
import { getRandomIntInclusive } from '@/helpers/common.js';

export const useMixedContent = (itemSettings) => {
  const customDelete = ref(false);

  const checkAndDeleteSquare = (colorKey) => {
    if (customDelete.value === false) {
      mixedArrayOfColors.value.splice(colorKey, 1);
      customDelete.value = true;
    }
  };

  const itemSettingsClone = structuredClone(
    itemSettings.value.map((item) => ({
      visibility: item.visibility.value,
      color: item.color.value,
      quantity: item.quantity.value,
      key: item.key
    }))
  );

  const mixedArrayOfColorsForWatch = computed(() => {
    const result = [];
    const usedItemsSettings = structuredClone(
      itemSettings.value
        .map((item) => ({
          visibility: item.visibility.value,
          color: item.color.value,
          quantity: item.quantity.value,
          key: item.key
        }))
        .filter((item) => item.quantity > 0 && item.visibility)
    );
    const sumQuantities = usedItemsSettings.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    for (let i = 1; i <= sumQuantities; i++) {
      const itemNum = getRandomIntInclusive(0, usedItemsSettings.length - 1);
      result.push([
        usedItemsSettings[itemNum].color,
        usedItemsSettings[itemNum].key
      ]);
      usedItemsSettings[itemNum].quantity--;
      if (usedItemsSettings[itemNum].quantity === 0) {
        usedItemsSettings.splice(itemNum, 1);
      }
    }
    return result;
  });

  watch(mixedArrayOfColorsForWatch, () => {
    const data = {};
    loop1: for (let i = 0; i < itemSettingsClone.length; i++) {
      for (const key in itemSettingsClone[i]) {
        if (itemSettingsClone[i][key] !== unref(itemSettings.value[i][key])) {
          data.param = key;
          data.old = itemSettingsClone[i][key];
          data.new = itemSettings.value[i][key].value;
          data.keyItem = i;
          break loop1;
        }
      }
    }
    if (data.param === 'color') {
      for (const colorArr of mixedArrayOfColors.value) {
        if (colorArr[1] === data.keyItem) {
          colorArr[0] = data.new;
        }
      }
      itemSettingsClone[data.keyItem].color = data.new;
    }

    if (data.param === 'visibility') {
      if (data.new) {
        mixedArrayOfColors.value = structuredClone(
          mixedArrayOfColorsForWatch.value
        );
      } else {
        for (let i = 0; i < mixedArrayOfColors.value.length; i++) {
          if (mixedArrayOfColors.value[i][1] === data.keyItem) {
            mixedArrayOfColors.value.splice(i, 1);
            i--;
          }
        }
      }
      itemSettingsClone[data.keyItem].visibility = data.new;
    }

    if (data.param === 'quantity') {
      if (data.new > data.old) {
        mixedArrayOfColors.value = structuredClone(
          mixedArrayOfColorsForWatch.value
        );
      } else {
        if (customDelete.value) {
          customDelete.value = false;
        } else {
          mixedArrayOfColors.value = structuredClone(
            mixedArrayOfColorsForWatch.value
          );
        }
      }
      itemSettingsClone[data.keyItem].quantity = data.new;
    }
  });

  const mixedArrayOfColors = ref([]);
  const usedItemsSettings = structuredClone(
    itemSettings.value
      .map((item) => ({
        visibility: item.visibility.value,
        color: item.color.value,
        quantity: item.quantity.value,
        key: item.key
      }))
      .filter((item) => item.quantity > 0 && item.visibility)
  );
  const sumQuantities = usedItemsSettings.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  for (let i = 1; i <= sumQuantities; i++) {
    const itemNum = getRandomIntInclusive(0, usedItemsSettings.length - 1);
    mixedArrayOfColors.value.push([
      usedItemsSettings[itemNum].color,
      usedItemsSettings[itemNum].key
    ]);
    usedItemsSettings[itemNum].quantity--;
    if (usedItemsSettings[itemNum].quantity === 0) {
      usedItemsSettings.splice(itemNum, 1);
    }
  }
  return { mixedArrayOfColors, checkAndDeleteSquare };
};
