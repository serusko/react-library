import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';

const useDebouncedFieldProps = (props: any, optimize: boolean = true, delay: number = 333) => {
  const [v, setV] = useState(null);
  const onChangeRef = useRef<(v: any) => void>(null);
  const vv = props.value || null;

  useEffect(() => {
    setV(vv);
  }, [vv]);

  const debouncedChange = useMemo(
    () =>
      debounce((val: any) => onChangeRef.current && onChangeRef.current(val), delay, {
        maxWait: 1000,
      }),
    [delay]
  );

  const handleChange = useCallback(
    (v: any) => {
      setV(v);
      debouncedChange(v);
    },
    [debouncedChange]
  );

  return useMemo(() => {
    if (!optimize) {
      return props;
    }

    const { value, onChange, onBlur } = props;
    // @ts-ignore
    onChangeRef.current = onChange;

    const handleBlur = () => {
      debouncedChange.cancel();
      if (v !== value) {
        onChange(v);
      }
      onBlur && onBlur();
    };

    return { ...props, value: v, onChange: handleChange, onBlur: handleBlur };
  }, [debouncedChange, handleChange, optimize, props, v]);
};

export default useDebouncedFieldProps;
