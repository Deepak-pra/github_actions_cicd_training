/**
 * Business logic used by pipeline.test.js.
 */

function calculateDiscount(price, discountPercentage) {
  return price - (price * discountPercentage) / 100;
}

function calculateTotal(items) {
  return items.reduce((total, item) => total + item, 0);
}

function calculateAverage(items) {
  if (items.length === 0) {
    throw new Error("Cannot divide by zero");
  }

  return calculateTotal(items) / items.length;
}

function isBulkOrder(quantity) {
  const bulkOrderThreshold = 10;
  return quantity >= bulkOrderThreshold;
}

module.exports = {
  calculateDiscount,
  calculateTotal,
  calculateAverage,
  isBulkOrder,
};