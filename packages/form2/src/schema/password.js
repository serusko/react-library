const password = {
  errors: true,
  compile: function validateRequires(options, field, schema) {
    return function xyz(value, path, parentData, propName, rootData) {
      if (options === false) {
        return true;
      }
      xyz.errors = [];
      const tpl = {
        keyword: 'password',
        dataPath: path,
      };

      if (value && value.length < 8) {
        xyz.errors.push({
          ...tpl,
          message: `${propName} needs to 8 characters`,
        });
      }

      if (value && !/[A-Z]+/.test(value)) {
        xyz.errors.push({
          ...tpl,
          message: `${propName} needs to contain atleast one uppercase character`,
        });
      }
      if (value && !/[0-9]+/.test(value)) {
        xyz.errors.push({
          ...tpl,
          message: `${propName} needs to contain atleast one digit`,
        });
      }
      return xyz.errors.length === 0;
    };
  },
};

export default password;
