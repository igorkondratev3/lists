import { computed, watch, unref, ref } from 'vue';
import { getRandomIntInclusive } from '@/helpers/common.js';

export const useMixedContent = (itemSettings) => {
  const currentMixedArrayOfColors = computed(() => {
    const usedItemsSettings = getUsedItemsSettings(itemSettings.value);
    const sumQuantities = usedItemsSettings.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return getMixedArrayOfColors(usedItemsSettings, sumQuantities);
  });

  const mixedArrayOfColors = ref(
    structuredClone(currentMixedArrayOfColors.value)
  );

  let customSquareDelete = ref(false);
  const deleteOneSquare = (colorKey) => {
    mixedArrayOfColors.value.splice(colorKey, 1);
    customSquareDelete.value = true;
  };

  const itemSettingsClone = itemSettings.value.map((item) => ({
    visibility: item.visibility.value,
    color: item.color.value,
    quantity: item.quantity.value,
    key: item.key
  }));

  watch(currentMixedArrayOfColors, () => {
    const changedParameter = getChangedParameter(
      itemSettings.value,
      itemSettingsClone
    );

    if (changedParameter.param === 'color')
      changeColor(
        mixedArrayOfColors.value,
        changedParameter,
        itemSettingsClone
      );

    if (changedParameter.param === 'visibility')
      changeVisibility(
        mixedArrayOfColors,
        currentMixedArrayOfColors,
        changedParameter,
        itemSettingsClone
      );

    if (changedParameter.param === 'quantity') {
      changeQuantity(
        mixedArrayOfColors,
        currentMixedArrayOfColors,
        changedParameter,
        itemSettingsClone,
        customSquareDelete
      );
    }
  });

  return { mixedArrayOfColors, deleteOneSquare };
};

const getUsedItemsSettings = (itemSettings) =>
  itemSettings
    .filter((item) => item.quantity.value > 0 && item.visibility.value)
    .map((item) => ({
      visibility: item.visibility.value,
      color: item.color.value,
      quantity: item.quantity.value,
      key: item.key
    }));

const getMixedArrayOfColors = (usedItemsSettings, sumQuantities) => {
  const result = [];
  for (let i = 1; i <= sumQuantities; i++) {
    const itemKey = getRandomIntInclusive(0, usedItemsSettings.length - 1);
    result.push([
      usedItemsSettings[itemKey].color,
      usedItemsSettings[itemKey].key
    ]);
    usedItemsSettings[itemKey].quantity--;
    if (usedItemsSettings[itemKey].quantity === 0) {
      usedItemsSettings.splice(itemKey, 1);
    }
  }
  return result;
};

const getChangedParameter = (itemSettings, itemSettingsClone) => {
  const changedParameter = {};
  loop1: for (let i = 0; i < itemSettingsClone.length; i++) {
    for (const key in itemSettingsClone[i]) {
      if (itemSettingsClone[i][key] !== unref(itemSettings[i][key])) {
        changedParameter.param = key;
        changedParameter.old = itemSettingsClone[i][key];
        changedParameter.new = itemSettings[i][key].value;
        changedParameter.keyItem = i;
        break loop1;
      }
    }
  }
  return changedParameter;
};

const changeColor = (
  mixedArrayOfColors,
  changedParameter,
  itemSettingsClone
) => {
  for (const colorArr of mixedArrayOfColors) {
    if (colorArr[1] === changedParameter.keyItem) {
      colorArr[0] = changedParameter.new;
    }
  }
  itemSettingsClone[changedParameter.keyItem].color = changedParameter.new;
};

const changeVisibility = (
  mixedArrayOfColors,
  currentMixedArrayOfColors,
  changedParameter,
  itemSettingsClone
) => {
  if (changedParameter.new) {
    mixedArrayOfColors.value = structuredClone(currentMixedArrayOfColors.value);
  } else {
    for (let i = 0; i < mixedArrayOfColors.value.length; i++) {
      if (mixedArrayOfColors.value[i][1] === changedParameter.keyItem) {
        mixedArrayOfColors.value.splice(i, 1);
        i--;
      }
    }
  }
  itemSettingsClone[changedParameter.keyItem].visibility = changedParameter.new;
};

const changeQuantity = (
  mixedArrayOfColors,
  currentMixedArrayOfColors,
  changedParameter,
  itemSettingsClone,
  customSquareDelete
) => {
  if (customSquareDelete.value) customSquareDelete.value = false;
  else
    mixedArrayOfColors.value = structuredClone(currentMixedArrayOfColors.value);

  itemSettingsClone[changedParameter.keyItem].quantity = changedParameter.new;
};
