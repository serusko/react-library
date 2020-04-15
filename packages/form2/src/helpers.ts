import op from 'object-path';
import { ValidateFunction } from 'ajv';

// Immutable set in Object, by path, and renew all nested path refs
export function setIn(target: { [key: string]: any } | Array<any>, path: string, value: any) {
  const val = Array.isArray(target) ? [...target] : { ...target };
  const chunks = path.split('.').slice(0, -1);
  let it = '';
  chunks.forEach((chunk, i) => {
    it += chunk;
    const v = op.get(val, it);
    op.set(val, it, Array.isArray(v) ? [...v] : { ...v });
    it += '.';
  });
  op.set(val, path, value);
  return val as { [key: string]: any } | Array<any>;
}

// Get nested val
export function getIn(obj: any, path: string) {
  return op.get(obj, path.replace(/\[/g, '.').replace(/\]/g, ''));
}

// Reduce AjV validation errors to err map
export const validationReducerFn = (acc: { [path: string]: any }, err: any) => {
  const path = err.dataPath.substr(1) || 'form';
  return {
    ...acc,
    [path]:
      path === 'form'
        ? [...(acc.form || []), err.message || err.keyword]
        : err.message || err.keyword,
  };
};

// OLD form helper - TODO:
export function getValidationFn(validate?: ValidateFunction) {
  if (!validate) {
    return () => ({});
  }
  return function validationFn(data: any) {
    const valid = validate(data);

    // TODO: add localization maybe
    // import localizeAjv from 'ajv-i18n';
    // if (!valid) {
    //   localizeAjv.sk(validate.errors);
    // }
    return valid
      ? {}
      : validate && validate.errors && validate.errors.reduce(validationReducerFn, {});
  };
}
