import { FormGroup } from '@angular/forms';

export class PasswordValidator {
    public static mismatchedPassword(passwordKey: string, passwordRepeatKey: string) {
        return (group: FormGroup) => {
            if (!group) {
                return;
            }

            const password = group.get(passwordKey).value;
            const confirmPassword = group.get(passwordRepeatKey).value;

            if (password !== confirmPassword) {
                group.get(passwordRepeatKey).setErrors( { mismatchedPassword: true } );
            } else {
                return null;
            }
        };
    }
}
