import requiredValidator from './required.validator';
import maxLengthValidator from './maxLength.validator';
import minLengthValidator from './minLength.validator';

const BuiltinValidators: { [key: string]: (value: string, ruler?: any) => boolean } = {
  required: requiredValidator,
  maxLength: maxLengthValidator,
  minLength: minLengthValidator,
};

export default BuiltinValidators;
