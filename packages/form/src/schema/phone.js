// https://ajv.js.org/custom.html

const phone = {
  errors: true,
  compile: function validatePhone(options, field, schema) {
    return function phoneValidator(value, path, parentData, propName, rootData) {
      if (value === '' || value === null) {
        return true;
      }

      phoneValidator.errors = [];

      const tpl = {
        keyword: 'phone',
        dataPath: path,
      };

      if (value && /[^0-9/ -+]/g.test(value)) {
        phoneValidator.errors.push({
          ...tpl,
          message: `Invalid character (0-9 + - / and space enabled)`,
        });
        return false;
      }

      /*if (
        value &&
        (value.indexOf('+') > 0 ||
          (value.indexOf('+') === 0 && ((value || '').match(/\+/g) || []).length > 1))
      ) {
        phoneValidator.errors.push({
          ...tpl,
          message: `Plus sign could be only on first place`,
        });
      }*/

      if (options && Array.isArray(options)) {
        const val = (value || '').trim().replace(/ /g, ' ');
        if (!options.some(prefix => val.startsWith(prefix))) {
          phoneValidator.errors.push({
            ...tpl,
            message: `Phone number have to be prefixed with one of: ` + options.join(', '),
          });
          return false;
        }
      }

      if (value && (value || '').match(/\d{3}\s\d{3}\s\d{3}/g) === null) {
        phoneValidator.errors.push({
          ...tpl,
          message: `Telefónne číslo nie je zadané v správnom formáte. Viac informácií nájdete v "i" tooltipe.`,
        });
        return false;
      }

      //console.log(phoneValidator.errors);
      return true;
    };
  },
};

export default phone;
