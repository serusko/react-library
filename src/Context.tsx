import { createContext, useContext, useMemo, useState, useRef } from 'react';

/**
 * Permissions context type
 *
 * @param {void} resolver - permission resolver with custom logic
 */
const Context = createContext<(query: string) => boolean | Promise<boolean>>(
  (_path: string | string[]) => true
);

export default Context;

/**
 * Custom permission hook to track and evaluate specific permission
 *
 * Query permission
 * @param {Array<string>} queries
 * Returns permission availability
 * @returns {Object{[query: string]: boolean}
 */
export const usePermission = (query: string) => {
  const useStateValue = useRef<boolean>(false);
  const [value, setValue] = useState(false);
  const resolver = useContext(Context);

  return useMemo(() => {
    if (useStateValue.current) {
      useStateValue.current = false;
      return value;
    }

    const v = resolver(query);

    console.log(query, v);

    if (typeof v === 'boolean') {
      return v;
    } else {
      useStateValue.current = false;
      v.then(setValue);
      return false;
    }
  }, [query, resolver, setValue]);
};

/**
 * Custom permission hook to track and evaluate multiple permissions
 *
 * Query multiple permissions
 * @param {Array<string>} queries
 * Returns map with resolved permissions
 * @returns {Object{[query: string]: boolean}
 */
export const usePermissions = (queries: string[]) => {
  // TODO: support async
  const resolver = useContext(Context);
  return useMemo(() => queries.reduce((acc, q) => ({ ...acc, [q]: resolver(q) }), {}), [
    resolver,
    JSON.stringify(queries), // track deep changes
  ]);
};
