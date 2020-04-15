import React, { FC, useState, useEffect, memo } from 'react';
import NumberFormat from 'react-number-format';

import { FieldInterface } from '..';
import TextField from './TextField';

export interface Props extends FieldInterface<number> {
  decimalScale: number;
  min: number;
  max: number;
}
const NumberField: FC<Props> = ({ value, onChange, min, max, decimalScale, onBlur, ...props }) => {
  const [inputVal, setInputVal] = useState<null | string>(maskValue(value, min, max, decimalScale));

  useEffect(() => {
    setInputVal(maskValue(value, min, max, decimalScale));
  }, [value, setInputVal, min, max, decimalScale]);

  const handleChange = (value: null | string) => {
    const splitValue = (value || '').split(/[,|.]/);
    const numberValue = (splitValue[0] && splitValue[0].replace(/[^0-9+ ]/g, '')) || '';
    let decimalValue = (splitValue[1] && splitValue[1].replace(/[^0-9+ ]/g, '')) || '';
    decimalValue = decimalValue.substr(0, decimalScale);
    const val =
      numberValue +
      ((value || '').includes(',') || (value || '').includes('.') || decimalValue ? ',' : '') +
      decimalValue;
    setInputVal(val);
  };

  const handleBlur = () => {
    const val = maskValue(unMaskValue(inputVal || ''), min, max, decimalScale);
    setInputVal(val);
    const v = unMaskValue(val);
    onChange(v);
    onBlur && onBlur();
  };

  return (
    <TextField
      {...props}
      value={inputVal}
      onChange={handleChange}
      onBlur={handleBlur}
      disableDebounce
    />
  );
};

export default memo(NumberField);

const maskValue = (value: number | null, min: number, max: number, decimalScale: number) => {
  // if (value === null) {
  //   return '';
  // }
  let valIn = value;
  if (min && typeof valIn === 'number') {
    valIn = Math.max(valIn, min);
  }
  if (max && typeof valIn === 'number') {
    valIn = Math.min(valIn, max);
  }
  const val = new NumberFormat({
    value: typeof valIn !== 'number' ? undefined : valIn,
    fixedDecimalScale: decimalScale ? true : false,
    decimalScale: decimalScale ? decimalScale : 0,
    allowedDecimalSeparators: [',', '.'],
    thousandSeparator: ' ',
    decimalSeparator: ',',
    isNumericString: true,
  });
  return val.state.value;
};

const unMaskValue = (val: string) => {
  return parseFloat((val || '').replace(/,/g, '.').replace(/[^0-9,\\.]/g, '')) || null;
};
