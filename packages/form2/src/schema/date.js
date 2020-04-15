import { isValid } from 'date-fns';

const dateFormat = {
  errors: true,
  compile: function validateDate(options, field, schema) {
    return function dateValidator(value, path, parentData, propName, rootData) {
      //console.log(options, schema);
      //console.log(value, path);
      if (
        path.indexOf('partnerPersonDto') !== -1 &&
        (rootData.isPartnerEnabled === false || rootData.showPartner === false)
      ) {
        return true;
      }

      if (value === '' || value === null) {
        return true;
      }

      dateValidator.errors = [];
      const tpl = {
        keyword: 'date',
        dataPath: path,
      };

      if (value && /[^-0-9\\.+]/g.test(value)) {
        dateValidator.errors.push({
          ...tpl,
          message: `Invalid character (0-9 enabled)`,
        });
        return false;
      }

      // Split input into date and ID part
      const dateValue = new Date(value);
      //console.log(dateValue);
      let valDate = false;

      // Split date into separate sections (YY MM DD)
      // const year = value.slice(0, 2);
      // const month = value.slice(2, 4);
      // const day = value.slice(4, 6);
      // Validate date in PID
      if (isValid(dateValue)) {
        valDate = true;
      }

      if (!valDate) {
        dateValidator.errors.push({
          ...tpl,
          message: `Zadaný dátum nie je v požadovanom tvare DD.MM.YYYY`,
        });
        return false;
      }

      if (
        options === 'date18' &&
        valDate &&
        new Date(dateValue).getFullYear() + 18 > new Date().getFullYear()
      ) {
        dateValidator.errors.push({
          ...tpl,
          message: `Zadaný dátum musí byť starší ako 18 rokov.`,
        });
        return false;
      }

      return true;
    };
  },
};

export default dateFormat;
