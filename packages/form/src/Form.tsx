import React, {
  FC,
  memo,
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';

import Field from './_components/Field';
import FormRow from './_components/FormRow';
import FormCol from './_components/FormCol';
import FormButton from './_components/FormButton';
import FormSection from './_components/FormSection';

import { useValidate, useInits } from './hooks';
import { getIn, setIn, validationReducerFn } from './helpers';

// -------------------------------------------------------------------------------------------------

/**
 * Form context
 */
interface FormContext {
  /* remember touched fields */
  touched: { [path: string]: boolean };
  /* validation errors */
  errors: undefined | { [path: string]: string };
  /* form values - state */
  values: { [path: string]: any };
  /* form touched */
  formTouched: boolean;
}

// Form context
export const FormStateContext = createContext<FormContext>({
  formTouched: false,
  errors: undefined,
  touched: {},
  values: {},
});

interface SettersContext {
  /* onChange handler */
  setFieldValue: (name: string, value: any) => void;
  /* onClick handler */
  handleClick: (name: string, options: any) => void;
  /* setField touched */
  setTouched: (name: string, value: boolean) => void;
  /* setField errors */
  setError: (name: string, value: string, touched: undefined | boolean) => void;
}

export const FormSettersContext = createContext<SettersContext>({
  setFieldValue: () => {},
  handleClick: () => {},
  setTouched: () => {},
  setError: () => {},
});

// -------------------------------------------------------------------------------------------------

interface Props<D = { [x: string]: any }> {
  /**
   * initial state
   */
  initialValues?: D;
  /**
   * Disable refresh values when initial values are changed
   */
  disableReinitialize?: boolean;
  /**
   * Ajv schema
   */
  schema: Object;
  /**
   * Ajv schema definition
   */
  schemaDef?: any;

  /**
   * On-change values decorator
   */
  decorateOnChange?: (
    name: string,
    value: any,
    values: D,
    setIn: any,
    setFieldValue: (name: string, value: any, values: D) => void,
    setError: (name: string, value: string) => void
  ) => D;
  /**
   * On-click values decorator
   */
  decorateOnClick?: (
    name: string,
    value: any,
    values: D,
    setIn: any,
    setFieldValue: (name: string, options: any, values: D) => void,
    setError: (name: string, value: string) => void
  ) => D;
  /**
   * On-blur values decorator
   */
  decorateOnBlur?: (name: string, values: D, setIn: any) => D;
  [x: string]: any;
  /**
   * On-submit
   */
  onSubmit?: (data: D, actions?: any) => void;
  /**
   * allow to call on-submit cb even if there are vadliadtion errors
   */
  allowSubmitWithErrors?: boolean;
}

const initialState = {
  formTouched: false,
  initialValues: {},
  touched: {},
  values: {},
  errors: {},
};

function initState(validate: any, inits: any) {
  const valid = validate && validate(JSON.parse(JSON.stringify(inits || {})));
  const errors = valid
    ? {}
    : (valid && validate.errors && validate.errors.reduce(validationReducerFn, {})) || {};
  return {
    ...initialState,
    values: JSON.parse(JSON.stringify(inits)),
    errors,
  } as FormContext;
}

// -------------------------------------------------------------------------------------------------

const FormComponent: FC<Props> = ({
  allowSubmitWithErrors,
  initialValues = {},
  decorateOnChange,
  decorateOnClick,
  schemaDef,
  children,
  onSubmit,
  schema,
  id,
}) => {
  const validate = useValidate(schema, schemaDef);
  const inits = useInits(validate, initialValues);

  const [state, setState] = useState<FormContext>(initState(validate, inits));

  const { values, errors, touched, formTouched } = state;

  // strongly private ref, do not forget update when u manipulate state !!!
  const touchedRef = useRef(touched);
  const errorsRef = useRef(errors);
  const valRef = useRef(values);

  // update values when inits are changed
  useEffect(() => {
    const newValues = JSON.parse(JSON.stringify(inits));
    // skip 1st run
    if (JSON.stringify(newValues) !== JSON.stringify(valRef.current)) {
      valRef.current = newValues;
      touchedRef.current = {};
      setState({
        ...initialState,
        values: newValues,
        touched: touchedRef.current,
      });
    }
  }, [inits]);

  /**
   * set Field touched handler
   */
  const setTouched = useCallback(
    (name: string, value: boolean) => {
      if (decorateOnClick) {
        touchedRef.current = { ...(touchedRef.current || {}), [name]: !!value };
        setState({
          values: valRef.current,
          errors: errorsRef.current,
          touched: touchedRef.current,
          formTouched: false,
        });
      }
      return valRef.current;
    },
    [decorateOnClick]
  );

  /**
   * Set field error
   */
  const setError = useCallback(
    (name: string, value: string, touched: boolean | undefined = true) => {
      errorsRef.current = { ...(errorsRef.current || {}), [name]: value };
      touchedRef.current = { ...(touchedRef.current || {}), [name]: touched };
      setState({
        touched: touchedRef.current,
        errors: errorsRef.current,
        values: valRef.current,
        formTouched: false,
      });
      return valRef.current;
    },
    []
  );

  /**
   * Handle field change
   */
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      let newValues = valRef.current;
      if (decorateOnChange) {
        // TODO: inspect infinity loop problem
        newValues = decorateOnChange(name, value, newValues, setIn, setFieldValue, setError);
      } else {
        newValues = setIn(newValues, name, value);
      }
      const valid = validate && validate(JSON.parse(JSON.stringify(newValues)));

      errorsRef.current = valid
        ? undefined
        : (validate.errors && validate.errors.reduce(validationReducerFn, {})) || {};

      valRef.current = newValues;
      setState({
        values: newValues,
        errors: errorsRef.current,
        touched: touchedRef.current,
        formTouched: false,
      });
    },
    [decorateOnChange, validate, setError]
  );

  /**
   * Handle click - callback decorator
   */
  const handleClick = useCallback(
    (name: string, options: any) => {
      if (decorateOnClick) {
        let newValues = valRef.current;
        newValues = decorateOnClick(name, options, newValues, setIn, setFieldValue, setError);
        const valid = validate && validate(JSON.parse(JSON.stringify(newValues)));
        errorsRef.current = valid
          ? {}
          : (valid && validate.errors && validate.errors.reduce(validationReducerFn, {})) || {};
        valRef.current = newValues;

        setState({
          values: newValues,
          errors: errorsRef.current,
          touched: touchedRef.current,
          formTouched: false,
        });
        return newValues;
      }
      return valRef.current;
    },
    [decorateOnClick, setFieldValue, setError, setState, validate]
  );

  /**
   * Handle form submit - callback decorator
   */
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const valid = validate && validate(JSON.parse(JSON.stringify(valRef.current)));

      errorsRef.current = valid
        ? {}
        : (validate.errors && validate.errors.reduce(validationReducerFn, {})) || {};
      touchedRef.current = {};

      setState({
        touched: touchedRef.current,
        errors: errorsRef.current,
        values: valRef.current,
        formTouched: true,
      });

      if (valid || allowSubmitWithErrors) {
        onSubmit && onSubmit(valRef.current, { setError, errors: errorsRef.current });
      }
    },
    [onSubmit, validate, allowSubmitWithErrors, setError]
  );

  /**
   * Create state provider val
   */
  const contextVal: FormContext = useMemo(
    () => ({
      initialValues: inits,
      formTouched,
      touched,
      values,
      errors,
    }),
    [touched, formTouched, values, errors, inits]
  );

  /**
   * Create actions provider val
   */
  const settersVal: SettersContext = useMemo(() => {
    return { setFieldValue, handleClick, setTouched, setError };
  }, [setFieldValue, handleClick, setTouched, setError]);

  return (
    <FormSettersContext.Provider value={settersVal}>
      <FormStateContext.Provider value={contextVal}>
        <>
          <form id={id} onSubmit={handleSubmit} action="post">
            {children}
            <button style={{ display: 'none' }} type="submit" />
          </form>
        </>
      </FormStateContext.Provider>
    </FormSettersContext.Provider>
  );
};

// -------------------------------------------------------------------------------------------------

// @ts-ignore TODO: inspect ts problem
const Form: FC<Props> & {
  Section: typeof FormSection;
  Button: typeof FormButton;
  Field: typeof Field;
  Row: typeof FormRow;
  Col: typeof FormCol;
} = memo(FormComponent);

Form.Section = FormSection;
Form.Button = FormButton;
Form.Field = Field;
Form.Row = FormRow;
Form.Col = FormCol;

export { getIn };

export default Form;

/**
 * Use form context hook - State + Mutations
 */
export function useForm() {
  const a = useContext(FormSettersContext);
  const b = useContext(FormStateContext);
  return { ...a, ...b };
}

/**
 * Use Form context
 */
export function useFormState() {
  return useContext(FormStateContext);
}

/**
 * Use Form Mutations (actions)
 */
export function useFormActions() {
  return useContext(FormSettersContext);
}

/**
 * Use Form value
 */
export function useFormValue(path: string) {
  const { values } = useForm();

  return getIn(values, path);
}
