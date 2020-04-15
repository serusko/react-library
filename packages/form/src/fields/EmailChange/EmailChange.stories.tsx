import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withInfo from 'stories/withInfo';
import createStore from '_helpers/store/createStore';

import EmailChange from '.';

const { store } = createStore();

// @ts-ignore
const stories = storiesOf('Remote Fields', EmailChange);

stories.add(
  'Email change field',
  // @ts-ignore
  withInfo(EmailChange)(() => {
    const [value, setValue] = useState<string | null>('random@email.com');

    return (
      <Provider store={store}>
        <EmailChange
          label="email"
          onChange={val => {
            setValue(val);
            action('onChange')(val);
          }}
          onBlur={() => {
            action('onBlur')();
          }}
          name="email"
          value={value}
        />
      </Provider>
    );
  })
);
