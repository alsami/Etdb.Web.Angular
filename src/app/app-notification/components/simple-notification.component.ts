import { Component, OnInit, Input } from '@angular/core';
import { SimpleNotification } from '@etdb/app-notification/models';

@Component({
    selector: 'etdb-simple-notification',
    templateUrl: 'simple-notification.component.html',
})
export class SimpleNotificationComponent implements OnInit {
    @Input() notification: SimpleNotification;
    constructor() { }

    ngOnInit() {
    }

}
