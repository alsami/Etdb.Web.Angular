import {
    Component,
    AfterViewInit,
    OnInit,
    Output,
    EventEmitter,
    NgZone
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
    selector: 'etdb-google-signin-button',
    templateUrl: 'google-signin-button.component.html'
})
export class GoogleSignInButtonComponent implements OnInit, AfterViewInit {
    @Output() requestSignin: EventEmitter<
        gapi.auth2.GoogleUser
    > = new EventEmitter<gapi.auth2.GoogleUser>(null);

    public constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private ngZone: NgZone
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
                client_id: environment.googleClientId,
                scope: 'profile email openid'
            });

            gapi.auth2.getAuthInstance().attachClickHandler(
                document.getElementById('google-signin'),
                {},
                user => {
                    console.log(user);
                    this.ngZone.run(() => this.requestSignin.emit(user));
                },
                f => console.error(f)
            );
        });
    }
}
