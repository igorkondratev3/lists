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

export const throttle = (func, ms) => {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper(...arg) {
    if (isThrottled) {
      savedArgs = arg;
      savedThis = this;
      return;
    }

    func.apply(this, arg);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};
