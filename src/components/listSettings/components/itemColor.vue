<script setup>
defineProps({
  color: String,
  itemNumber: Number
});
defineEmits(['changeColor']);
</script>

<template>
  <input
    type="color"
    class="item-color"
    :value="color"
    @input="
      $emit('changeColor', itemNumber - 1, 'color', $event.currentTarget.value)
    "
  />
</template>

<style>
.item-color {
  width: calc(var(--base) * 0.24);
  height: calc(var(--base) * 0.24);
  border: none;
}

.item-color:focus-visible {
  outline: calc(var(--base) * 0.02) solid black;
  outline-offset: calc(var(--base) * 0.02);
}
</style>
