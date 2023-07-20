<script setup>
import { deleteSquare } from '@/helpers/listContent/content.js';

defineProps({
  itemSettings: Array,
  listNumber: Number
});

defineEmits(['decreaseQuantity']);
</script>

<template>
  <template
    v-for="(item, itemKey) of itemSettings.toSorted(
      (a, b) => a.quantity.value - b.quantity.value
    )"
    :key="`${listNumber}listSorted${itemKey}itemContent`"
  >
    <div
      class="item-content"
      v-if="item.visibility.value"
      :data-key="item.key"
      @click="deleteSquare(listNumber - 1, $event, $emit)"
    >
      <div
        v-for="n in item.quantity.value"
        :key="`${listNumber}listSotred${n}square-color`"
        class="item-content__square"
        :style="{
          'background-color': item.color.value
        }"
      ></div>
    </div>
  </template>
</template>

<style>
/*стили в родителе*/
</style>
