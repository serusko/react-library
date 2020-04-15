import React, { FC, memo } from 'react';

import TextField, { Props as TextFieldProps } from './TextField';

interface Props extends TextFieldProps {}

const IdentityCardNumberField: FC<Props> = ({ onChange, ...props }) => {
  const handleChange = (value: null | string) => {
    const valString = (value || '').slice(0, 2).replace(/[^a-zA-Z]/g, '');
    const valNum = (value || '').slice(2, 8).replace(/[^0-9]/g, '');
    const val = valString.toUpperCase() + valNum;

    onChange(val);
  };
  return <TextField {...props} onChange={handleChange} disableDebounce />;
};

export default memo(IdentityCardNumberField);
