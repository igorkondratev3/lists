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
      v-for="(squareArr, squareKey) in mixedArrayOfColors"
      :key="`${listNumber}listMixed${squareKey + 1}square`"
      :data-color="squareArr[0]"
      :data-item_key="squareArr[1]"
      :data-square_key="squareKey"
      :style="{
        'background-color': squareArr[0]
      }"
    ></div>
  </div>
</template>

<style>
/*стили в родителе*/
</style>
