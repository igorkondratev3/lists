<script setup>
import { toRef } from 'vue';
import { useMixedContent } from '@/composables/listContent/mixedContent.js';
import { deleteSquare } from '@/helpers/listContent/content.js';

const props = defineProps({
  itemSettings: Array,
  listNumber: Number
});
defineEmits(['decreaseQuantity']);

const mixedArrayOfColors = useMixedContent(toRef(props, 'itemSettings'));
</script>

<template>
  <div
    class="item-content"
    @click="deleteSquare(itemSettings, listNumber - 1, $event, $emit)"
  >
    <div
      class="item-content__square"
      v-for="(color, colorKey) in mixedArrayOfColors"
      :key="`${listNumber}listMixed${colorKey + 1}square-color`"
      :data-color="color"
      :style="{
        'background-color': color
      }"
    ></div>
  </div>
</template>

<style>
/*стили в родителе*/
</style>
