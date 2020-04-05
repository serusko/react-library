import React, { useCallback } from 'react';

import Provider, { Permission, usePermission } from '@react-library/permissions';

const App = () => {
  const res = useCallback(q => {
    console.log('q', q, q === 'index');
    return q === 'index';
  }, []);

  return (
    <Provider resolver={res} fallback={<p>Index content is hidden</p>}>
      <Permission q="index">
        <p>Visible Index permission</p>
      </Permission>

      <Permission q="another" fallback={<p>Another content is hidden</p>}>
        <p>Visible Another permission</p>
      </Permission>

      <HookExample />
    </Provider>
  );
};

const HookExample = () => {
  const hasIndexParmission = usePermission('index');
  const hasAnotherParmission = usePermission('another');
  return (
    <>
      <p>hasIndexParmission: {hasIndexParmission ? 1 : 0}</p>
      <p>hasAnotherParmission: {hasAnotherParmission ? 1 : 0}</p>
    </>
  );
};

export default App;
