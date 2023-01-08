import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { comparedStartAndEnd } from "../lib";

@ValidatorConstraint({ name: "IsBeforeDate" })
export class IsBeforeDateConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    return comparedStartAndEnd(propertyValue, args.object[relatedPropertyName]);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "date can not before";
  }
}

export function IsBeforeDate(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsBeforeDateConstraint,
    });
  };
}
