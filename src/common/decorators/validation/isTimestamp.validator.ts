import { ValidationArguments, registerDecorator } from "class-validator";

export function IsTimestamp() {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'isTimestamp',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: {
                message: (validationArguments: ValidationArguments) => 
                    `${validationArguments.property} must be a timestamp`,
                
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    try {
                        const timestamp = Number(value);
                        if (isNaN(timestamp)) {
                            return false;
                        }

                        const date = new Date(+timestamp);

                        if (date.toString() === 'Invalid Date') {
                            return false;
                        }

                        return true;
                    }      
                    catch (error) {
                        return false;
                    }
                },
            }
        });
    }
}