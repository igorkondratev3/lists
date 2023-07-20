<script setup>
import ItemVisibility from './components/itemVisibility.vue';
import ItemQuantity from './components/itemQuantity.vue';
import ItemColor from './components/itemColor.vue';
import CommonVisibilityOfItems from './components/commonVisibilityOfItems.vue';
import { useElementVisibility } from '@/composables/elementVisibility.js';

const props = defineProps({
  itemSettings: Array,
  listNumber: Number,
  minNumberOfSquares: Number,
  maxNumberOfSquares: Number
});
const emits = defineEmits(['changeItemParameter', 'changeItemVisibility']);

const changeItemParameter = (itemKey, itemParameter, value) =>
  emits(
    'changeItemParameter',
    props.listNumber - 1,
    itemKey,
    itemParameter,
    value
  );

const {
  visibility: listSettingsVisibility,
  changeVisibility: changeListSettingsVisibility
} = useElementVisibility(props.listNumber === 1);
</script>

<template>
  <li class="list-settings">
    <div class="list-settings__summary">
      <button
        class="list-settings__visibility-toggle"
        :class="{
          'list-settings__visibility-toggle_close': listSettingsVisibility
        }"
        @click="changeListSettingsVisibility"
      ></button>
      <CommonVisibilityOfItems
        :listNumber="listNumber"
        :itemVisibility="itemSettings.map((item) => item.visibility.value)"
        @changeItemVisibility="
          (value) => $emit('changeItemVisibility', listNumber - 1, value)
        "
      />
    </div>
    <ul class="list-settings__items-list" v-show="listSettingsVisibility">
      <li
        class="list-settings__item item-settings"
        v-for="(item, itemKey) of props.itemSettings"
        :key="`${itemKey + 1}item${props.listNumber}list`"
      >
        <ItemVisibility
          :visibility="item.visibility.value"
          :itemNumber="itemKey + 1"
          @changeVisibility="changeItemParameter"
        />
        <div class="item-settings__parameters">
          <ItemQuantity
            :quantity="item.quantity.value"
            :itemNumber="itemKey + 1"
            :minNumberOfSquares="minNumberOfSquares"
            :maxNumberOfSquares="maxNumberOfSquares"
            @changeQuantity="changeItemParameter"
          />
          <ItemColor
            :color="item.color.value"
            :itemNumber="itemKey + 1"
            @changeColor="changeItemParameter"
          />
        </div>
      </li>
    </ul>
  </li>
</template>

<style>
.list-settings {
  margin-bottom: calc(var(--base) * 0.08);
}

.list-settings__summary {
  display: flex;
  align-items: center;
  gap: calc(var(--base) * 0.16);
}

.list-settings__visibility-toggle {
  width: calc(var(--base) * 0.12);
  height: calc(var(--base) * 0.12);
  outline: none;
  border: solid black;
  border-width: 0 calc(var(--base) * 0.01) calc(var(--base) * 0.01) 0;
  cursor: pointer;
  transform: rotate(-45deg);
}

.list-settings__visibility-toggle:focus-visible::before {
  content: '';
  position: absolute;
  top: calc(var(--base) * 0.01);
  left: calc(var(--base) * 0.01);
  width: calc(var(--base) * 0.04);
  height: calc(var(--base) * 0.04);
  background-color: black;
  border-radius: 50%;
}

.list-settings__visibility-toggle:hover {
  background-color: transparent;
}

.list-settings__visibility-toggle_close {
  transform: rotate(45deg);
  margin-bottom: calc(var(--base) * 0.08);
}

.list-settings__items-list {
  margin-left: calc(var(--base) * 0.48);
  list-style-type: none;
}

.list-settings__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: calc(var(--base) * 5);
  margin-top: calc(var(--base) * 0.04);
}

.item-settings__parameters {
  display: flex;
  align-items: center;
  gap: calc(var(--base) * 0.08);
}
</style>
