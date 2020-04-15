// https://ajv.js.org/custom.html

const email = {
  errors: true,
  compile: function validateEmail(options, field, schema) {
    return function emailValidator(value, path, parentData, propName, rootData) {
      if (value === '' || value === null) {
        return true;
      }

      emailValidator.errors = [];
      //console.log(path, value, propName);
      const tpl = {
        keyword: 'email',
        dataPath: path,
      };

      if (value && /[^a-zA-Z0-9@_\\-\\.+]/g.test(value)) {
        emailValidator.errors.push({
          ...tpl,
          message: `Email musí obsahovať len tieto povolené znaky (a-z 0-9 @ . _ -)`,
        });
        return false;
      }

      if (
        value &&
        /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(
          value
        )
      ) {
        emailValidator.errors.push({
          ...tpl,
          message: `Email nie je zadaný v správnom formáte.`,
        });
        return false;
      }

      /*if (
        value &&
        (value === 'full').match(
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
        ) === null
      ) {
        emailValidator.errors.push({
          ...tpl,
          message: `Email nie je zadaný v správnom formáte.`,
        });
        return false;
      }*/

      //console.log(phoneValidator.errors);
      //return emailValidator.errors.length === 0;
      return true;
    };
  },
};

export default email;
