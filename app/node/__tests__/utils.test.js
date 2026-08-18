/**
 * Tests for utils.js
 * Run with: npm test
 */

const { add, subtract, multiply, divide, isEven } = require("../src/utils");

describe("add", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds two negative numbers", () => {
    expect(add(-1, -4)).toBe(-5);
  });

  test("adds zero", () => {
    expect(add(10, 0)).toBe(10);
  });
});

describe("subtract", () => {
  test("subtracts positive numbers", () => {
    expect(subtract(10, 3)).toBe(7);
  });

  test("subtracts negative numbers", () => {
    expect(subtract(5, -2)).toBe(7);
  });
});

describe("multiply", () => {
  test("multiplies positive numbers", () => {
    expect(multiply(4, 5)).toBe(20);
  });

  test("multiplies by zero", () => {
    expect(multiply(99, 0)).toBe(0);
  });
});

describe("divide", () => {
  test("divides positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("throws error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });
});

describe("isEven", () => {
  test("returns true for even number", () => {
    expect(isEven(4)).toBe(true);
  });

  test("returns false for odd number", () => {
    expect(isEven(7)).toBe(false);
  });

  test("returns true for zero", () => {
    expect(isEven(0)).toBe(true);
  });
});