<script setup>
import { computed } from 'vue';
import { getRandomIntInclusive } from '@/helpers/common.js';

const props = defineProps({
  itemSettings: Array,
  listNumber: Number
});

const emits = defineEmits(['decreaseQuantity']);

const commonArraySquares = computed(() =>
  props.itemSettings.map((item) => ({
    visibility: item.visibility.value,
    color: item.color.value,
    quantity: item.quantity.value
  }))
);

const randomContent = computed(() => {
  const result = [];
  const correctData = structuredClone(
    commonArraySquares.value.filter((item) => item.quantity > 0 && item.visibility)
  );
  const sum = correctData.reduce((acc, item) => acc + item.quantity, 0);
  for (let i = 1; i <= sum; i++) {
    const numItem = getRandomIntInclusive(0, correctData.length - 1);
    result.push(correctData[numItem].color);
    correctData[numItem].quantity--;
    if (correctData[numItem].quantity === 0) {
      correctData.splice(numItem, 1);
    }
  }
  return result;
});

const deleteSquare = (listKey, itemKey, event) => {
  if (event.target.className === 'square') {
    emits('decreaseQuantity', listKey, itemKey);
  }
};
</script>

<template>
  <div class="item-content">
    <div
      class="square"
      v-for="(color, colorKey) in randomContent"
      :key="`${listNumber}-${colorKey + 1}square-color`"
      :style="{
        'background-color': color
      }"
      @click="
        deleteSquare(
          listNumber - 1,
          itemSettings.findIndex(
            (item) => item.color.value === color && item.quantity.value > 0
          ),
          $event
        )
      "
    ></div>
  </div>
</template>

<style>
/*стили в родителе*/
</style>
