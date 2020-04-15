const identityCardNumber = {
  errors: true,
  compile: function validateIco(options, field, schema) {
    return function identityCardNumberValidator(value, path, parentData, propName, rootData) {
      if (value === '' || value === null) {
        return true;
      }
      identityCardNumberValidator.errors = [];
      const tpl = {
        keyword: 'identityCardNumber',
        dataPath: path,
      };
      if (value && !/^(([a-zA-Z]{2})([0-9]{6}))$/g.test(value)) {
        identityCardNumberValidator.errors.push({
          ...tpl,
          message: `Neplatný formát čísla občianského preukazu. (napr. SK123456)`,
        });
      }

      return identityCardNumberValidator.errors.length === 0;
    };
  },
};

export default identityCardNumber;
