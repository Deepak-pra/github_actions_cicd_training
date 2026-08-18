const {
  calculateDiscount,
  calculateTotal,
  calculateAverage,
  isBulkOrder,
} = require("../src/pipeline");

describe("calculateDiscount", () => {
  test("applies 10% discount correctly", () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });

  test("applies 50% discount correctly", () => {
    expect(calculateDiscount(200, 50)).toBe(100);
  });

  test("zero discount returns original price", () => {
    expect(calculateDiscount(150, 0)).toBe(150);
  });

  test("full discount returns zero", () => {
    expect(calculateDiscount(100, 100)).toBe(0);
  });
});

describe("calculateTotal", () => {
  test("sums multiple items", () => {
    expect(calculateTotal([10, 20, 30])).toBe(60);
  });

  test("returns single item value", () => {
    expect(calculateTotal([99])).toBe(99);
  });

  test("returns zero for empty list", () => {
    expect(calculateTotal([])).toBe(0);
  });

  test("handles decimal prices", () => {
    expect(calculateTotal([9.99, 4.99, 1.99])).toBeCloseTo(16.97, 2);
  });
});

describe("calculateAverage", () => {
  test("calculates average correctly", () => {
    expect(calculateAverage([10, 20, 30])).toBe(20);
  });

  test("returns value for single item", () => {
    expect(calculateAverage([42])).toBe(42);
  });

  test("throws for empty list", () => {
    expect(() => calculateAverage([])).toThrow(
      "Cannot divide by zero"
    );
  });
});

describe("isBulkOrder", () => {
  test("returns true above threshold", () => {
    expect(isBulkOrder(15)).toBe(true);
  });

  test("returns true at exact threshold", () => {
    expect(isBulkOrder(10)).toBe(true);
  });

  test("returns false below threshold", () => {
    expect(isBulkOrder(5)).toBe(false);
  });
});