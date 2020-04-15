# @react-library/permissions

> Ready made Permissions helpers fore React

[![NPM](https://img.shields.io/npm/v/@react-library/permissions.svg)](https://www.npmjs.com/package/@react-library/permissions) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @react-library/permissions
or
npm install --save @react-library/permissions
```

## Usage

### Setup app context

```jsx
import { useSelect } 'react-redux';
import Provider from '@react-library/permissions';

// example resolver using redux (feel free to put your own)
const resolver = (query: string): boolean => {
  // read array of permissions from user profile
  const permissions = useSelect(store => store.user.permissions);
  // check if list of permissions contains requested permission
  return permissions.includes(query);
}

const App = () => (
  <Provider resolver={resolver}>
  {/* now you have available permissions resolver in app */}
  {...appContent}
  </Provider>
);
```

### Value Hook

- every time resolver is changed, specific permission will be re-calculated

```tsx
import { useSelect } from '@react-library/permissions';
const canWrite = usePermission('write');
```

### Getter Hook

- every time resolver is changed, specific permission will be re-calculated with new resolver

```tsx
import { useGetPermission } from '@react-library/permissions';
const getPermission = useGetPermission();
const allowedActions = ['read', 'write'].filter(action => getPermission(action));
```

### Global reference

- if you need to access to permissions outside of JSX (fetch, saga, reducer, ...)

```tsx
import { getPermission } from '@react-library/permissions';

const callApi = () => {
  if (!getPermission('read')) {
  }
};
```

## License

MIT © [serusko](https://github.com/serusko)
