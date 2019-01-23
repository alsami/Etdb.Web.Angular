import { Component, NgZone, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'etdb-facebook-signin-button',
    templateUrl: 'facebook-signin-button.component.html'
})
export class FacebookSigninButtonComponent implements OnInit {
    public constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        public ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        this.iconRegistry.addSvgIcon(
            'f-icon',
            this.sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/facebook.svg'
            )
        );
    }
}
