import { FormGroup } from '@angular/forms';


export class PasswordValidator {

    static mismatchedPassword(passwordKey: string, passwordRepeatKey: string) {
        return (group: FormGroup) => {
            if (!group) {
                return;
            }

            const password = group.get(passwordKey).value;
            const confirmPassword = group.get(passwordRepeatKey).value;

            if (password !== confirmPassword) {
                // console.log('false');
                group.get('passwordRepeat').setErrors( { mismatchedPassword: true } );
            } else {
                // console.log('true');
                return null;
            }
        };
    }
}
