import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { VALID_THEMES_DESC } from '@etdb/core/core.constants';
import { IdentityUser } from '@etdb/core/models';
import { DomSanitizer } from '@angular/platform-browser';


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

    public userPictureUrl: string;

    public themes = VALID_THEMES_DESC;

    public constructor(private sanitizer: DomSanitizer) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && this.user && this.user.picture) {
            this.userPictureUrl = this.user.picture;
            this.sanitizer.bypassSecurityTrustResourceUrl(this.userPictureUrl);
        }
    }

    public getUserGreeting(): string {
        return 'Hello ' + this.user.preferred_username;
    }
}
