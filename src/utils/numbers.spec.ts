import {
  convertBinaryToDecimal,
  formatNumber,
  formatNumberWithDecimals,
  formatValueWithSuffix,
} from './numbers';

describe('src/utils/numbers', () => {
  describe('convertBinaryToDecimal', () => {
    test('converts [0, 1] to 1', () => {
      expect(convertBinaryToDecimal([0, 1])).toBe(1);
    });

    test('converts [1, 0] to 2', () => {
      expect(convertBinaryToDecimal([1, 0])).toBe(2);
    });

    test('converts [1, 1] to 3', () => {
      expect(convertBinaryToDecimal([1, 1])).toBe(3);
    });

    test('converts [1, 0, 1] to 5', () => {
      expect(convertBinaryToDecimal([1, 0, 1])).toBe(5);
    });

    test('converts [1, 1, 1] to 7', () => {
      expect(convertBinaryToDecimal([1, 1, 1])).toBe(7);
    });

    test('converts an empty array to 0', () => {
      expect(convertBinaryToDecimal([])).toBe(0);
    });
  });

  describe('formatNumberWithDecimals', () => {
    it('should return "0" for input number 0', () => {
      expect(formatNumberWithDecimals(0, 4)).toBe('0');
    });

    it('should format number with the given decimal places', () => {
      expect(formatNumberWithDecimals(123456, 2)).toBe('1234.5600');
      expect(formatNumberWithDecimals(100, 1)).toBe('10.0000');
    });

    it('should round fractional parts exceeding 8 decimal places to 8 decimals', () => {
      expect(formatNumberWithDecimals(123456789, 10)).toBe('0.01234568');
    });

    it('should format numbers greater than 1 to 4 decimal places', () => {
      expect(formatNumberWithDecimals(1000000, 6)).toBe('1.0000');
      expect(formatNumberWithDecimals(123456, 4)).toBe('12.3456');
    });

    it('should return "0" for numbers close to zero (below 0.000000001)', () => {
      expect(formatNumberWithDecimals(1, 10)).toBe('0');
    });

    it('should handle edge cases gracefully', () => {
      expect(formatNumberWithDecimals(-12345, 2)).toBe('0');
      expect(formatNumberWithDecimals(123456, 0)).toBe('123456');
    });
  });
  describe('formatNumber', () => {
    test('should format positive numbers correctly', () => {
      expect(formatNumber(123456)).toBe('123.46k');
      expect(formatNumber(0.005)).toBe('0.005');
      expect(formatNumber(0.00005)).toBe('0.000050');
    });

    test('should format negative numbers correctly', () => {
      expect(formatNumber(-123456)).toBe('-123.46k');
      expect(formatNumber(-0.005)).toBe('0.005');
      expect(formatNumber(-0.00005)).toBe('0.000050');
    });

    test('should handle large numbers correctly', () => {
      expect(formatNumber(1_000_000_000_000_001)).toBe('>999t');
    });

    test('should return "0.00" for zero', () => {
      expect(formatNumber(0)).toBe('0.00');
    });

    test('should format small numbers correctly', () => {
      expect(formatNumber(0.00009)).toBe('0.000090');
      expect(formatNumber(0.00005)).toBe('0.000050');
    });

    test('should format string input correctly', () => {
      expect(formatNumber('123456')).toBe('123.46k');
    });

    test('should use the default maxDecimalPlaces (2) when not provided', () => {
      expect(formatNumber(123456.789)).toBe('123.46k');
    });

    test('should respect the provided maxDecimalPlaces', () => {
      expect(formatNumber(123456.789, 3)).toBe('123.457k');
    });

    test('should handle null or undefined value as 0', () => {
      expect(formatNumber(null)).toBe('0.00');
      expect(formatNumber(undefined)).toBe('0.00');
    });
  });

  describe('formatValueWithSuffix', () => {
    test('should format numbers without suffix if value is less than 1000', () => {
      expect(formatValueWithSuffix(500, 2)).toBe('500');
      expect(formatValueWithSuffix(999, 2)).toBe('999');
    });

    test('should format numbers with "k" suffix for thousands', () => {
      expect(formatValueWithSuffix(1500, 2)).toBe('1.5k');
      expect(formatValueWithSuffix(999999, 1)).toBe('1000.0k');
    });

    test('should format numbers with "m" suffix for millions', () => {
      expect(formatValueWithSuffix(1_500_000, 2)).toBe('1.5m');
      expect(formatValueWithSuffix(9_999_999, 1)).toBe('10.0m');
    });

    test('should format numbers with "b" suffix for billions', () => {
      expect(formatValueWithSuffix(1_500_000_000, 2)).toBe('1.5b');
      expect(formatValueWithSuffix(9_999_999_999, 1)).toBe('10.0b');
    });

    test('should format numbers with "t" suffix for trillions', () => {
      expect(formatValueWithSuffix(1_500_000_000_000, 2)).toBe('1.5t');
      expect(formatValueWithSuffix(9_999_999_999_999, 1)).toBe('10.0t');
    });

    test('should respect maxDecimalPlaces', () => {
      expect(formatValueWithSuffix(1_234_567, 1)).toBe('1.2m');
      expect(formatValueWithSuffix(1_234_567, 3)).toBe('1.235m');
    });

    test('should handle exact multiples of 1000 correctly', () => {
      expect(formatValueWithSuffix(1000, 2)).toBe('1k');
      expect(formatValueWithSuffix(1_000_000, 2)).toBe('1m');
    });
  });
});
