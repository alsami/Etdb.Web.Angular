import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@etdb/+state';
import { TitleActions } from '@etdb/core/+state/actions';
// import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

@Component({
    selector: 'etdb-browse',
    templateUrl: 'browse.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseComponent implements OnInit {
    public constructor(private store: Store<fromRoot.AppState>) { }
    // private hubConnection: HubConnection;

    public ngOnInit(): void {
        //     this.hubConnection = new HubConnectionBuilder()
        //     .withUrl('http://localhost:5001/hubs/chat')
        //     .configureLogging(LogLevel.Critical)
        //     .build();

        // this.hubConnection.start().then(() => {
        //     this.hubConnection.on('ReceiveMessage', (user, message) => console.log('Received message', user, message));
        //     this.hubConnection.invoke('SendMessage', 'some-user', 'some-message')
        //         .then(() => console.log('SEND-MESSAGE'))
        //         .catch(error => console.warn('got error', error));
        // });



        this.store.dispatch(new TitleActions.SetTitle('Browse'));
    }
}
