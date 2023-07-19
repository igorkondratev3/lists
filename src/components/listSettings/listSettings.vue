<script setup>
import { ref } from 'vue';
import UsedInput from './components/usedInput.vue';
import QuantityInput from './components/quantityInput.vue';
import ColorInput from './components/colorInput.vue';
import ItemsVisibility from './components/itemsVisibility.vue';

const props = defineProps({
  itemsSettings: Array,
  listNumber: Number
});
defineEmits(['changeItemParameter', 'changeItemsUsed']);

const listVisibility = ref(props.listNumber === 1 ? true : false);
const changeListVisibility = () =>
  (listVisibility.value = !listVisibility.value);
</script>

<template>
  <ul class="list-params">
    <li class="list-params__value">
      <div class="list-block">
        <div
          class="arrow"
          :class="{
            arrow_down: listVisibility
          }"
          @click="changeListVisibility"
        ></div>
        <ItemsVisibility
          :listNumber="props.listNumber"
          :itemsUsed="
            props.itemsSettings.map((itemSettings) => itemSettings.used.value)
          "
          @changeItemsUsed="
            (value) => $emit('changeItemsUsed', props.listNumber - 1, value)
          "
        />
      </div>
      <template v-if="listVisibility">
        <ul
          class="list-params__item"
          v-for="(itemSettings, itemSettingsKey) of props.itemsSettings"
          :key="`${itemSettingsKey + 1}item${props.listNumber}list`"
        >
          <li class="li-item">
            <UsedInput
              :used="itemSettings.used.value"
              :itemNumber="itemSettingsKey + 1"
              @changeUsed="
                (value) =>
                  $emit(
                    'changeItemParameter',
                    props.listNumber - 1,
                    itemSettingsKey,
                    'used',
                    value
                  )
              "
            />
            <div class="parameters">
              <QuantityInput
                :quantity="itemSettings.quantity.value"
                @changeQuantity="
                  (value) =>
                    $emit(
                      'changeItemParameter',
                      props.listNumber - 1,
                      itemSettingsKey,
                      'quantity',
                      value
                    )
                "
              />
              <ColorInput
                :color="itemSettings.color.value"
                @changeColor="
                  (value) =>
                    $emit(
                      'changeItemParameter',
                      props.listNumber - 1,
                      itemSettingsKey,
                      'color',
                      value
                    )
                "
              />
            </div>
          </li>
        </ul>
      </template>
    </li>
  </ul>
</template>

<style>
.list-params {
  list-style-type: none;
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


.list-params__item {
  list-style-type: none;
  margin-left: 48px;
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


</style>
