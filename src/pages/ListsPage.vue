<script setup>
import { ref } from 'vue';
import ListSettings from '@/components/listSettings/listSettings.vue';
import ListContent from '@/components/listContent/listContent.vue';
import { getRandomIntInclusive } from '@/helpers/common.js';

const colorCollection = [
  '#ca5d5d',
  '#f0ade2',
  '#7320ee',
  '#a8c2ff',
  '#5ec9f7',
  '#04fba9',
  '#47eaf5',
  '#c7fb93',
  '#fde90d',
  '#ffcf99'
];

const numberOfLists = 5;
const minNumberOfItems = 4;
const maxNumberOfItems = 10;
const minNumberOfSquares = 0;
const maxNumberOfSquares = 99;
const listSettings = [];
for (let i = 0; i < numberOfLists; i++) {
  listSettings[i] = [];
  for (
    let j = 0;
    j < getRandomIntInclusive(minNumberOfItems, maxNumberOfItems);
    j++
  ) {
    listSettings[i][j] = {
      visibility: ref(i === 0 && j < 3 ? true : false),
      quantity: ref(
        getRandomIntInclusive(minNumberOfSquares, maxNumberOfSquares)
      ),
      color: ref(
        colorCollection[getRandomIntInclusive(0, colorCollection.length - 1)]
      )
    };
  }
}

const changeItemParameter = (listNumber, itemNumber, parameter, value) => {
  listSettings[listNumber][itemNumber][parameter].value = value;
};

const changeItemVisibility = (listNumber, value) => {
  for (const itemSettings of listSettings[listNumber]) {
    itemSettings.visibility.value = value;
  }
};
const decreaseQuantity = (listKey, itemKey) => {
  listSettings[listKey][itemKey].quantity.value--;
};
</script>

<template>
  <div class="lists-page">
    <main class="lists-page__main">
      <div class="page-block">
        <ul class="list-settings-wrapper">
          <ListSettings
            v-for="(list, keyList) of listSettings"
            :key="keyList + 'listParams'"
            :itemSettings="list"
            :listNumber="keyList + 1"
            :minNumberOfSquares="minNumberOfSquares"
            :maxNumberOfSquares="maxNumberOfSquares"
            @changeItemParameter="changeItemParameter"
            @changeItemVisibility="changeItemVisibility"
          />
        </ul>
      </div>
      <div class="page-block">
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
.list-settings-wrapper {
  list-style-type: none;
}
.lists-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--base) * 0.16);
  font: 400 calc(var(--base) * 0.24) 'Advent Pro';
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

.page-block {
  overflow-y: auto;
  padding: calc(var(--base) * 0.16);
  height: 90vh;
  width: 40%;
  border: calc(var(--base) * 0.01) solid black;
}
</style>
