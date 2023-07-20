<script setup>
import SortedContent from './components/sortedContent.vue';
import MixedContent from './components/mixedContent.vue';
import { useElementVisibility } from '@/composables/elementVisibility.js';

defineProps({
  listNumber: Number,
  itemSettings: Array
});
defineEmits(['decreaseQuantity']);

const {
  visibility: sortedContentVisibility,
  changeVisibility: changeSortedContentVisibility
} = useElementVisibility(true);
</script>

<template>
  <article class="list-content">
    <header class="list-content__header">
      <h5 class="list-content__name">List {{ listNumber }}</h5>
      <button
        class="list-content__mode-toggle"
        @click="changeSortedContentVisibility"
        v-show="itemSettings.some((item) => item.visibility.value)"
      >
        {{ sortedContentVisibility ? 'Перемешать' : 'Сортировать' }}
      </button>
    </header>
    <SortedContent
      v-if="sortedContentVisibility"
      :itemSettings="itemSettings"
      :listNumber="listNumber"
      @decreaseQuantity="
        (listKey, itemKey) => $emit('decreaseQuantity', listKey, itemKey)
      "
    />
    <MixedContent
      v-else
      :itemSettings="itemSettings"
      :listNumber="listNumber"
      @decreaseQuantity="
        (listKey, itemKey) => $emit('decreaseQuantity', listKey, itemKey)
      "
    />
  </article>
</template>

<style>
.list-content {
  width: 100%;
  margin-bottom: calc(var(--base) * 0.16);
  padding: calc(var(--base) * 0.08);
  border: calc(var(--base) * 0.01) solid black;
}

.list-content__header {
  display: flex;
  justify-content: space-between;
}

.list-content__name {
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
}

.list-content__mode-toggle {
  min-width: calc(var(--base) * 1.2);
  padding: calc(var(--base) * 0.08);
  border: none;
  border-radius: calc(var(--base) * 0.08);
  font: inherit;
  font-size: calc(var(--base) * 0.16);
  letter-spacing: inherit;
  color: white;
  cursor: pointer;
  background-color: #18a0fb;
}

.list-content__mode-toggle:focus-visible {
  outline: calc(var(--base) * 0.02) solid black;
  outline-offset: calc(var(--base) * 0.02);
}

.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--base) * 0.02);
  margin-top: calc(var(--base) * 0.08);
}

.item-content__square {
  height: calc(var(--base) * 0.16);
  width: calc(var(--base) * 0.16);
}
</style>
