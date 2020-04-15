import React, { FC, memo, forwardRef } from 'react';
import styled from 'styled-components';
import {
  Switch as MUISwitch,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import { FieldInterface } from '..';
import IconTooltip from '_components/IconTooltip';

interface Props extends FieldInterface<boolean> {}

/**
 * Boolean toggle switch field
 */
const SwitchField: FC<Props> = forwardRef<HTMLElement, Props>(
  (
    {
      tooltipContent,
      helperText,
      fullWidth,
      required,
      onChange,
      variant,
      onBlur,
      margin,
      value,
      error,
      label,
      name,
      ...rest
    },
    ref
  ) => {
    const input = (
      <MUISwitch
        onChange={() => onChange(!value)}
        onBlur={() => onBlur && onBlur()}
        checked={!!value}
        name={name}
        {...rest}
      />
    );

    return (
      <FormControl error={error} variant={variant} margin={margin} fullWidth={fullWidth}>
        {label || tooltipContent ? (
          <StyledFormControlLabel
            label={
              <>
                {label + (required ? '* ' : ' ')}
                {tooltipContent && <IconTooltip name="info1" tooltipContent={tooltipContent} />}
              </>
            }
            control={input}
          />
        ) : (
          input
        )}
        {(error || helperText) && (
          <StyledFormHelperText error={error}>{helperText}</StyledFormHelperText>
        )}
      </FormControl>
    );
  }
);

const StyledFormHelperText = styled(FormHelperText)`
  margin-left: 0px;
  margin-right: 0px;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-right: 0;
`;

export { SwitchField as Component };

export default memo(SwitchField);
