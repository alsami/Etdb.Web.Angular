import { UsersSearchFacadeService } from '@etdb/users/+state/facades';
import { FormControl } from '@angular/forms';
import { map, switchMap, take } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

export const userNameAvailableAsyncValidator =
    (usersSearchFacadeService: UsersSearchFacadeService, cdr: ChangeDetectorRef) => {
        return (ctrl: FormControl) => {
            const value = ctrl.value as string;

            if (value === null || value === undefined || value === '') { return of(null); }


            return timer(500).pipe(
                switchMap(() => {
                    usersSearchFacadeService.checkUserNameAvailability(ctrl.value);
                    return usersSearchFacadeService
                        .awaitCheckUserNameAvailabilityCompletion()
                        .pipe(switchMap(() => {
                            return usersSearchFacadeService.userNameAvailable$.pipe(
                                take(1),
                                map(available => {
                                    const error = available ? null : {
                                        userNameTaken: true
                                    };

                                    cdr.markForCheck();

                                    return error;
                                }));
                        }));
                }));

        };
    };


