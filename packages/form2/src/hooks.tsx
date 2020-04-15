import React, { useMemo } from 'react';
import { ErrorObject } from 'ajv';

import ajv from './schema';

/**
 * use compiled ajv schema to setup initial values
 */
export function useInits(validate?: any, data?: any) {
  return useMemo(() => {
    const initials = JSON.parse(JSON.stringify(data || {})); // copy bcs validate mutate original ref
    validate(initials, true);
    return initials;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), validate]);
}

// -------------------------------------------------------------------------------------------------

interface ValidateFunction {
  (
    data: any,
    mutateRef?: boolean,
    dataPath?: string,
    parentData?: object | Array<any>,
    parentDataProperty?: string | number,
    rootData?: object | Array<any>
  ): boolean | PromiseLike<any>;
  schema?: object | boolean;
  errors?: null | Array<ErrorObject>;
  refs?: object;
  refVal?: Array<any>;
  root?: ValidateFunction | object;
  $async?: true;
  source?: object;
}

/**
 * Compile schema
 */
export function useValidate(schema: any, schemaDef?: any) {
  return useMemo((): ValidateFunction => {
    if (!schema) {
      return ((() => true) as unknown) as ValidateFunction;
    }
    try {
      const validate = schemaDef ? ajv.addSchema(schemaDef).compile(schema) : ajv.compile(schema);
      return validate as ValidateFunction;
    } catch (e) {
      throw new Error(`Failed to compile validation schema: "${e.message}"`);
    }
  }, [schema, schemaDef]);
}

export function useRenderCounter() {
  const ref = React.useRef();
  React.useEffect(() => {
    // @ts-ignore
    ref.current.textContent = Number(ref.current.textContent || '0') + 1;
  });
  return (
    <span
      style={{
        backgroundColor: '#ccc',
        display: 'inline-block',
        position: 'absolute',
        padding: '2px 4px',
        fontSize: '0.8rem',
        borderRadius: 4,
        zIndex: 999,
      }}
      // @ts-ignore
      ref={ref}
    />
  );
}
