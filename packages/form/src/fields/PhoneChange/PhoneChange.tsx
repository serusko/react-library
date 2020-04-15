import React, { FC, useEffect } from 'react';
import { Button } from '@material-ui/core';

import { Dialog } from '_components';
import { useTranslation } from '_helpers';
import { globalClasses } from '_components/GlobalStyles';
import { useFormResources } from '_modules/FormResources';
import { PhoneField, FieldInterface } from '_components/Form';

interface Props extends FieldInterface<string> {}

const PhoneChange: FC<Props> = ({ label, name, value, onChange, error, helperText, ...rest }) => {
  const [phoneValue, setPhoneValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const [{ loading, error: errorExist, data }, fn, init] = useFormResources(
    'phone',
    'PHONE_SAVE_CHANGE'
  );

  useEffect(() => {
    setPhoneValue(value);
  }, [value]);

  useEffect(() => {
    if (!loading && data && open) {
      onChange(data);
      setOpen(false);
      init();
    }
  }, [loading, data, onChange, open, init]);

  const saveHandler = () => {
    fn(phoneValue);
  };

  return (
    <>
      <PhoneField
        value={value}
        name={name}
        label={label}
        variant="outlined"
        margin="dense"
        onChange={() => {}}
        onClick={_ => setOpen(true)}
        fullWidth
        {...rest}
      />
      <Dialog
        open={open}
        onClose={_ => setOpen(false)}
        title={t(`Zmeniť telefónne číslo klienta`)}
        actions={[
          <Button
            key="savePhoneModal"
            color="primary"
            onClick={saveHandler}
            className={globalClasses.ml1}
          >
            {t(`Uložiť telefónne číslo`)}
          </Button>,
          <Button key="closePhoneModal" onClick={() => setOpen(false)}>
            {t(`Zatvoriť`)}
          </Button>,
        ]}
      >
        <p>
          {t(`Telefónne číslo klienta sa nemôže zhodovať s telefónnym číslom iného Vášho klienta.`)}
        </p>

        <PhoneField
          {...rest}
          name={name}
          label={label}
          value={phoneValue}
          onChange={val => setPhoneValue(val || '')}
          disabled={loading}
          autoFocus
          variant="outlined"
          margin="dense"
          fullWidth
          error={errorExist ? errorExist : error}
          helperText={
            errorExist
              ? t('Zadané telefónne číslo už používate pri inom klientovi, použite prosím iné.')
              : helperText
          }
        />
      </Dialog>
    </>
  );
};

export default PhoneChange;
