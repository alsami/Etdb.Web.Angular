import { FormArray } from '@angular/forms';

export class FormArrayValidators {
    public static minLength(min: number): any {
        return (array: FormArray): { [key: string]: any } => {
            if (!array) {
                return null;
            }

            if (array.controls.length >= min) {
                return null;
            }

            return { 'minLength': {
                valid: false
            }};
        };
    }
}
