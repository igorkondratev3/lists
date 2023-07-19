<script setup>
defineProps({
  used: Boolean,
  itemNumber: Number
});
defineEmits(['changeUsed']);
</script>

<template>
  <label class="lab-item">
    <input
      class="item-check"
      type="checkbox"
      :checked="used"
      @change="$emit('changeUsed', itemNumber - 1, 'used', !used)"
    />
    Item {{ itemNumber }}
  </label>
</template>

<style>
input[type='checkbox'].item-check:checked {
  background: url('/src/assets/images/check.svg');
  background-position: center;
  background-size: calc(var(--base) * 0.24);
}
</style>
