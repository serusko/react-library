import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import skLocale from 'date-fns/locale/sk';
import React, { FC, memo, useCallback } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';
import { InputAdornment, Button } from '@material-ui/core';

import { FieldInterface } from '..';
import { IconTooltip, Icon } from '_components';

interface Props extends FieldInterface<number> {
  pickerVariant?: KeyboardDatePickerProps['variant'];
  autoOk?: boolean;
  minDate?: Date;
  maxDate?: Date;
  openTo?: 'date' | 'year' | 'month';
  views?: Array<'year' | 'date' | 'month'>;
  orientation?: 'portrait' | 'landscape';
  clearable?: boolean;
  showTodayButton?: boolean;
  cancelLabel?: string;
  todayLabel?: string;
  // range?: boolean; // TODO: implement range prop
}

const DateField: FC<Props> = ({
  pickerVariant = 'dialog',
  autoOk = true,
  maxDate = new Date('2099-12-31'),
  minDate = new Date('1920-01-01'),
  openTo = 'year',
  views = ['year', 'month', 'date'],
  orientation = 'landscape',
  clearable = false,
  showTodayButton = true,
  cancelLabel = 'Zrušiť',
  todayLabel = 'Dnes',
  tooltipContent,
  tooltipValueUnit,
  showClearButton,
  endAdornment,
  onChange,
  required,
  variant,
  onBlur,
  label,
  value,
  name,
  ...props
}) => {
  const handleBlur = useCallback(
    (event: any) => {
      if (!event.relatedTarget || event.relatedTarget.id !== name + '_iconBtn') {
        onBlur && onBlur();
      }
    },
    [name, onBlur]
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={skLocale}>
      <StyledDatePicker
        {...props}
        KeyboardButtonProps={{ id: name + '_iconBtn' }}
        InputAdornmentProps={{ position: 'start' }}
        label={label + (required ? ' *' : '')}
        onClose={() => onBlur && onBlur()}
        onChange={v => onChange(unMaskValue(v))}
        variant={pickerVariant}
        inputVariant={variant}
        format="dd.MM.yyyy" // TODO: use localized date format
        onBlur={handleBlur}
        value={value}
        name={name}
        clearable={clearable}
        autoOk={autoOk}
        minDate={minDate}
        maxDate={maxDate}
        openTo={openTo}
        views={views}
        orientation={orientation}
        showTodayButton={showTodayButton}
        cancelLabel={cancelLabel}
        todayLabel={todayLabel}
        InputProps={{
          endAdornment: (showClearButton || endAdornment || label || tooltipContent) && (
            <InputAdornment position="end">
              {endAdornment}
              {showClearButton && (
                <StyledClearButton onClick={e => onChange(null)}>
                  <Icon name="clearclose" />
                </StyledClearButton>
              )}
              {(label || tooltipContent) && (
                <IconTooltip
                  name={tooltipContent ? 'info1' : 'info_outline'}
                  tooltipLabel={label}
                  tooltipValue={
                    value ? format(new Date(value), 'dd.MM.yyyy', { locale: skLocale }) : ''
                  }
                  tooltipContent={tooltipContent}
                  tooltipValueUnit={tooltipValueUnit}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

const unMaskValue = (value: MaterialUiPickersDate) => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).getTime();
};

const StyledDatePicker = styled(KeyboardDatePicker)`
  margin-top: 18px;
  margin-bottom: 4px;
  & .MuiInputAdornment-positionStart button {
    margin-left: -15px;
  }
  & .MuiInputAdornment-positionStart button .MuiSvgIcon-root {
    color: rgba(0, 0, 0, 0.55);
  }
  & .MuiFormHelperText-contained {
    margin-left: 4px;
    margin-right: 4px;
  }
`;

const StyledClearButton = styled(Button)`
  min-width: 10px;
  padding: 5px;
  & .MuiButton-label .icon {
    margin-right: 0;
  }
`;

export default memo(DateField);
