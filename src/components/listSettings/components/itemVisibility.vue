<script setup>
defineProps({
  visibility: Boolean,
  itemNumber: Number
});
defineEmits(['changeVisibility']);
</script>

<template>
  <label class="item-visibility">
    <input
      class="item-visibility__value"
      type="checkbox"
      :checked="visibility"
      @change="
        $emit('changeVisibility', itemNumber - 1, 'visibility', !visibility)
      "
      @keyup.enter="
        $emit('changeVisibility', itemNumber - 1, 'visibility', !visibility)
      "
    />
    <h5 class="item-visibility__header">Item {{ itemNumber }}</h5>
  </label>
</template>

<style>
.item-visibility {
  display: flex;
  align-items: center;
  gap: calc(var(--base) * 0.08);
}

input[type='checkbox'].item-visibility__value {
  transition: none;
}

input[type='checkbox'].item-visibility__value:checked {
  background-image: url('/src/assets/images/check.svg');
  background-position: center;
  background-size: calc(var(--base) * 0.24);
}

.item-visibility__header {
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
}
</style>
