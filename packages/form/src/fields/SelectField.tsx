import React, { FC, ChangeEvent, memo } from 'react';
import styled from 'styled-components';
import {
  NativeSelect as MUISelectField,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  FormControl,
  InputAdornment,
  Button,
} from '@material-ui/core';

import { FieldInterface, fieldVariant } from '..';
import { IconTooltip, Icon } from '_components';

export interface OptionType<V = any> {
  label: string;
  value: V;
  [key: string]: any;
}

interface Props<V = any> extends FieldInterface<V> {
  options: OptionType[];
  showEmpty?: boolean;
  inputProps?: any;
  clearFunc?: () => void;
}

const SelectField: FC<Props> = ({
  inputProps,
  helperText,
  showEmpty,
  fullWidth,
  clearFunc,
  onChange,
  onBlur,
  onFocus,
  required,
  variant,
  options,
  margin,
  label,
  value,
  error,
  name,
  showClearButton,
  tooltipContent,
  tooltipValueUnit,
  startAdornment,
  endAdornment,
  ...rest
}) => {
  const val = value === null ? '' : value;

  const getOptionLabel = (optionValue: any): string => {
    const opt = (options || []).find(o => o.value === optionValue);
    return opt ? opt.label : '';
  };

  // TODO NOT SHOW HELPER TEXT - RERENDER

  const handleChange = (event: ChangeEvent<{ name?: string; value: string | null }>) => {
    onChange(maskValue(event.target.value)); // TODO: dotestovat sekundarny efekt
  };

  return (
    <StyledFormControl error={!!error} fullWidth={fullWidth} variant={variant} margin={margin}>
      <InputLabel htmlFor={name} shrink={true}>
        {label + (required ? ' *' : '')}
      </InputLabel>
      <StyledSelect
        {...rest}
        {...fieldVariant(variant)}
        input={<OutlinedInput name={name} id={name} value={val} />}
        margin={(margin as unknown) as 'none' | 'dense' | undefined} // TODO: fix typings
        onChange={handleChange}
        onBlur={() => onBlur && onBlur()}
        value={val}
        name={name}
        startAdornment={
          startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>
        }
        endAdornment={
          (showClearButton || endAdornment || label || tooltipContent) && (
            <InputAdornment position="end">
              {endAdornment}
              {showClearButton && (
                <StyledButton
                  onClick={e => {
                    e.stopPropagation();
                    onChange(null);
                    clearFunc && clearFunc();
                  }}
                >
                  <Icon name="clearclose" />
                </StyledButton>
              )}
              {(label || tooltipContent) && (
                <IconTooltip
                  name={tooltipContent ? 'info1' : 'info_outline'}
                  tooltipLabel={label}
                  tooltipValue={getOptionLabel(value)}
                  tooltipContent={tooltipContent}
                  tooltipValueUnit={tooltipValueUnit}
                />
              )}
            </InputAdornment>
          )
        }
      >
        {(showEmpty ? [{ value: '', label: '' }, ...options] : options || []).map(
          (option: OptionType, key: number) => (
            <option key={key} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </StyledSelect>
      {helperText && <StyledFormHelperText>{helperText}</StyledFormHelperText>}
    </StyledFormControl>
  );
};

const maskValue = (value: string | null): string | null => {
  return value === '' || value === undefined ? null : value;
};

const StyledFormControl = styled(FormControl)`
  margin-top: 18px;
  margin-bottom: 4px;
`;

const StyledFormHelperText = styled(FormHelperText)`
  margin-left: 4px;
  margin-right: 4px;
`;

const StyledButton = styled(Button)`
  min-width: 10px;
  padding: 5px;
  & .MuiButton-label .icon {
    margin-right: 0;
  }
`;

const StyledSelect = styled(MUISelectField)`
  & .MuiNativeSelect-root {
    padding-right: 25px;
  }
  & .MuiNativeSelect-icon {
    position: relative;
    margin-left: -25px;
    color: rgba(0, 0, 0, 0.55);
    right: -3px;
  }
`;

export { SelectField as Component };

export default memo(SelectField);
