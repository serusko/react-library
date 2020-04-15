import React, { useMemo } from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import Form from '../Form';
import Field from './_components/Field';
import TextField from './fields/TextField';
import SelectField from './fields/SelectField';
import TextareaField from './fields/TextareaField';

import { validationSchema, definitions } from 'pages/ClientPage/ClientAnalysis/_schema';

// @ts-ignore
const stories = storiesOf('Form', module);
stories.add('Basic', () => <StateWrapper />);

const Wrapper = ({ store }: any) => {
  return (
    <Form
      store={useMemo(
        () => ({
          state: store.state,
          set: (s: any) => {
            store && store.set && store.set(s);
          },
        }),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(store.state)]
      )}
      initialValues={{ value1: 'ss' }}
      schema={validationSchema}
      schemaDef={definitions}
      decorateOnChange={(name, value, values, setIn) => {
        let v = setIn(values, name, value);
        if (name === 'value1') {
          v = setIn(v, 'value2', (value || '').toUpperCase());
        }
        return v;
      }}
    >
      <Field component={TextField} name="value1" label="Example 1" />

      <Field component={TextField} name="value2" label="Example 2" />

      <Field component={TextareaField} name="value1" label="Example 1" />

      <Field component={TextareaField} name="value3" label="Example 3" />

      <Field
        options={[{ value: '1', label: 'jedna' }]}
        label="Example 1"
        component={SelectField}
        name="value1"
        showEmpty
      />
    </Form>
  );
};

const StateWrapper = withState({ touched: {}, values: {}, errors: {} })(({ store }) => (
  <Wrapper store={store} />
));
