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
    class="color-input"
    :value="color"
    @input="
      $emit('changeColor', itemNumber - 1, 'color', $event.currentTarget.value)
    "
  />
</template>

<style>
.color-input {
  width: 24px;
  border: none;
}
</style>
