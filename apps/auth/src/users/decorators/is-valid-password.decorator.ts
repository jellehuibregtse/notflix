import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const minLength = 8;
const includesNumber = /[0-9]/;
const includesUpperCase = /[A-Z]/;
const includesLowerCase = /[a-z]/;
const includesSpecialSymbol = /[$&+,:;=?@#|'<>.^*()%!-]/;

export function IsValidPassword(
  validationOptions: ValidationOptions = {
    message:
      'Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter and one special symbol',
  },
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            value.length >= minLength &&
            includesNumber.test(value) &&
            includesLowerCase.test(value) &&
            includesUpperCase.test(value) &&
            includesSpecialSymbol.test(value)
          );
        },
      },
    });
  };
}
