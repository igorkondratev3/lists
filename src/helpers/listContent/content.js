export const deleteSquare = (listKey, event, emits, checkAndDeleteSquare) => {
  if (event.target.className !== event.currentTarget.className) {
    checkAndDeleteSquare?.(event.target.dataset.colorkey);
    emits(
      'decreaseQuantity',
      listKey,
      event.currentTarget.dataset.key || event.target.dataset.key
    );
  }
};
