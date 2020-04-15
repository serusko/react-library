import Ajv from 'ajv';

import phone from './phone';
import email from './email';
import require from './require';
import password from './password';
import ico from './ico';
import postalCode from './postalCode';
import newPassword from './newPassword';
import pidNumber from './pidNumber';
import identityCardNumber from './identityCardNumber';
import dateFormat from './date';

const ajv = new Ajv({
  coerceTypes: true,
  removeAdditional: 'all',
  useDefaults: true,
  allErrors: true,
});

ajv.addKeyword('ico', ico);
ajv.removeKeyword('required');
ajv.addKeyword('email', email);
ajv.addKeyword('phone', phone);
ajv.addKeyword('require', require);
ajv.addKeyword('password', password);
ajv.addKeyword('pidNumber', pidNumber);
ajv.addKeyword('dateFormat', dateFormat);
ajv.addKeyword('postalCode', postalCode);
ajv.addKeyword('newPassword', newPassword);
ajv.addKeyword('identityCardNumber', identityCardNumber);

export default ajv;
