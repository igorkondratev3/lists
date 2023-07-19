<script setup>
import UsedInput from './components/usedInput.vue';
import QuantityInput from './components/quantityInput.vue';
import ColorInput from './components/colorInput.vue';
import ItemsVisibility from './components/itemsVisibility.vue';
import { useListSettingsVisibility } from './composables.js';

const props = defineProps({
  itemSettings: Array,
  listNumber: Number
});
const emits = defineEmits(['changeItemParameter', 'changeItemsUsed']);
const changeItemParameter = (itemKey, itemParameter, value) =>
  emits(
    'changeItemParameter',
    props.listNumber - 1,
    itemKey,
    itemParameter,
    value
  );

const { listSettingsVisibility, changeListSettingsVisibility } =
  useListSettingsVisibility(props.listNumber);
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
      <ItemsVisibility
        :listNumber="listNumber"
        :itemsUsed="itemSettings.map((item) => item.used.value)"
        @changeItemsUsed="
          (value) => $emit('changeItemsUsed', listNumber - 1, value)
        "
      />
    </div>
    <ul
      class="list-settings__items-list"
      v-show="listSettingsVisibility"
      v-for="(item, itemKey) of props.itemSettings"
      :key="`${itemKey + 1}item${props.listNumber}list`"
    >
      <li class="list-settings__item item-settings">
        <UsedInput
          :used="item.used.value"
          :itemNumber="itemKey + 1"
          @changeUsed="changeItemParameter"
        />
        <div class="item-settings__parameters">
          <QuantityInput
            :quantity="item.quantity.value"
            :itemNumber="itemKey + 1"
            @changeQuantity="changeItemParameter"
          />
          <ColorInput
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
.list-settings__summary {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-settings__visibility-toggle {
  width: 12px;
  height: 12px;
  border: solid black;
  border-width: 0 1px 1px 0;
  cursor: pointer;
  transform: rotate(-45deg);
}

.list-settings__visibility-toggle_close {
  transform: rotate(45deg);
  margin-bottom: 8px;
}

.list-settings__items-list {
  margin-left: 48px;
  list-style-type: none;
}

.list-settings__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  margin-top: 4px;
}

.item-settings__parameters {
  display: flex;
  align-items: center;
}


label {
  display: flex;
  align-items: center;
  gap: 8px;
}
/*перенести*/
</style>
