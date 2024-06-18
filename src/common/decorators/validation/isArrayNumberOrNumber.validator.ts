
import { ValidationArguments, registerDecorator } from "class-validator";

export function IsArrayNumberOrNumber(validateOptions?: {minLength?: number, maxLength?: number}) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'isArrayNumberOrNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: {
                message: (validationArguments: ValidationArguments) => {
                    const { property } = validationArguments;
                    if (validateOptions?.maxLength && validateOptions?.minLength) {
                        return `${property} must be an array of number or number and have length between ${validateOptions.minLength} and ${validateOptions.maxLength}`;
                    }
                    else if (validateOptions?.maxLength) {
                        return `${property} must be an array of number or number and have length less than ${validateOptions.maxLength}`;
                    }
                    else if (validateOptions?.minLength) {
                        return `${property} must be an array of number or number and have length greater than ${validateOptions.minLength}`;
                    }
                    else {
                        return `${property} must be an array of number or number`;
                    }
                }
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    try {
                        if (!value) {
                            return false;
                        }
                        if (Array.isArray(value)) {
                            if (validateOptions?.maxLength) {
                                if (value.length > validateOptions.maxLength) {
                                    return false;
                                }
                            }

                            if (validateOptions?.minLength) {
                                if (value.length < validateOptions.minLength) {
                                    return false;
                                }
                            }

                            for (const item of value) {
                                const number = Number(item);
                                if (isNaN(number)) {
                                    return false;
                                }
                            }

                            return true;
                        }
                        else {
                            const number = Number(value);
                            if (isNaN(number)) {
                                return false;
                            }

                            return true;
                        }
                    }      
                    catch (error) {
                        return false;
                    }
                },
            }
        });
    }
}