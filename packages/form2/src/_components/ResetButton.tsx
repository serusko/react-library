import React from 'react';

import Button from '_components/Button';

import { useForm } from '..';

const ResetButton = () => {
  // @ts-ignore
  const { resetForm, dirty } = useForm();

  const btn = React.useMemo(
    () => (
      // @ts-ignore
      <Button disabled={!dirty} onClick={() => resetForm()} color="default">
        Reset
      </Button>
    ),
    [dirty, resetForm]
  );

  return btn;
};

export default ResetButton;
