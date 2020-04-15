import React, { FC, memo } from 'react';

import TextField, { Props as TextFieldProps } from './TextField';

interface Props extends TextFieldProps {}

const PostalCodeField: FC<Props> = ({ onChange, value, ...props }) => {
  const handleChange = (val: string | null) => {
    let value = (val || '').replace(/[^0-9+]/g, '');

    // Number pattern
    const phoneNumberPattern = 'XXX XX';
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

    onChange(formattedValue);
  };

  return <TextField {...props} value={value} onChange={handleChange} disableDebounce />;
};

export default memo(PostalCodeField);
