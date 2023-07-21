<script setup>
import { quantityNormalize } from '@/helpers/listSettings/inputs.js';
import { throttle } from '@/helpers/listSettings/inputs.js';

defineProps({
  quantity: Number,
  itemNumber: Number,
  minNumberOfSquares: Number,
  maxNumberOfSquares: Number
});
const emits = defineEmits(['changeQuantity']);
const throttledEmits = throttle(emits, 150);
</script>

<template>
  <input
    class="item-quantity"
    type="number"
    :min="String(minNumberOfSquares)"
    :max="String(maxNumberOfSquares)"
    :value="quantity"
    @input="
      throttledEmits(
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

.item-quantity:focus {
  outline: calc(var(--base) * 0.02) solid black;
}
</style>
