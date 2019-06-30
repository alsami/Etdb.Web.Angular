import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { VALID_THEMES_DESC } from '@etdb/core/core.constants';
import { IdentityUser } from '@etdb/core/models';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
    selector: 'etdb-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent implements OnChanges {
    @Output() requestThemeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() requestLogout: EventEmitter<void> = new EventEmitter<void>();
    @Output() linkedMenuClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() hamburgerMenuClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() title = '';
    @Input() sidenavVisible: boolean;
    @Input() user: IdentityUser;

    public isSignInPage$: Observable<boolean>;

    public userPictureUrl: string;

    public themes = VALID_THEMES_DESC;

    public constructor(private sanitizer: DomSanitizer, private router: Router) {
        this.isSignInPage$ = this.router.events.pipe(
            map(() => this.router.url.indexOf('signin') > -1)
        );
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && this.user && this.user.profileImageUrl) {
            this.userPictureUrl = this.user.profileImageUrl;
            this.sanitizer.bypassSecurityTrustResourceUrl(this.userPictureUrl);
        }
    }

    public getUserGreeting(): string {
        return 'Hello ' + this.user.userName;
    }
}
