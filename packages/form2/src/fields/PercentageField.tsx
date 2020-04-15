import React, { FC, memo } from 'react';

import NumberField, { Props as NumberFieldProps } from './NumberField';
import { Icon } from '_components';

const PercentageField: FC<NumberFieldProps> = ({
  value,
  onChange,
  decimalScale = 2,
  tooltipValueUnit,
  ...props
}) => {
  return (
    <NumberField
      {...props}
      value={maskValue(value)}
      onChange={val => {
        onChange(unMaskValue(val));
      }}
      endAdornment={<Icon name="percent" />}
      decimalScale={decimalScale}
      textAlign="right"
      tooltipValueUnit={tooltipValueUnit || '%'}
    />
  );
};

export default memo(PercentageField);

const maskValue = (value: number | null) => {
  return value !== undefined && value !== null ? value * 100 : null;
};

const unMaskValue = (value: number | null) => {
  return value ? value / 100 : null;
};
