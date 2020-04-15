import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withInfo from 'stories/withInfo';
import createStore from '_helpers/store/createStore';

import InternalUserSearchField from './InternalUserSearchField';

const { store } = createStore();

// @ts-ignore
const stories = storiesOf('Remote Fields', InternalUserSearchField);

stories.add(
  'Internal User Search Field',
  // @ts-ignore
  withInfo(InternalUserSearchField)(() => {
    const [value, setValue] = useState<any | null>(null);

    return (
      <Provider store={store}>
        <InternalUserSearchField
          label="Internal user search"
          onChange={val => {
            setValue(val);
            action('onChange')(val);
          }}
          onBlur={() => {
            action('onBlur')();
          }}
          name="internalUserSearch"
          value={value}
          fullWidth
          margin="dense"
          variant="outlined"
        />
      </Provider>
    );
  })
);
