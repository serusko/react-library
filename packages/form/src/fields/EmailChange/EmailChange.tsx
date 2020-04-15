import { Button } from '@material-ui/core';
import React, { FC, useEffect } from 'react';

import { Dialog } from '_components';
import { useTranslation } from '_helpers';
import { FieldInterface } from '_components/Form';
import { globalClasses } from '_components/GlobalStyles';
import TextField from '_components/Form/fields/TextField';
import { useFormResources } from '_modules/FormResources';

interface Props extends FieldInterface<string> {}

const EmailChange: FC<Props> = ({ label, name, value, onChange, error, helperText, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [emailValue, setEmailValue] = React.useState(value);
  const { t } = useTranslation();

  const [{ loading, error: errorExist, data }, fn, init] = useFormResources(
    'email',
    'EMAIL_SAVE_CHANGE'
  );

  useEffect(() => {
    setEmailValue(value);
  }, [value]);

  useEffect(() => {
    if (!loading && data && open) {
      onChange(data);
      setOpen(false);
      init();
    }
  }, [loading, data, onChange, open, init]);

  const saveHandler = () => {
    fn(emailValue);
  };

  return (
    <>
      <TextField
        onClick={() => setOpen(true)}
        onChange={() => {}}
        value={value}
        variant="outlined"
        margin="dense"
        label={label}
        name={name}
        fullWidth
        {...rest}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={t(`Zmeniť emailovú adresu klienta`)}
        actions={[
          <Button
            className={globalClasses.ml1}
            onClick={saveHandler}
            key="saveEmailModal"
            color="primary"
          >
            {t(`Uložiť emailovú adresu`)}
          </Button>,
          <Button key="closeEmailModal" onClick={() => setOpen(false)}>
            {t(`Zatvoriť`)}
          </Button>,
        ]}
      >
        <p>
          {t(`Emailová adresa klienta sa nemôže zhodovať s emailovou adresou iného Vášho klienta.`)}
        </p>
        <TextField
          {...rest}
          onChange={val => setEmailValue(val || '')}
          value={emailValue}
          disabled={loading}
          label={label}
          name={name}
          variant="outlined"
          margin="dense"
          fullWidth
          autoFocus
          error={errorExist ? errorExist : error}
          helperText={
            errorExist
              ? t('Zadaný email už používate pri inom klientovi, použite prosím iný.')
              : helperText
          }
        />
      </Dialog>
    </>
  );
};

export default EmailChange;
