import React, { FC, memo } from 'react';
import styled from 'styled-components';
import {
  FormControlLabel,
  FormHelperText,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FieldInterface } from '_components/Form';
import IconTooltip from '_components/IconTooltip';

const getClasses = makeStyles((theme: any) => ({
  label: {
    color: (p: any) => theme.palette.text.primary,
    marginRight: '1rem',
    lineHeight: '3rem',
  },
  control: {
    flexDirection: 'row',
  },
}));

interface OptionType {
  key: number;
  label: string | string[];
  value?: string;
}

interface Props extends FieldInterface<string> {
  options: OptionType[];
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom'; // TODO: TBD = do we need this???
  row?: boolean;
}

const RadioGroupField: FC<Props> = ({
  tooltipContent,
  options,
  labelPlacement,
  color,
  row,
  onChange,
  onBlur,
  label,
  name,
  helperText,
  required,
  ...rest
}) => {
  const { value, variant, error, margin } = rest;
  const classes = getClasses();

  return (
    <FormControl error={!!error} variant={variant} margin={margin} className={classes.control}>
      {label && (
        <FormLabel className={classes.label}>
          {label + (required ? ' *' : '')}
          {tooltipContent && <IconTooltip name="info1" tooltipContent={tooltipContent} />}
        </FormLabel>
      )}
      <RadioGroup
        aria-label={label + (required ? ' *' : '')}
        name={name}
        value={String(value)}
        onChange={e => onChange(e.currentTarget.value)}
        onBlur={e => onBlur && onBlur()}
        row={row}
      >
        {React.useMemo(() => {
          return (options ? options : []).map((option: OptionType) => (
            <FormControlLabel
              key={option.key}
              value={option.value}
              control={<Radio />}
              label={option.label}
              labelPlacement={labelPlacement}
            />
          ));
        }, [labelPlacement, options])}
      </RadioGroup>
      {helperText && <StyledFormHelperText>{helperText}</StyledFormHelperText>}
    </FormControl>
  );
};

const StyledFormHelperText = styled(FormHelperText)`
  margin-left: 0px;
  margin-right: 0px;
`;

export { RadioGroupField as Component };

export default memo(RadioGroupField);
