import { UsersSearchFacadeService } from '@etdb/users/+state/facades';
import { FormControl } from '@angular/forms';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

export const userNameAvailableAsyncValidator =
    (usersSearchFacadeService: UsersSearchFacadeService) => {
        return (ctrl: FormControl) => {
            const value = ctrl.value as string;

            if (value === null || value === undefined || value === '') { return of(null); }

            usersSearchFacadeService.checkUserNameAvailability(ctrl.value);

            return usersSearchFacadeService
                .awaitCheckUserNameAvailabilityCompletion()
                .pipe(switchMap(() => {
                    return usersSearchFacadeService.userNameAvailable$.pipe(
                        take(1),
                        map(available => available ? null : {
                            userNameTaken: true
                        }));
                }));
        };
    };


