import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VALID_THEMES_DESC } from '@etdb/core/core.constants';
import { IdentityUser } from '@etdb/core/models';


@Component({
    selector: 'etdb-toolbar',
    templateUrl: 'toolbar.component.html'
})

export class ToolbarComponent {
    @Output() requestThemeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() requestLogout: EventEmitter<void> = new EventEmitter<void>();
    @Output() mainMenuClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() title = '';
    @Input() sidenavVisible: boolean;
    @Input() user: IdentityUser;
    themes = VALID_THEMES_DESC;

    public getUserGreeting(): string {
        return 'Hello ' + this.user.preferred_username;
    }

    public emitMainMenuClicked(): void {
        this.mainMenuClicked.emit(!this.sidenavVisible);
    }
}
