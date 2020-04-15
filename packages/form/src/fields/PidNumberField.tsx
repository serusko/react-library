import React, { FC, memo } from 'react';

import TextField, { Props as TextFieldProps } from './TextField';
import useDebouncedFieldProps from '../_components/useDebouncedFieldProps';

interface Props extends TextFieldProps {}

const PidNumberField: FC<Props> = ({ onChange, value, onBlur, ...props }) => {
  const handleChange = (value: string | null) => {
    const splitValue = (value || '').split('/');
    const dateValue = (splitValue[0] && splitValue[0].replace(/[^0-9+ ]/g, '')) || '';
    const idValue = (splitValue[1] && splitValue[1].replace(/[^0-9+ ]/g, '')) || '';
    let val = dateValue.substr(0, 6);

    if (idValue !== '') {
      val = val + '/' + idValue.substr(0, 4);
    } else if (dateValue.length > 6) {
      val += '/' + dateValue.substr(6, 4);
    }

    onChange(val);
  };

  const p = useDebouncedFieldProps({ onChange: handleChange, value, onBlur });

  return <TextField {...props} {...p} disableDebounce />;
};

export default memo(PidNumberField);
