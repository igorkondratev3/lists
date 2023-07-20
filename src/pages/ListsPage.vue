<script setup>
import ListSettings from '@/components/listSettings/listSettings.vue';
import ListContent from '@/components/listContent/listContent.vue';
import { useListSettings } from '@/composables/listSettings.js';

const {
  squaresRange,
  listSettings,
  changeItemParameter,
  changeItemVisibility,
  decreaseQuantity
} = useListSettings();
</script>

<template>
  <div class="lists-page">
    <main class="lists-page__main">
      <div class="lists-page__block">
        <ul class="list-of-list-settings">
          <ListSettings
            v-for="(list, keyList) of listSettings"
            :key="keyList + 'listParams'"
            :itemSettings="list"
            :listNumber="keyList + 1"
            :minNumberOfSquares="squaresRange.min"
            :maxNumberOfSquares="squaresRange.max"
            @changeItemParameter="changeItemParameter"
            @changeItemVisibility="changeItemVisibility"
          />
        </ul>
      </div>
      <div class="lists-page__block">
        <ListContent
          v-for="(list, listKey) of listSettings"
          :key="`listContent${listKey}`"
          :listNumber="listKey + 1"
          :itemSettings="list"
          @decreaseQuantity="decreaseQuantity"
        />
      </div>
    </main>
  </div>
</template>

<style>
.lists-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--base) * 0.16);
  font: 400 calc(var(--base) * 0.24) 'Advent ProLA', 'Advent ProCY';
  letter-spacing: 0.065em;
  color: black;
}

.lists-page__main {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--base) * 0.16);
  justify-content: space-between;
  align-items: flex-start;
}

.lists-page__block {
  height: 90vh;
  width: 40%;
  padding: calc(var(--base) * 0.16);
  border: calc(var(--base) * 0.01) solid black;
  overflow-y: auto;
}

.list-of-list-settings {
  list-style-type: none;
}
</style>
