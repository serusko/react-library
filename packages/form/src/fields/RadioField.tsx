import React, { FC, memo } from 'react';
import styled from 'styled-components';
import {
  Radio as MUIRadioField,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from '@material-ui/core';

import { FieldInterface } from '_components/Form';

interface Props extends FieldInterface<boolean> {}

const RadioField: FC<Props> = ({ label, name, helperText, onChange, onBlur, ...rest }) => {
  const { value, variant, error, margin } = rest;
  return (
    <FormControl error={!!error} variant={variant} margin={margin}>
      {label ? (
        <FormControlLabel
          label={label}
          control={
            <MUIRadioField
              name={name}
              checked={!!value}
              {...rest}
              onChange={() => onChange(!value)}
              onBlur={() => onBlur && onBlur()}
            />
          }
        />
      ) : (
        <MUIRadioField name={name} checked={!!value} {...rest} onChange={() => onChange(!value)} />
      )}
      {(error || helperText) && <StyledFormHelperText>{error || helperText}</StyledFormHelperText>}
    </FormControl>
  );
};

const StyledFormHelperText = styled(FormHelperText)`
  margin-left: 0px;
  margin-right: 0px;
`;

export default memo(RadioField);
