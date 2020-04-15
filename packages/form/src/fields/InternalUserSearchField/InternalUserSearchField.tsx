import React, { FC, memo } from 'react';

import InternalUserSearch from 'pages/_components/InternalUserSearch';

import { FieldInterface } from '../..';

interface User {
  firstName: string;
  lastName: string;
  title: string;
  id: number;
}

interface UserRow {
  label: string;
  allData: User;
  value: number; // TODO: inspect
}

interface Props extends FieldInterface<User> {
  showClearBtn?: boolean;
}

const InternalUserSearchField: FC<Props> = ({ onChange, label, ...rest }) => {
  const { name, value } = rest;

  function onSelectItem(item: UserRow | null) {
    if (!item) {
      onChange && onChange(null);
      return;
    }
    const val = {
      id: item.value,
      firstName: item.allData.firstName,
      lastName: item.allData.lastName,
      title: item.allData.title,
    };
    onChange && onChange(val);
  }

  return (
    <InternalUserSearch {...rest} onChange={onSelectItem} value={value} label={label} name={name} />
  );
};

export default memo(InternalUserSearchField);
