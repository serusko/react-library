import React, { FC, useState, useEffect, memo } from 'react';
import NumberFormat from 'react-number-format';

import { FieldInterface } from '..';
import TextField from './TextField';
import { Icon } from '_components';

interface Props extends FieldInterface<number> {
  decimalScale?: number;
}

const PriceField: FC<Props> = ({
  value,
  onChange,
  onBlur,
  endAdornment,
  decimalScale = 2,
  tooltipValueUnit,
  ...props
}) => {
  const [inputVal, setInputVal] = useState<null | string>(maskValue(value, decimalScale));

  useEffect(() => {
    setInputVal(maskValue(value, decimalScale));
  }, [value, setInputVal, decimalScale]);

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
    const val = maskValue(unMaskValue(inputVal || ''), decimalScale);
    setInputVal(val);
    const v = unMaskValue(val);
    onChange(v);
    onBlur && onBlur();
  };

  return (
    <TextField
      endAdornment={endAdornment || <Icon name="euro" />}
      onChange={handleChange}
      onBlur={handleBlur}
      value={inputVal}
      textAlign="right"
      tooltipValueUnit={tooltipValueUnit || '€'}
      disableDebounce
      {...props}
    />
  );
};

const maskValue = (value: number | null | string, decimalScale: number) => {
  const val = new NumberFormat({
    value: typeof value !== 'number' ? undefined : value,
    allowedDecimalSeparators: [','],
    fixedDecimalScale: true,
    thousandSeparator: ' ',
    isNumericString: true,
    decimalSeparator: ',',
    decimalScale,
  });
  return val.state.value;
};

const unMaskValue = (val: string) => {
  return parseFloat((val || '').replace(/,/g, '.').replace(/[^0-9,\\.]/g, '')) || null;
};

export default memo(PriceField);
