import {
    Component,
    AfterViewInit,
    OnInit,
    Output,
    EventEmitter,
    NgZone,
    Input
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'etdb-google-signin-button',
    templateUrl: 'google-signin-button.component.html'
})
export class GoogleSignInButtonComponent implements OnInit, AfterViewInit {
    @Output() requestSignin: EventEmitter<
        gapi.auth2.GoogleUser
    > = new EventEmitter<gapi.auth2.GoogleUser>(null);

    @Input() googleAuthAvailable: boolean;

    public constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private ngZone: NgZone
    ) { }

    public ngOnInit(): void {
        this.iconRegistry.addSvgIcon(
            'g-icon',
            this.sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/google.svg'
            )
        );
    }

    public ngAfterViewInit(): void {
        try {
            gapi.auth2.getAuthInstance().attachClickHandler(
                document.getElementById('google-signin'),
                {},
                user => {
                    this.ngZone.run(() => this.requestSignin.emit(user));
                },
                f => console.error(f)
            );
        } catch (error) {
            console.warn(error);
        }
    }
}
