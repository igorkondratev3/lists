<script setup>
import { toRef } from 'vue';
import { useMixedContent } from '@/composables/listContent/mixedContent.js';
import { deleteSquare } from '@/helpers/listContent/content.js';

const props = defineProps({
  itemSettings: Array,
  listNumber: Number
});
defineEmits(['decreaseQuantity']);

const { mixedArrayOfColors, deleteOneSquare } = useMixedContent(
  toRef(props, 'itemSettings')
);
</script>

<template>
  <div
    class="item-content"
    @click="deleteSquare(listNumber - 1, $event, $emit, deleteOneSquare)"
  >
    <div
      class="item-content__square"
      v-for="(colorArr, squareKey) in mixedArrayOfColors"
      :key="`${listNumber}listMixed${squareKey + 1}square-color`"
      :data-color="colorArr[0]"
      :data-item_key="colorArr[1]"
      :data-square_key="squareKey"
      :style="{
        'background-color': colorArr[0]
      }"
    ></div>
  </div>
</template>

<style>
/*стили в родителе*/
</style>
