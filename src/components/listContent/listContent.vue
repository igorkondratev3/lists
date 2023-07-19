<script setup>
import { ref, computed } from 'vue';
import { getRandomIntInclusive } from '@/helpers/common.js';

const props = defineProps({
  listNumber: Number,
  itemSettings: Array
});
const emits = defineEmits(['decreaseQuantity']);

const isRandom = ref(false);
const changeRandom = () => {
  isRandom.value = !isRandom.value;
};

const deleteSquare = (listKey, itemKey, event) => {
  if (event.target.className === 'square') {
    emits('decreaseQuantity', listKey, itemKey);
  }
};

const commonArraySquares = computed(() =>
  props.itemSettings.map((item) => ({
    used: item.used.value,
    color: item.color.value,
    quantity: item.quantity.value
  }))
);

const randomContent = computed(() => {
  const result = [];
  const correctData = structuredClone(
    commonArraySquares.value.filter((item) => item.quantity > 0 && item.used)
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
</script>

<template>
  <div class="list-content">
    <header class="list-content__header">
      <h5 class="list-content__name">List {{ listNumber }}</h5>
      <button class="list-content__sort" @click="changeRandom">
        {{ isRandom ? 'Сортировать' : 'Перемешать' }}
      </button>
    </header>
    <template v-if="!isRandom">
      <template
        v-for="(item, itemKey) of itemSettings.toSorted(
          (a, b) => a.quantity.value - b.quantity.value
        )"
        :key="`itemContent${itemKey}`"
      >
        <div
          class="item-content"
          v-if="item.used.value"
          @click="
            deleteSquare(
              listNumber - 1,
              itemSettings.findIndex(
                (setting) =>
                  item.color.value === setting.color.value &&
                  setting.quantity.value > 0
              ),
              $event
            )
          "
        >
          <div
            class="square"
            :style="{
              'background-color': item.color.value
            }"
            v-for="n in item.quantity.value"
            :key="`${listNumber}-${itemKey + 1}-${n}square`"
          ></div>
        </div>
      </template>
    </template>
    <div class="item-content-random" v-else>
      <div
        class="square"
        v-for="(color, colorKey) in randomContent"
        :key="`${listNumber}-${colorKey + 1}square-color`"
        :style="{
          'background-color': color
        }"
        @click="
          deleteSquare(
            listNumber - 1,
            itemSettings.findIndex(
              (item) => item.color.value === color && item.quantity.value > 0
            ),
            $event
          )
        "
      ></div>
    </div>
  </div>
</template>

<style>
.list-content {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 16px;
  padding: 8px;
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
</style>
