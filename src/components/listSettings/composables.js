import { ref } from 'vue';

export const useListSettingsVisibility = (listNumber) => {
  const listSettingsVisibility = ref(listNumber === 1 ? true : false);
  const changeListSettingsVisibility = () =>
    (listSettingsVisibility.value = !listSettingsVisibility.value);

  return { listSettingsVisibility, changeListSettingsVisibility };
};
