const newPassword = {
  errors: true,
  compile: function validateNewPassword(options, field, schema) {
    return function newPasswordValidator(value, path, parentData, propName, rootData) {
      newPasswordValidator.errors = [];

      const tpl = {
        keyword: 'newPassword',
        dataPath: path,
      };
      if (value !== parentData.newPassword_repeat) {
        newPasswordValidator.errors.push({
          ...tpl,
          message: `${propName} needs be equal to repeated password`,
        });
      }
      return newPasswordValidator.errors.length === 0;
    };
  },
};

export default newPassword;
