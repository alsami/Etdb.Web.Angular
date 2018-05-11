import { FormArray, FormGroup } from '@angular/forms';

export class PrimaryEmailValidation {
    static primaryEmail(primaryControlName: string): any {
        return (array: FormArray): { [key: string]: any } => {
            if (!array) {
                return null;
            }

            const groups = array.controls as FormGroup[];

            const groupsMarkedAsPrimary = groups
                .filter(group => (group.controls[primaryControlName].value as boolean));

            if (groupsMarkedAsPrimary.length > 1) {
                return {
                    'hasMultilePrimary': {
                        valid: false
                    }
                };
            }

            if (groupsMarkedAsPrimary.length === 0) {
                return {
                    'hasNoPrimary': {
                        valid: false
                    }
                };
            }

            return null;
        };
    }
}
