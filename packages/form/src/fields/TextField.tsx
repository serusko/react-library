import styled from 'styled-components';
import React, { FC, memo } from 'react';
import { TextField as UITextField, InputAdornment, Button } from '@material-ui/core';

import { Icon } from '_components';
import { FieldInterface, fieldVariant } from '..';
import IconTooltip from '_components/IconTooltip';
import useDebouncedFieldProps from '../_components/useDebouncedFieldProps';

export interface Props extends FieldInterface<string> {
  // TODO: improve types
  /**
   * Number of textarea rows
   */
  rows?: number;
  rowsMax?: number;
  disableDebounce?: boolean;
}

const TextField: FC<Props> = ({
  disableDebounce,
  showClearButton,
  startAdornment,
  tooltipContent,
  tooltipValueUnit,
  endAdornment,
  fullWidth,
  onChange,
  required,
  variant,
  onBlur,
  margin,
  label,
  rows,
  value,
  ...props
}) => {
  const endAdornmentFc = (InputAdornmentComponent: any) => {
    return (
      <InputAdornmentComponent position="end">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {endAdornment}
          {showClearButton && (
            <StyledButton onClick={() => onChange(null)}>
              <Icon name="clearclose" />
            </StyledButton>
          )}
          {(label || tooltipContent) && (
            <IconTooltip
              name={tooltipContent ? 'info1' : 'info_outline'}
              tooltipContent={tooltipContent}
              tooltipLabel={label}
              tooltipValue={value}
              tooltipValueUnit={tooltipValueUnit}
            />
          )}
        </div>
      </InputAdornmentComponent>
    );
  };

  const p = useDebouncedFieldProps({ onChange, onBlur, value }, !disableDebounce);

  return (
    <div
      style={{
        marginTop: '14px !important',
        marginBottom: '14px !important',
        position: 'relative',
        display: 'flex',
      }}
    >
      <StyledTextField
        onChange={(e: any) => p.onChange(e.currentTarget.value)}
        onBlur={p.onBlur}
        value={p.value || ''}
        {...props}
        {...fieldVariant(variant)}
        label={label ? label + (required ? ' *' : '') : null}
        fullWidth={fullWidth}
        multiline={!!rows}
        margin={margin}
        rows={rows}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment:
            startAdornment &&
            (rows ? (
              <StyledInputAdornment position="start">
                <div style={{ display: 'flex', alignItems: 'center' }}>{startAdornment}</div>
              </StyledInputAdornment>
            ) : (
              <InputAdornment position="start">
                <div style={{ display: 'flex', alignItems: 'center' }}>{startAdornment}</div>
              </InputAdornment>
            )),
          endAdornment:
            (showClearButton || endAdornment || label || tooltipContent) &&
            (rows ? endAdornmentFc(StyledInputAdornment) : endAdornmentFc(InputAdornment)),
        }}
      />
    </div>
  );
};

const StyledTextField = styled(({ textAlign, ...otherProps }) => <UITextField {...otherProps} />)`
  margin-top: 18px;
  margin-bottom: 4px;
  & .MuiInputBase-root input {
    text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  }
  & .MuiFormHelperText-contained {
    margin-left: 4px;
    margin-right: 4px;
  }
`;

const StyledButton = styled(Button)`
  min-width: 10px;
  padding: 5px;
  & .MuiButton-label .icon {
    margin-right: 0;
  }
`;

const StyledInputAdornment = styled(InputAdornment)`
  display: block;
  margin-top: -75px;
`;

export const Component: FC<Props> = TextField;

export default memo(TextField);
