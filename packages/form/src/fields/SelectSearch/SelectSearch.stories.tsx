import { storiesOf } from '@storybook/react';

import withInfo from 'stories/withInfo';
import fieldPrototype from 'stories/fieldPrototype';

import options from './data.json';
import SelectSearch from '.';

const selectOptions = options.map(({ id: value, name: label }) => ({ value, label }));

// @ts-ignore
const stories = storiesOf('Fields', module);
const props = {
  options: selectOptions,
  description:
    'Začnite písať názov požadovanej hodnoty a zobrazia sa vyhľadané položky, ktoré sú k dispozícii pre výber.',
};

// stories.add('SelectSearch', withInfo(SelectSearch)(fieldPrototype(SelectSearch, props)));
