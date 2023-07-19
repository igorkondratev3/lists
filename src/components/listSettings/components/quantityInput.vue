<script setup>
defineProps({
  quantity: Number,
  itemNumber: Number
});
defineEmits(['changeQuantity']);
</script>

<template>
  <input
    class="count-elements"
    type="number"
    min="1"
    max="99"
    :value="quantity"
    @input="
      $emit(
        'changeQuantity',
        itemNumber - 1,
        'quantity',
        Number($event.currentTarget.value)
      )
    "
  />
</template>

<style>
.count-elements {
  width: 32px;
  -moz-appearance: textfield;
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
  border: none;
  margin-right: 4px;
  background-color: inherit;
  text-align: center;
}

.count-elements::-webkit-outer-spin-button,
.count-elements::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
