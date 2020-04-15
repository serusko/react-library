import React, { FC, memo } from 'react';
import { InputLabel, FormControl, FormHelperText } from '@material-ui/core';

import UserSearch from 'pages/_components/UserSearch';

import { FieldInterface } from '..';

export interface Props<V = string> extends FieldInterface<V> {
  onSelectItem?: Function;
  showClearBtn?: boolean;
}

const UserSearchField: FC<Props> = ({ label, helperText, fullWidth, onSelectItem, ...rest }) => {
  const inputLabel = React.useRef<HTMLLabelElement | null>(null);
  const { name, value, variant, error, margin, showClearBtn } = rest;
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    inputLabel.current && setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl error={!!error} fullWidth={fullWidth} variant={variant} margin={margin}>
      <InputLabel ref={inputLabel} htmlFor={name}>
        {label}
      </InputLabel>
      <UserSearch
        {...rest}
        showClearBtn={showClearBtn}
        onSelectItem={onSelectItem}
        labelWidth={labelWidth}
        value={value}
        label={label}
        name={name}
      />
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

export default memo(UserSearchField);
