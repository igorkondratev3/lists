export const quantityNormalize = (
  event,
  quantity,
  minNumberOfSquares,
  maxNumberOfSquares
) => {
  if (event.data < '0' || event.data > '9') {
    event.currentTarget.value = String(quantity);
    return quantity;
  }
  if (
    Number(event.currentTarget.value) > maxNumberOfSquares ||
    Number(event.currentTarget.value) < minNumberOfSquares
  ) {
    event.currentTarget.value = String(quantity);
    return quantity;
  }

  return Number(event.currentTarget.value);
};
