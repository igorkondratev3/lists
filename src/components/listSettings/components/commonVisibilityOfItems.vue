<script setup>
import { toRef } from 'vue';
import { useCommonVisibility } from '@/composables/listSettings/commonVisibility.js';

const props = defineProps({
  listNumber: Number,
  itemVisibility: Array
});
const emits = defineEmits(['changeItemVisibility']);

const { someItemsShown, someItemsHidden, changeCommonVisibility } =
  useCommonVisibility(toRef(props, 'itemVisibility'), emits);
</script>

<template>
  <label class="common-visibility">
    <input
      class="common-visibility__value"
      :class="{
        'common-visibility__value_both': someItemsShown && someItemsHidden
      }"
      type="checkbox"
      :checked="someItemsShown"
      @click="changeCommonVisibility"
      @keyup.enter="changeCommonVisibility"
    />
    <h5 class="common-visibility__header">List {{ listNumber }}</h5>
  </label>
</template>

<style>
input[type='checkbox'].common-visibility__value:checked {
  background: rgb(66, 63, 63);
}

input[type='checkbox'].common-visibility__value_both:checked {
  background: radial-gradient(circle at center, black 40%, transparent 41%);
}

.common-visibility {
  display: flex;
  align-items: center;
  gap: calc(var(--base) * 0.08);
}

.common-visibility__header {
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
}
</style>
