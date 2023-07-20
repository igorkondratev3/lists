<script setup>
import { quantityNormalize } from '@/helpers/listSettings/inputs.js';

defineProps({
  quantity: Number,
  itemNumber: Number,
  minNumberOfSquares: Number,
  maxNumberOfSquares: Number
});
defineEmits(['changeQuantity']);
</script>

<template>
  <input
    class="item-quantity"
    type="number"
    :min="String(minNumberOfSquares)"
    :max="String(maxNumberOfSquares)"
    :value="quantity"
    @input="
      $emit(
        'changeQuantity',
        itemNumber - 1,
        'quantity',
        quantityNormalize(
          $event,
          quantity,
          minNumberOfSquares,
          maxNumberOfSquares
        )
      )
    "
  />
</template>

<style>
.item-quantity {
  width: calc(var(--base) * 0.32);
  border: none;
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
  text-align: center;
  background-color: inherit;
  -moz-appearance: textfield;
}

.item-quantity::-webkit-outer-spin-button,
.item-quantity::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
