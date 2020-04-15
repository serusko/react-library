import React, { FC, memo, useMemo } from 'react';

import Context from './Context';

interface Props {
  resolver: (query: string) => boolean;
}

let _resolver: undefined | Props['resolver'] = undefined;

/**
 * Permissions provider
 * - React context provider to enable re-render every time permission is changed
 */
const Provider: FC<Props> = memo(({ resolver, children }) => {
  const resolve = useMemo(() => {
    _resolver = resolver;
    return (q: string) => getPermission(q);
  }, [resolver]);

  return <Context.Provider value={resolve}>{children}</Context.Provider>;
});

export default Provider;

/**
 * Evaluate permission in time
 * - simple getter for imperative usage
 */
export const getPermission = (query: string) => {
  return Boolean(typeof _resolver === 'function' && _resolver(query));
};
