import { ref } from 'vue';

export const useElementVisibility = (startValue = false) => {
  const visibility = ref(startValue);
  const changeVisibility = () => (visibility.value = !visibility.value);

  return { visibility, changeVisibility };
};
