<script setup>
import { ref, computed } from 'vue';
import ListSettings from '@/components/listSettings/listSettings.vue';
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
const commonArraySquares = [];
const isRandom = [];
const randomContent = [];
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
  commonArraySquares[i] = computed(() =>
    listSettings[i].map((item) => ({
      used: item.used.value,
      color: item.color.value,
      quantity: item.quantity.value
    }))
  );
  isRandom[i] = ref(false);
  randomContent[i] = computed(() => {
    const result = [];
    const correctData = structuredClone(
      commonArraySquares[i].value.filter(
        (item) => item.quantity > 0 && item.used
      )
    );
    const sum = correctData.reduce((acc, item) => acc + item.quantity, 0);
    for (let i = 1; i <= sum; i++) {
      const numItem = getRandomIntInclusive(0, correctData.length - 1);
      result.push(correctData[numItem].color);
      correctData[numItem].quantity--;
      if (correctData[numItem].quantity === 0) {
        correctData.splice(numItem, 1);
      }
    }
    return result;
  });
}

const deleteSquare = (keyList, keyItem, event) => {
  if (event.target.className === 'square') {
    listSettings[keyList][keyItem].quantity.value--;
  }
};

const changeRandom = (keyList) => {
  isRandom[keyList].value = !isRandom[keyList].value;
};

const changeItemParameter = (listNumber, itemNumber, parameter, value) => {
  listSettings[listNumber][itemNumber][parameter].value = value;
};

const changeItemsUsed = (listNumber, value) => {
  for (const itemSettings of listSettings[listNumber]) {
    itemSettings.used.value = value;
  }
};
</script>

<template>
  <div class="lists-page">
    <main class="lists-page__main">
      <div class="page-block">
        <ListSettings
          v-for="(list, keyList) of listSettings"
          :key="keyList + 'listParams'"
          :itemsSettings="list"
          :listNumber="keyList + 1"
          @changeItemParameter="changeItemParameter"
          @changeItemsUsed="changeItemsUsed"
        />
      </div>
      <div class="page-block">
        <div
          class="list-content"
          v-for="(list, keyList) of listSettings"
          :key="`listContent${keyList}`"
        >
          <header class="list-content__header">
            <h3 class="list-content__name">List {{ keyList + 1 }}</h3>
            <button class="list-content__sort" @click="changeRandom(keyList)">
              {{ isRandom[keyList].value ? 'Сортировать' : 'Перемешать' }}
            </button>
          </header>
          <template v-if="!isRandom[keyList].value">
            <template
              v-for="(item, keyItem) of list"
              :key="`itemContent${keyItem}`"
            >
              <div
                class="item-content"
                v-if="item.used.value"
                @click="deleteSquare(keyList, keyItem, $event)"
              >
                <div
                  class="square"
                  :style="{
                    'background-color': item.color.value
                  }"
                  v-for="n in item.quantity.value"
                  :key="`${keyList}-${keyItem}-${n}square`"
                ></div>
              </div>
            </template>
          </template>
          <div class="item-content-random" v-else>
            <div
              class="square"
              v-for="(color, keyColor) in randomContent[keyList].value"
              :key="`${keyList}-${keyColor}square-color`"
              :style="{
                'background-color': color
              }"
              @click="
                deleteSquare(
                  keyList,
                  listSettings[keyList].findIndex(
                    (item) =>
                      item.color.value === color && item.quantity.value > 0
                  ),
                  $event
                )
              "
            ></div>
          </div>
        </div>
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

label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-content {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 16px;
  padding: 8px;
}

.item-content,
.item-content-random {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 8px;
}

.square {
  height: 16px;
  width: 16px;
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
  font-size: 14px;
  background-color: #18a0fb;
  border: none;
  border-radius: 8px;
  padding: 8px;
  width: 110px;
}
</style>
