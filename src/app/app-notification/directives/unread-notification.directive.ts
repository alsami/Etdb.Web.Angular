import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
import { AppNotification } from '@etdb/app-notification/models';

@Directive({
  selector: '[etdbUnreadNotification]'
})
export class UnreadNotificationDirective implements AfterViewInit {

    @Input('etdbUnreadNotification') appNotificaton: AppNotification;

    public constructor(private elementRef: ElementRef) {}

    public ngAfterViewInit(): void {
        console.log(this.appNotificaton, this.elementRef);

        if (!this.appNotificaton.read) {
            this.elementRef.nativeElement.style.fontWeight = 'bold';
            return;
        }
    }

}
