import React, { FC, memo } from 'react';

import { useTranslation } from '_helpers';
import { FieldInterface } from '_components/Form';

import useStyles from './useStyles';
import TextField from '../TextField';

interface Props extends FieldInterface<string> {}

const PhoneField: FC<Props> = ({ onChange, ...props }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const tooltipContent = (
    <>
      {t(`Vždy zadávajte aj s predvoľbou krajiny, napríklad:`)}
      <br />
      {t(`Slovensko: +421 XXX XXX XXX *`)}
      <br />
      {t(`Česká republika: +420 XXX XXX XXX`)}
      <br />
      {t(`Poľsko: +48 XXX XXX XXX`)}
      <br />
      {t(`Rakúsko: +43 XXX XXX XXX`)}
      <br />
      {t(`Maďarsko: +36 XX XXX XXX`)}
      <br />
      {t(`Ukrajina: +380 XX XXX XXX`)}
      <br />
      {t(`Ostatné krajiny Európy a sveta nájdete tu:`)}
      <br />
      <a
        href="https://sk.wikipedia.org/wiki/Zoznam_smerov%C3%BDch_telef%C3%B3nnych_%C4%8D%C3%ADsiel_%C5%A1t%C3%A1tov#Z%C3%B3na_3_%E2%80%93_Eur%C3%B3pa"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        {t(`Zoznam smerových telefónnych čísel štátov`)}
      </a>
      <br />
      <br />
      {t(
        `* Pri slovenskom telefónnom čísle so zadanou predvoľbou krajiny sa neuvádza počiatočná nula pri čísle operátora.`
      )}
    </>
  );

  return (
    <TextField
      startAdornment={t(`+`)}
      onChange={handleChange(onChange)}
      {...props}
      tooltipContent={tooltipContent}
      disableDebounce
    />
  );
};

export default memo(PhoneField);

const handleChange = (setter: Function) => (val: string | null) => {
  let value = (val || '').replace(/[^0-9+]/g, '');

  // Number pattern
  const phoneNumberPattern = 'XXX XXX XXX XXX';
  const patternLength = phoneNumberPattern.replace(/ /g, '').length;

  // Ensure value is string
  value = value ? value.toString().substr(0, patternLength) : '';

  // Test if formatting should enabled (input needs to be within the bounds of pattern length)
  const shouldFormat = value.length <= patternLength;

  // New (formatted) value
  let formattedValue = '';

  // Current space index
  let currentSpaceIndex = 0;

  // Total number of spaces added to the number
  let totalSpacesAdded = 0;

  // Iterate through all characters
  for (let i = 0; i < value.length; i++) {
    // Get current space index
    currentSpaceIndex = phoneNumberPattern.indexOf(' ', currentSpaceIndex);

    // Add space if formatting is enabled and current char is a space position
    if (shouldFormat && i === currentSpaceIndex - totalSpacesAdded) {
      formattedValue += ' ';
      currentSpaceIndex++;
      totalSpacesAdded++;
    }

    // Add current char to new (formatted) value
    formattedValue += value[i];
  }

  setter(formattedValue);
};
