import React, { FC, memo } from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';

import Button from '_components/Button';

import { FieldInterface } from '..';

interface Props extends FieldInterface<File | FileList> {
  multiple?: number;
}

const FileField: FC<Props> = ({
  helperText,
  fullWidth,
  multiple,
  onChange,
  variant,
  label,
  error,
  margin,
  value,
  size,
  ...props
}) => {
  return (
    <FormControl error={!!error} fullWidth={fullWidth} variant={variant} margin={margin}>
      <label>
        <input
          {...props}
          onChange={e => {
            const val = e.currentTarget.files;
            onChange((multiple ? val : val && val[0]) || null);
          }}
          style={{ display: 'none' }} // TODO: review
          type="file"
        />
        <Button variant="text" component="span">
          {label}
        </Button>
      </label>
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

export default memo(FileField);
