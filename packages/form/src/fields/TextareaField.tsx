import React, { FC, memo } from 'react';

import TextField, { Props as TextFieldProps } from './TextField';

export interface Props extends TextFieldProps {
  /**
   * Number of textarea rows
   */
  rows?: number;
  rowsMax?: number;
}

const TextareaField: FC<Props> = ({ rows = 4, rowsMax = 10, ...props }) => {
  return <TextField rows={rows} rowsMax={rowsMax} {...props} disableDebounce />;
};

export { TextareaField as Component };

export default memo(TextareaField);
