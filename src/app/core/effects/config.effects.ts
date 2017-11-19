import { Actions, Effect } from '@ngrx/effects';
import { ConfigService } from '../services/config.service';
import * as configActions from '../actions/config.actions';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import * as notificationMessageActions from '../actions/notification-message.actions';



@Injectable()
export class ConfigEffects {
    public constructor(private configService: ConfigService, private actions$: Actions) {}

    @Effect() loadClientConfig = this.actions$
        .ofType(configActions.LOAD_CLIENT_CONFIG)
        .switchMap(() => {
            return this.configService.LoadClientConfig()
                .map(clientConfig => new configActions.LoadClientConfigSuccessAction(clientConfig))
                .catch((error: Error) => of(new configActions.LoadClientConfigFailAction(error)));
        });

    @Effect() loadClientConfigFail = this.actions$
        .ofType(configActions.LOAD_CLIENT_CONFIG_FAIL)
        .map((action: configActions.LoadClientConfigFailAction) => {
            return new notificationMessageActions.NotifyErrorAction({
                error: action.error,
                message: 'Error loading client config!'
            });
        });
}
