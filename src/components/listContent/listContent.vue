<script setup>
import { ref } from 'vue';
import SortedContent from './components/sortedContent.vue';
import MixedContent from './components/mixedContent.vue';

defineProps({
  listNumber: Number,
  itemSettings: Array
});
defineEmits(['decreaseQuantity']);

const isRandom = ref(false);
const changeRandom = () => {
  isRandom.value = !isRandom.value;
};
</script>

<template>
  <div class="list-content">
    <header class="list-content__header">
      <h5 class="list-content__name">List {{ listNumber }}</h5>
      <button
        class="list-content__sort"
        @click="changeRandom"
        v-if="itemSettings.some((item) => item.visibility.value)"
      >
        {{ isRandom ? 'Сортировать' : 'Перемешать' }}
      </button>
    </header>
    <SortedContent
      v-if="!isRandom"
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
  </div>
</template>

<style>
.list-content {
  width: 100%;
  border: calc(var(--base) * 0.01) solid black;
  margin-bottom: calc(var(--base) * 0.16);
  padding: calc(var(--base) * 0.08);
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

.list-content__sort {
  font: inherit;
  letter-spacing: inherit;
  color: white;
  font-size: calc(var(--base) * 0.14);
  background-color: #18a0fb;
  border: none;
  border-radius: calc(var(--base) * 0.08);
  padding: calc(var(--base) * 0.08);
  width: calc(var(--base) * 1.1);
}

.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--base) * 0.02);
  margin-top: calc(var(--base) * 0.08);
}

.square {
  height: calc(var(--base) * 0.16);
  width: calc(var(--base) * 0.16);
}
</style>
