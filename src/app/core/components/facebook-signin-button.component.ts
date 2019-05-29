import { Component, NgZone, OnInit, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'etdb-facebook-signin-button',
    templateUrl: 'facebook-signin-button.component.html'
})
export class FacebookSigninButtonComponent implements OnInit {
    private readonly connected: string = 'connected';

    @Output() requestSignin: EventEmitter<string> = new EventEmitter();

    public constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private ngZone: NgZone
    ) { }

    public ngOnInit(): void {
        this.iconRegistry.addSvgIcon(
            'f-icon',
            this.sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/facebook.svg'
            )
        );
    }

    public showSigninDialog(): void {
        const config = {
            scope: 'email public_profile',
            return_scopes: true
        };

        FB.login(response => {
            if (response.status !== this.connected) {
                return;
            }

            this.ngZone.run(() =>
                this.requestSignin.emit(response.authResponse.accessToken)
            );
        }, config);
    }
}
