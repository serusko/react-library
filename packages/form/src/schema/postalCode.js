const PostalCode = {
  errors: true,
  compile: function validatePostalCode(options, field, schema) {
    return function postalCodeValidator(value, path, parentData, propName, rootData) {
      if (value === '' || value === null) {
        return true;
      }

      postalCodeValidator.errors = [];
      const tpl = {
        keyword: 'postalCode',
        dataPath: path,
      };

      if (value && /[^0-9+ ]/g.test(value)) {
        postalCodeValidator.errors.push({
          ...tpl,
          message: `Invalid character (0-9 and space enabled)`,
        });
        return false;
      }

      if (value && value.replace(/ /g, '').length > 5) {
        postalCodeValidator.errors.push({
          ...tpl,
          message: `Postal code must have 5 characters`,
        });
        return false;
      }

      const spacesCount = ((value || '').match(/ /g) || []).length;
      if ((value && value.indexOf(' ') !== 3 && spacesCount === 1) || spacesCount > 1) {
        postalCodeValidator.errors.push({
          ...tpl,
          message: `White space could be only on fourth place`,
        });
        return false;
      }

      return true;
    };
  },
};

export default PostalCode;
