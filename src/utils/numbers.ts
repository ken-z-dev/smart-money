// https://github.com/sushi-labs/sushiswap/tree/5afa5cc7fb3d2810f08e8eee3fdd060f7e081f1d/packages/sushi/src/format

export type BinaryArray = (0 | 1)[];

export const convertBinaryToDecimal = (binaryArray: BinaryArray): number => {
  return binaryArray
    .reverse()
    .reduce((acc: number, bit: number, index: number) => {
      return acc + bit * Math.pow(2, index);
    }, 0);
};

export const formatNumberWithDecimals = (number: number, decimals: number) => {
  if (number === 0) return '0';
  let _number = (number / 10 ** decimals).toFixed(decimals);
  if (_number) {
    if (_number.includes('.') && _number.split('.')[1].length > 8) {
      _number = Number(_number).toFixed(8);
    }
    if (_number.includes('.') && parseFloat(_number.split('.')[0]) > 0) {
      _number = Number(_number).toFixed(4);
    }
  }
  // else {
  //   _number = '0';
  // }
  // if (Number(_number) < 0.000000001) {
  //   return '0';
  // }
  return _number;
};

export const formatNumber = (
  value: string | number,
  maxDecimalPlaces = 2,
): string => {
  value = value ?? 0;
  if (typeof value === 'string') value = Number(value);

  let negative = false;
  if (value < 0) {
    negative = true;
    value = Math.abs(value);
  }

  if (value > 999_000_000_000_000) return '>999t';
  if (value === 0) return '0.00';
  if (value < 0.0001) return value.toFixed(6);
  if (value < 0.001) return value.toFixed(4);
  if (value < 0.01) return value.toFixed(3);

  return `${negative ? '-' : ''}${formatValueWithSuffix(
    value,
    maxDecimalPlaces,
  )}`;
};

export const formatValueWithSuffix = (
  value: number,
  maxDecimalPlaces: number,
): string => {
  const suffixes: string[] = ['', 'k', 'm', 'b', 't'];
  let suffixIndex = 0;
  while (value >= 1000 && suffixIndex < suffixes.length - 1) {
    value /= 1000;
    suffixIndex++;
  }

  const decimalCount = Math.min(
    value.toString().split('.')[1]?.length || 0,
    maxDecimalPlaces,
  );

  const formattedValue = value.toFixed(decimalCount);
  return `${formattedValue}${suffixes[suffixIndex]}`;
};
