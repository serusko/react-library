import React, { FC, useEffect } from 'react';
import { Button } from '@material-ui/core';

import { Dialog } from '_components';
import { useTranslation } from '_helpers';
import { FieldInterface } from '_components/Form';
import TextField from '_components/Form/fields/TextField';
import SelectField, { OptionType } from '_components/Form/fields/SelectField';
import Form from '_components/Form/Form';

import SelectSearchResultsTable from './SelectSearchResultsTable';

interface Props extends FieldInterface<string | number> {
  options: OptionType[];
  description?: any;
  caption?: string;
  searchHandler?: (searchValue: string) => void;
  clearHandler?: () => void;
  returnFullItem?: boolean;
}

const SelectSearch: FC<Props> = ({
  searchHandler,
  clearHandler,
  description,
  returnFullItem,
  onChange,
  caption,
  options,
  value,
  label,
  name,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchStr, setSearchStr] = React.useState('');

  const { t } = useTranslation();

  useEffect(() => {
    open && setSearchStr('');
  }, [open, setSearchStr]);

  function handleClear() {
    clearHandler && clearHandler();
    onChange(null);
    setOpen(false);
  }

  function handleOptionClick(row: OptionType) {
    onChange(returnFullItem ? row : row.value);
    setOpen(false);
  }

  const selectedOptions = (options || []).filter(it => String(it.value) === String(value));

  return (
    <>
      <SelectField
        onClick={() => setOpen(true)}
        options={selectedOptions}
        onChange={() => {}}
        value={value}
        label={label}
        name={name}
        clearFunc={handleClear}
        {...rest}
      />

      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        actions={[
          <Button key="clearModal" onClick={handleClear}>
            {t(`Zrušiť výber`)}
          </Button>,
          <Button key="closeModal" onClick={() => setOpen(false)}>
            {t(`Zatvoriť`)}
          </Button>,
        ]}
      >
        <Form.Section subtitle={caption}>
          <p>{description}</p>
          <TextField
            onChange={val => {
              setSearchStr(val || '');
              searchHandler && searchHandler(val || '');
            }}
            name={`selectSearch-${name}`}
            value={searchStr}
            label={label}
            variant="outlined"
            margin="dense"
            disableDebounce
            fullWidth
            autoFocus
          />
          {searchStr.trim().length > 0 && (
            <SelectSearchResultsTable
              clickHandler={handleOptionClick}
              tableData={options}
              filter={searchStr}
            />
          )}
        </Form.Section>
      </Dialog>
    </>
  );
};

export default SelectSearch;
