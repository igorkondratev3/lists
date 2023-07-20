export const deleteSquare = (listKey, event, emits, deleteOneSquare) => {
  if (event.target.className !== event.currentTarget.className) {
    deleteOneSquare?.(event.target.dataset.square_key);
    emits(
      'decreaseQuantity',
      listKey,
      event.currentTarget.dataset.item_key || event.target.dataset.item_key
    );
  }
};
