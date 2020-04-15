import React, { useCallback } from 'react';

import Provider, {
  Permission,
  usePermission,
  getPermission,
  useGetPermission,
} from '@react-library/permissions';

const App = () => {
  const res = useCallback(q => {
    return q === 'read'; // enable only read "enum"
  }, []);

  const trackedGetPermission = useGetPermission();

  return (
    <div style={{ padding: '1rem' }}>
      <Provider resolver={res} fallback={<p>read content is hidden</p>}>
        {/* Enabled "read" permission content */}
        <Permission q="read">
          <p>Visible read permission</p>
        </Permission>
        {/* Disabled "write" permission content */}
        <Permission q="write" fallback={<p>write content is hidden</p>}>
          <p>Visible write permission</p>
        </Permission>
        {/* Hook values example */}
        <HookExample />
        {/* Global Ref resolver */}
        Permissions map:{' '}
        {['read', 'write'].map(i => `${i} = ${trackedGetPermission(i) ? 1 : 0}`).join(', ')}
        <br />
        <button onClick={() => alert(getPermission('read'))}>Eval read permission</button>
      </Provider>
    </div>
  );
};

const HookExample = () => {
  const hasReadPermission = usePermission('read');
  const hasWritePermission = usePermission('write');

  return (
    <>
      <p>hasReadPermission: {hasReadPermission ? 1 : 0}</p>
      <p>hasWritePermission: {hasWritePermission ? 1 : 0}</p>
    </>
  );
};

export default App;
