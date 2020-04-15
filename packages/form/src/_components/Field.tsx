import React, { useContext, memo, useMemo, useRef } from 'react';

import { FieldInterface } from '..';
import { getIn, FormSettersContext, FormStateContext } from '../Form';

type Props<T = unknown> = Omit<
  FieldInterface<T>,
  'value' | 'onChange' | 'onBlur' | 'onFocus' | 'error' | 'name'
> & {
  component: any; // TODO: apply this -> React.ComponentType<FieldInterface<T>>;
  onChange?: (value: T | null) => T | null;
  onFocus?: () => void;
  onBlur?: () => void;
  name: string;

  [x: string]: any;
};

type FieldType = <V = any>(p: Props<V>) => React.ReactElement<Props<V>>;

const Field: FieldType = <V extends { [key: string]: any }>({
  component: InputField,
  helperText,
  name,
  label,
  ...rest
}: Props<V>) => {
  const { renders, onChange, value, error, onBlur } = useConnectField(name);

  return (
    // @ts-ignore
    <InputField
      onChange={(v: any) => onChange(v)}
      helperText={error || helperText}
      variant="outlined"
      margin="dense"
      error={!!error}
      value={value}
      name={name}
      fullWidth
      onBlur={onBlur}
      label={(label || '') + ` (${renders})`}
      {...rest}
    />
  );
};

export default memo(Field);

const useConnectField = (name: string) => {
  const { setFieldValue, setTouched } = useContext(FormSettersContext);
  const { values, errors, touched, formTouched } = useContext(FormStateContext);
  const isTouched = touched[name] !== undefined ? touched[name] : formTouched;

  const error = isTouched && errors && errors[name];
  const value = getIn(values, name);
  const renderCount = useRef(0);

  return useMemo(() => {
    renderCount.current += 1;
    return {
      onChange: (value: any) => setFieldValue(name, value),
      onBlur: () => setTouched(name, true),
      renders: renderCount.current,
      value,
      error,
    };
  }, [value, error, setFieldValue, name, setTouched]);
};
