<script setup>
import { ref, computed } from 'vue';

const numberOfLists = 5;
const numberOfItems = 4;
const listVisibility = ref(new Set(['List1']));
const listSettings = [];
const listChecked = [];
for (let i = 0; i < numberOfLists; i++) {
  listSettings[i] = [];
  for (let j = 0; j < numberOfItems; j++) {
    listSettings[i][j] = {
      used: ref(true),
      quantity: ref(2),
      color: ref('#ca5d5d')
    };
  }
  listChecked[i] = computed(() =>
    listSettings[i].some((item) => item.used.value)
  );
}

const deleteSquare = (keyList, keyItem, event) => {
  if (event.target.className === 'square') {
    listSettings[keyList][keyItem].quantity.value--;
  }
};

const dfg = (list, event) => {
  if (list.every((item) => item.used.value)) {
    for (const item of list) {
      item.used.value = false;
    }
    return;
  }
  if (list.every((item) => !item.used.value)) {
    for (const item of list) {
      item.used.value = true;
    }
    return;
  }
  event.preventDefault();
  for (const item of list) {
    item.used.value = true;
  }
};
</script>

<template>
  <div class="lists-page">
    <main class="lists-page__main">
      <div class="page-block">
        <ul
          class="list-params"
          v-for="(list, keyList) of listSettings"
          :key="keyList + 'listParams'"
        >
          <li class="list-params__value">
            <div class="list-block">
              <div
                class="arrow"
                :class="{
                  arrow_down: listVisibility.has(`List${keyList + 1}`)
                }"
                @click="
                  listVisibility.has(`List${keyList + 1}`)
                    ? listVisibility.delete(`List${keyList + 1}`)
                    : listVisibility.add(`List${keyList + 1}`)
                "
              ></div>
              <label>
                <input
                  class="list-check"
                  :class="{
                    'list-check_some':
                      list.some((item) => item.used.value) &&
                      list.some((item) => !item.used.value)
                  }"
                  type="checkbox"
                  :checked="listChecked[keyList].value"
                  @click="dfg(list, $event)"
                />
                List {{ keyList + 1 }}
              </label>
            </div>
            <template v-if="listVisibility.has(`List${keyList + 1}`)">
              <ul
                class="list-params__item"
                v-for="(item, keyItem) of list"
                :key="`${keyItem + 1}item${keyList}list`"
              >
                <li class="li-item">
                  <label class="lab-item">
                    <input
                      class="item-check"
                      type="checkbox"
                      v-model="item.used.value"
                    />
                    Item {{ keyItem + 1 }}
                  </label>
                  <div class="parameters">
                    <input
                      class="count-elements"
                      type="number"
                      min="1"
                      max="99"
                      v-model="item.quantity.value"
                    />
                    <input
                      type="color"
                      class="color-input"
                      v-model="item.color.value"
                    />
                  </div>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
      <div class="page-block">
        <div
          class="list-content"
          v-for="(list, keyList) of listSettings"
          :key="`listContent${keyList}`"
        >
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

.list-params {
  list-style-type: none;
}

.list-params__item {
  list-style-type: none;
  margin-left: 48px;
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-block {
  display: flex;
  gap: 8px;
}

.arrow {
  margin-top: 8px;
  width: 12px;
  height: 12px;
  border: solid black;
  border-width: 0 0.1em 0.1em 0;
  transform: rotate(-45deg);
}

.arrow_down {
  transform: rotate(45deg);
}

.li-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  max-width: 500px;
}

.parameters {
  display: flex;
  align-items: center;
}

.color-input {
  width: 24px;
  border: none;
}

.count-elements::-webkit-outer-spin-button,
.count-elements::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.count-elements {
  width: 32px;
  -moz-appearance: textfield;
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
  border: none;
  margin-right: 4px;
  background-color: inherit;
  text-align: center;
}

.list-content {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 16px;
  padding: 8px;
}

.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 8px;
}

.square {
  height: 16px;
  width: 16px;
  background-color: red;
}

input[type='checkbox'].list-check:checked {
  background: rgb(66, 63, 63);
}

input[type='checkbox'].list-check_some:checked {
  background: radial-gradient(circle at center, black 40%, transparent 41%);
}

input[type='checkbox'].item-check:checked {
  background: url('/src/assets/images/check.svg');
  background-position: center;
  background-size: calc(var(--base) * 0.24);
}
</style>
