const { add, subtract, multiply, divide } = require("./utils");

function calculateDiscount(price, discountPercent) {
  const discount = divide(multiply(price, discountPercent), 100);
  return subtract(price, discount);
}

function calculateTotal(items) {
  let total = 0;

  for (const price of items) {
    total = add(total, price);
  }

  return total;
}

function calculateAverage(items) {
  const total = calculateTotal(items);
  return divide(total, items.length);
}

function isBulkOrder(quantity, threshold = 10) {
  return quantity >= threshold;
}

module.exports = {
  calculateDiscount,
  calculateTotal,
  calculateAverage,
  isBulkOrder
};