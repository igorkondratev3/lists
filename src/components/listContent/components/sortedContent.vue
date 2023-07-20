<script setup>
defineProps({
  itemSettings: Array,
  listNumber: Number
});

const emits = defineEmits(['decreaseQuantity']);

const deleteSquare = (listKey, itemKey, event) => {
  if (event.target.className === 'square') {
    emits('decreaseQuantity', listKey, itemKey);
  }
};
</script>

<template>
  <template
    v-for="(item, itemKey) of itemSettings.toSorted(
      (a, b) => a.quantity.value - b.quantity.value
    )"
    :key="`itemContent${itemKey}`"
  >
    <div
      class="item-content"
      v-if="item.visibility.value"
      @click="
        deleteSquare(
          listNumber - 1,
          itemSettings.findIndex(
            (setting) =>
              item.color.value === setting.color.value &&
              setting.quantity.value === item.quantity.value
          ),
          $event
        )
      "
    >
      <div
        class="square"
        :style="{
          'background-color': item.color.value
        }"
        v-for="n in item.quantity.value"
        :key="`${listNumber}-${itemKey + 1}-${n}square`"
      ></div>
    </div>
  </template>
</template>

<style>
/*стили в родителе*/
</style>
