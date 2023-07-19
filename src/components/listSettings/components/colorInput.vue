<script setup>
defineProps({
  color: String
});
defineEmits(['changeColor']);
</script>

<template>
  <input
    type="color"
    class="color-input"
    :value="color"
    @input="$emit('changeColor', $event.currentTarget.value)"
  />
</template>

<style>
.color-input {
  width: 24px;
  border: none;
}
</style>
