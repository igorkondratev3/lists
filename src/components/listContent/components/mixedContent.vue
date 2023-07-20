<script setup>
import { toRef } from 'vue';
import { useMixedContent } from '@/composables/listContent/mixedContent.js';
import { deleteSquare } from '@/helpers/listContent/content.js';

const props = defineProps({
  itemSettings: Array,
  listNumber: Number
});
defineEmits(['decreaseQuantity']);

const { mixedArrayOfColors, checkAndDeleteSquare } = useMixedContent(
  toRef(props, 'itemSettings')
);
</script>

<template>
  <div
    class="item-content"
    @click="deleteSquare(listNumber - 1, $event, $emit, checkAndDeleteSquare)"
  >
    <div
      class="item-content__square"
      v-for="(colorArr, colorKey) in mixedArrayOfColors"
      :key="`${listNumber}listMixed${colorKey + 1}square-color`"
      :data-color="colorArr[0]"
      :data-key="colorArr[1]"
      :data-colorkey="colorKey"
      :style="{
        'background-color': colorArr[0]
      }"
    ></div>
  </div>
</template>

<style>
/*стили в родителе*/
</style>
