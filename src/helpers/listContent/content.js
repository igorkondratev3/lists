export const deleteSquare = (itemSettings, listKey, event, emits) => {
  if (event.target.className !== event.currentTarget.className) {
    const itemKey = itemSettings.findIndex(
      (item) =>
        item.color.value === event.target.dataset.color &&
        item.quantity.value > 0 &&
        item.visibility.value
    );
    emits('decreaseQuantity', listKey, itemKey);
  }
};
