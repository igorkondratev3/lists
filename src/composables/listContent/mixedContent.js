import { computed } from 'vue';
import { getRandomIntInclusive } from '@/helpers/common.js';

export const useMixedContent = (itemSettings) => {
  const mixedArrayOfColors = computed(() => {
    const result = [];
    const usedItemsSettings = structuredClone(
      itemSettings.value
        .map((item) => ({
          visibility: item.visibility.value,
          color: item.color.value,
          quantity: item.quantity.value
        }))
        .filter((item) => item.quantity > 0 && item.visibility)
    );
    const sumQuantities = usedItemsSettings.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    for (let i = 1; i <= sumQuantities; i++) {
      const itemNum = getRandomIntInclusive(0, usedItemsSettings.length - 1);
      result.push(usedItemsSettings[itemNum].color);
      usedItemsSettings[itemNum].quantity--;
      if (usedItemsSettings[itemNum].quantity === 0) {
        usedItemsSettings.splice(itemNum, 1);
      }
    }
    return result;
  });

  return mixedArrayOfColors;
};
