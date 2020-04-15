const require = {
  errors: true,
  compile: function validateRequires(options, field, schema) {
    return function xyz(value, path, parentData, propName, rootData) {
      if (path.indexOf('partnerPersonDto') !== -1) {
        return true;
      }

      xyz.errors = Array.isArray(xyz.errors) ? xyz.errors : [];
      //console.log(String(value), propName, path, parentData, rootData);
      if (
        !value ||
        value === '' ||
        value === null ||
        value === 'null' ||
        typeof value === 'undefined'
      ) {
        //console.log('--------' + value);
        xyz.errors.push({
          keyword: 'require',
          message: `${propName} is required`,
          dataPath: path,
        });
        return false;
      }

      return true;
    };
  },
};

export default require;
