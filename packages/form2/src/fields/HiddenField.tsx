import React, { FC, memo } from 'react';
import NumberFormat from 'react-number-format';

import { FieldInterface } from '..';

interface Props extends FieldInterface<any> {
  showValue: boolean;
}

// TODO: use proper name => number format ?
const HiddenField: FC<Props> = ({ showValue = true, endAdornment, value }) => {
  if (!showValue) {
    return null;
  }

  const format = new NumberFormat({
    fixedDecimalScale: true,
    thousandSeparator: ' ',
    decimalSeparator: ',',
    decimalScale: 2,
    value: value || 0,
  });

  return (
    <b>
      {typeof value === 'number' ? format.state.value : value ? String(value) : ''}
      &nbsp;
      {endAdornment}
    </b>
  );
};

export default memo(HiddenField);
