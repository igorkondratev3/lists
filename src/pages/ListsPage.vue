<script setup>
import { ref } from 'vue';

const listVisibility = ref(new Set(['List1']));
</script>

<template>
  <div class="lists-page">
    <main class="lists-page__main">
      <div class="page-block">
        <ul class="list-params" v-for="n in 5" :key="n + 'listParams'">
          <li class="list-params__value">
            <div class="list-block">
              <div
                class="arrow"
                :class="{
                  arrow_down: listVisibility.has('List' + n)
                }"
                @click="
                  listVisibility.has('List' + n)
                    ? listVisibility.delete('List' + n)
                    : listVisibility.add('List' + n)
                "
              ></div>
              <label>
                <input type="checkbox" />
                List {{ n }}
              </label>
            </div>
            <template v-if="listVisibility.has('List' + n)">
              <ul
                class="list-params__item"
                v-for="k in 4"
                :key="k + 'item' + n + 'list'"
              >
                <li class="li-item">
                  <label class="lab-item">
                    <input type="checkbox" />
                    Item {{ k }}
                  </label>
                  <div class="parameters">
                    <input class="count-elements" type="number" min="1" max="99" value="1" />
                    <input type="color" class="color-input" />
                  </div>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
      <div class="page-block"></div>
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
  min-width: 40%;
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
</style>
