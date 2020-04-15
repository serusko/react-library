import { useMemo } from 'react';

import { useFormState, FormStateContext } from './Form';
import { getIn } from './helpers';

interface Props {
  validate: (values: { [key: string]: any }) => { [key: string]: string };
  name: string
}

const FormCustomErrors: FC<Props> = memo(({name,  validate }) => {
  const state = useFormState();

  // TODO merge field specific errors
  const value = useMemo({
      return {...state, errors: validate(state.values, state.errors) }}
  }, [state, validate])

  return <FormStateContext value={value}>{children}</FormStateContext>;
});

const validate = (saved) => (values, errors) => {

    newErrors = saved ? {}: {...errors }

    if(getIn(values, path) <54){
        newErrors[path] = 'Some err'
    }

    return newErrors;
}



// on click logika
// name = product[i]
render({name}) {

    const [clicked, setClicked] = useState(false);

    const validate  = useCallback((values, errors) => {

       if(clicked) {
           return errors;
       }

       return  {...errors, ...validatesendXYProduct(values)}

    }, [clicked]);

    <Form>
        <Field name="1" />

        <FormCustomErrors validate={validate} name={name }>
            <Field name="2" />

            <button onClick={() => {setClicked(true)}}>Dopocitaj</button>
        </FormCustomErrors>
    </Form>
}





// on change logika
// name = product[i]



render({name,currentPrefix}) {

    const customValidateOnChange = useCallback((values) => {
        const errors = creditProductOnChange(newValues, currentPrefix)
    }, [currentPrefix]);

    return <Form>
        <Field name="1" />

        <FormCustomErrors validate={customValidateOnChange} name={name }>
            <Field name="2" />

            <button onClick={() => {setClicked(true)}}>Dopocitaj</button>
        </FormCustomErrors>
    </Form>
}