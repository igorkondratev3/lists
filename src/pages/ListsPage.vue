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
      used: ref(i === 0 && j < 3 ? true : false),
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

const changeItemsUsed = (listNumber, value) => {
  for (const itemSettings of listSettings[listNumber]) {
    itemSettings.used.value = value;
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
            @changeItemParameter="changeItemParameter"
            @changeItemsUsed="changeItemsUsed"
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
  font: 400 24px 'Advent Pro';
  letter-spacing: 0.065em;
  color: black;
}

.lists-page__main {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
}

.page-block {
  padding: 16px;
  min-height: 90vh;
  width: 40%;
  border: 1px solid black;
}
</style>
