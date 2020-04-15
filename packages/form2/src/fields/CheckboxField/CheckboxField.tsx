import React, { FC, memo, useMemo } from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox as MUICheckboxField,
} from '@material-ui/core';

import { useTranslation } from '_helpers';
import IconTooltip from '_components/IconTooltip';

import { FieldInterface } from '../..';
import useStyles from './useStyles';

interface Props extends FieldInterface<boolean> {
  labelPlacement: 'end' | 'start' | 'top' | 'bottom';
  showValueLabel?: boolean;
  bold?: boolean;
}

const CheckboxField: FC<Props> = ({
  tooltipContent,
  showValueLabel,
  labelPlacement = 'end',
  helperText,
  fullWidth,
  required,
  onChange,
  onBlur,
  error,
  label,
  bold,
  name,
  ...rest
}) => {
  const { value, variant, margin } = rest;
  const { t } = useTranslation();
  const classes = useStyles();

  const input = (
    <MUICheckboxField
      {...rest}
      name={name}
      checked={!!value}
      onChange={() => onChange(!value)}
      onBlur={() => onBlur && onBlur()}
    />
  );

  const checkboxLabel =
    label && (bold ? <b>{label + (required ? ' *' : '')}</b> : label + (required ? ' *' : ''));

  const labelJsx = (
    <>
      {checkboxLabel}
      {tooltipContent && <IconTooltip name="info1" tooltipContent={tooltipContent} />}
    </>
  );

  const control = useMemo(
    () => (
      <>
        {showValueLabel && (
          <span>
            <span className={cn(value ? classes.yes : classes.off, classes.mr)}>{t(`Áno`)}</span>
            &nbsp;|&nbsp;
            <span className={cn(value ? classes.off : classes.no, classes.ml)}>{t('Nie')}</span>
          </span>
        )}
        {input}
      </>
    ),
    [input, showValueLabel, t, value, classes]
  );

  return (
    <FormControl error={!!error} variant={variant} margin={margin}>
      {label ? (
        <FormControlLabel
          className={cn(classes.label, labelPlacement === 'start' ? classes.pr : classes.pl)}
          labelPlacement={labelPlacement}
          label={labelJsx}
          control={control}
        />
      ) : (
        input
      )}
      {(error || helperText) && <StyledFormHelperText>{helperText}</StyledFormHelperText>}
    </FormControl>
  );
};

const StyledFormHelperText = styled(FormHelperText)`
  margin-left: 0px;
  margin-right: 0px;
`;

export default memo(CheckboxField);
