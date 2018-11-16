import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'etdb-google-login-button',
    templateUrl: 'google-login-button.component.html'
})
export class GoogleLoginButton implements OnInit, AfterViewInit {
    public constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer
    ) {}

    public ngOnInit(): void {
        this.iconRegistry.addSvgIcon(
            'g-icon',
            this.sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/google.svg'
            )
        );
    }

    public ngAfterViewInit(): void {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id:
                    '545313014879-n64aegcj4rrufptpk9vso3pfs0572ae9.apps.googleusercontent.com',
                scope: 'profile email openid'
            });

            gapi.auth2
                .getAuthInstance()
                .attachClickHandler(
                    document.getElementById('google-signin'),
                    {},
                    x => console.log(x),
                    f => console.log(f)
                );
        });
    }
}
