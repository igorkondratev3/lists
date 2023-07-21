<script setup>
import { throttle } from '@/helpers/listSettings/inputs.js';

defineProps({
  color: String,
  itemNumber: Number
});
const emits = defineEmits(['changeColor']);
const throttledEmits = throttle(emits, 150);
</script>

<template>
  <input
    type="color"
    class="item-color"
    :value="color"
    @input="
      throttledEmits(
        'changeColor',
        itemNumber - 1,
        'color',
        $event.currentTarget.value
      )
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
