<script setup>
import { computed } from 'vue';
import { deleteSquare } from '@/helpers/listContent/content.js';

const props = defineProps({
  itemSettings: Array,
  listNumber: Number
});
defineEmits(['decreaseQuantity']);

const sortedItemSettings = computed(() =>
  props.itemSettings.toSorted(
    (itemOne, itemTwo) => itemOne.quantity.value - itemTwo.quantity.value
  )
);
</script>

<template>
  <template
    v-for="(item, itemKey) of sortedItemSettings"
    :key="`${listNumber}listSorted${itemKey + 1}item`"
  >
    <div
      class="item-content"
      v-if="item.visibility.value"
      :data-item_key="item.key"
      @click="deleteSquare(listNumber - 1, $event, $emit)"
    >
      <div
        v-for="squareNumber in item.quantity.value"
        :key="`${listNumber}listSotred${itemKey + 1}item${squareNumber}square`"
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
