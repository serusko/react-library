const ico = {
  errors: true,
  compile: function validateIco(options, field, schema) {
    return function icoValidator(value, path, parentData, propName, rootData) {
      if (value === '' || value === null) {
        return true;
      }

      icoValidator.errors = [];
      const tpl = {
        keyword: 'ico',
        dataPath: path,
      };

      if (value && /[^0-9+]/g.test(value)) {
        icoValidator.errors.push({
          ...tpl,
          message: `Invalid character (0-9 enabled)`,
        });
        return false;
      }

      if (value && value.length !== 8) {
        icoValidator.errors.push({
          ...tpl,
          message: `Ico must have 8 characters`,
        });
        return false;
      }

      return true;
    };
  },
};

export default ico;
