import { isValid } from 'date-fns';

const pidNumber = {
  errors: true,
  compile: function validatePidNumber(options, field, schema) {
    return function pidNumberValidator(value, path, parentData, propName, rootData) {
      if (value === '' || value === null) {
        return true;
      }

      pidNumberValidator.errors = [];
      const tpl = {
        keyword: 'pidNumber',
        dataPath: path,
      };
      if (value && /[^0-9\\/+]/g.test(value)) {
        pidNumberValidator.errors.push({
          ...tpl,
          message: `Invalid character (0-9 enabled)`,
        });
        return false;
      }

      if (value && String(value).length !== 11 && String(value).length !== 10) {
        pidNumberValidator.errors.push({
          ...tpl,
          message: `Value must have 10-11 characters`,
        });
        return false;
      }

      if (
        value &&
        (((value || '').match(/\//g) || []).length !== 1 || (value || '').indexOf('/') !== 6)
      ) {
        pidNumberValidator.errors.push({
          ...tpl,
          message: `Char / could be only on seventh place`,
        });
        return false;
      }

      // Split input into date and ID part
      const splitValue = (value || '').split('/');
      const dateValue = splitValue[0];
      const idValue = splitValue[1];
      let valPid = false;
      // PID validation
      if (dateValue.length === 6) {
        // Date part needs to be precisely 6 characters
        if (idValue !== undefined) {
          // ID part needs to exist
          if (idValue.length >= 3 && idValue.length <= 4) {
            // ID part needs to be between 3 and 4 characters

            // Split date into separate sections (YY MM DD)
            const year = dateValue.slice(0, 2);
            const month = dateValue.slice(2, 4);
            const day = dateValue.slice(4, 6);
            // Validate date in PID
            if (
              (parseInt(month) >= 1 && parseInt(month) <= 12) ||
              (parseInt(month) - 50 >= 1 && parseInt(month) - 50 <= 12)
            ) {
              // Month has to be in range of 1 - 12
              if (parseInt(day) >= 1 && parseInt(day) <= 31) {
                // Day has to be in range of 1 - 31
                if (idValue.length === 3) {
                  // ID part has to be 3 digits long
                  if (parseInt(year) < 54) {
                    // Year has to be less than 54
                    if (
                      isValid(new Date(year, month, day)) ||
                      isValid(new Date(year, (parseInt(month) - 50).toString(), day))
                    ) {
                      // Men date validation and women date validation (-50)
                      valPid = true;
                    }
                  }
                } else {
                  // ID part has to be 4 digits long (idValue.length === 4)
                  // eslint-disable-next-line no-lonely-if
                  if (parseInt(dateValue + idValue) % 11 === 0) {
                    // Date part + ID part has to be "divided able" by 11
                    if (
                      isValid(new Date(year, month, day)) ||
                      isValid(new Date(year, (parseInt(month) - 50).toString(), day))
                    ) {
                      // Men date validation and women date validation (-50)
                      valPid = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (!valPid) {
        pidNumberValidator.errors.push({
          ...tpl,
          message: `Men date validation and women date validation (-50)`,
        });
        return false;
      }
      return true;
    };
  },
};

export default pidNumber;
