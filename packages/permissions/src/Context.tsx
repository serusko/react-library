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
 * @param {string} query
 * Returns permission availability
 * @returns {boolean}
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

    if (typeof v === 'boolean') {
      return v;
    } else if (v && v.then) {
      useStateValue.current = true;
      v.then(setValue);
    }
    return false;
  }, [query, resolver, setValue]);
};

/**
 * Custom permission hook - return resolver reference
 *
 * @returns {void}
 */
export const useGetPermission = () => {
  return useContext(Context);
};
