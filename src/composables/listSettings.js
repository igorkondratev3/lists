import { ref } from 'vue';
import { getRandomIntInclusive } from '@/helpers/common.js';

export const useListSettings = () => {
  const squaresRange = {
    min: 0,
    max: 99
  };
  const listSettings = getListSettings(squaresRange);

  const changeItemParameter = (listNumber, itemNumber, parameter, value) => {
    listSettings[listNumber][itemNumber][parameter].value = value;
  };

  const changeItemVisibility = (listNumber, value) => {
    for (const itemSettings of listSettings[listNumber]) {
      itemSettings.visibility.value = value;
    }
  };
  const decreaseQuantity = (listKey, itemKey) => {
    listSettings[listKey][itemKey].quantity.value--;
  };

  return {
    squaresRange,
    listSettings,
    changeItemParameter,
    changeItemVisibility,
    decreaseQuantity
  };
};

const numberOfLists = 5;
const minNumberOfItems = 4;
const maxNumberOfItems = 10;
const colorCollection = [
  '#ca5d5d',
  '#f0ade2',
  '#7320ee',
  '#a8c2ff',
  '#5ec9f7',
  '#04fba9',
  '#47eaf5',
  '#c7fb93',
  '#fde90d',
  '#ffcf99'
];

const getListSettings = (squaresRange) => {
  const listSettings = [];
  for (let i = 0; i < numberOfLists; i++) {
    listSettings[i] = [];
    const numberOfItems = getRandomIntInclusive(
      minNumberOfItems,
      maxNumberOfItems
    );
    for (let j = 0; j < numberOfItems; j++) {
      listSettings[i][j] = {
        visibility: ref(i === 0 && j < 3 ? true : false),
        quantity: ref(
          getRandomIntInclusive(squaresRange.min, squaresRange.max)
        ),
        color: ref(
          colorCollection[getRandomIntInclusive(0, colorCollection.length - 1)]
        )
      };
    }
  }
  return listSettings;
};
