import { computed } from 'vue';

export const useCommonVisibility = (itemVisibility, emits) => {
  const someItemsShown = computed(() => itemVisibility.value.includes(true));
  const someItemsHidden = computed(() => itemVisibility.value.includes(false));

  const changeCommonVisibility = (event) => {
    if (!someItemsHidden.value) {
      emits('changeItemVisibility', false);
      return;
    }
    if (!someItemsShown.value) {
      emits('changeItemVisibility', true);
      return;
    }
    event.preventDefault();
    emits('changeItemVisibility', true);
  };

  return { someItemsShown, someItemsHidden, changeCommonVisibility };
};
