<script setup>
import { computed } from 'vue';

const props = defineProps({
  listNumber: Number,
  itemsUsed: Array
});
const emits = defineEmits(['changeItemsUsed']);

const listChecked = computed(() => props.itemsUsed.includes(true));

const changeListChecked = (event) => {
  if (!props.itemsUsed.includes(false)) {
    emits('changeItemsUsed', false);
    return;
  }
  if (!props.itemsUsed.includes(true)) {
    emits('changeItemsUsed', true);
    return;
  }
  event.preventDefault();
  emits('changeItemsUsed', true);
};
</script>

<template>
  <label>
    <input
      class="list-check"
      :class="{
        'list-check_some':
          props.itemsUsed.includes(true) && props.itemsUsed.includes(false)
      }"
      type="checkbox"
      :checked="listChecked"
      @click="changeListChecked"
    />
    List {{ props.listNumber }}
  </label>
</template>

<style>
input[type='checkbox'].list-check:checked {
  background: rgb(66, 63, 63);
}

input[type='checkbox'].list-check_some:checked {
  background: radial-gradient(circle at center, black 40%, transparent 41%);
}
</style>
