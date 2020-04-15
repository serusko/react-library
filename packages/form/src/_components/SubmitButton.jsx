import React from 'react';

//import { useForm } from '..';
import Button from '_components/Button';
import { useTranslation } from '_helpers';
//import { useTranslation } from '_helpers';

function SubmitButton({ className, onClick, children, ...props }) {
  //const { dirty, isSubmitting } = useForm();
  const { t } = useTranslation();
  //disabled={!dirty || isSubmitting} TODO - this was removed from Form - is int not needed?
  const btn = React.useMemo(
    () => (
      <Button onClick={onClick} type="submit" color="primary" className={className}>
        {children || t(`Odoslať`)}
      </Button>
    ),
    [onClick, className, children, t]
  );

  return btn;
}

export default React.memo(SubmitButton);
