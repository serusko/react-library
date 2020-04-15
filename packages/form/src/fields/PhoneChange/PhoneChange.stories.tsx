import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withInfo from 'stories/withInfo';
import createStore from '_helpers/store/createStore';

import PhoneChange from '.';

const { store } = createStore();

// @ts-ignore
const stories = storiesOf('Remote Fields', PhoneChange);

stories.add(
  'Phone change field',
  // @ts-ignore
  withInfo(PhoneChange)(() => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Provider store={store}>
        <PhoneChange
          label="phone nmber"
          onChange={val => {
            setValue(val);
            action('onChange')(val);
          }}
          onBlur={() => {
            action('onBlur')();
          }}
          name="phone"
          value={value}
        />
      </Provider>
    );
  })
);
