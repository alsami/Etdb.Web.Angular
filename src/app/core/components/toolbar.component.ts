import {
    Component, EventEmitter, Input, Output, OnChanges, SimpleChanges,
    ChangeDetectionStrategy, TemplateRef, ViewChild, OnInit, ViewContainerRef
} from '@angular/core';
import { VALID_THEMES_DESC } from '@etdb/core/core.constants';
import { IdentityUser } from '@etdb/core/models';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    Overlay,
    OverlayRef,
    CdkOverlayOrigin
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';


@Component({
    selector: 'etdb-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class ToolbarComponent implements OnInit, OnChanges {
    @Output() requestThemeChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() requestLogout: EventEmitter<void> = new EventEmitter<void>();
    @Output() linkedMenuClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() hamburgerMenuClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() title = '';
    @Input() sidenavVisible: boolean;
    @Input() user: IdentityUser;

    @ViewChild(CdkOverlayOrigin, { static: false }) overlayOrigin: CdkOverlayOrigin;
    @ViewChild('notificationTemplate', { static: false }) overlayTemplate: TemplateRef<any>;

    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;

    public isSignInPage$: Observable<boolean>;

    public userPictureUrl: string;

    public themes = VALID_THEMES_DESC;

    public constructor(private sanitizer: DomSanitizer, private router: Router,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef) {
    }


    public ngOnInit(): void {
        this.isSignInPage$ = this.router.events.pipe(
            map(() => this.router.url.indexOf('signin') > -1)
        );
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes['user'] || !this.user || !this.user.profileImageUrl) {
            return;
        }

        this.userPictureUrl = this.user.profileImageUrl;
        this.sanitizer.bypassSecurityTrustResourceUrl(this.userPictureUrl);
    }

    public openNotifications(): void {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            return;
        }
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.overlayOrigin.elementRef)
            .withPositions([{
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
                offsetX: 0,
                offsetY: 0,
            }]);


        this.overlayRef = this.overlay.create({
            positionStrategy,
            hasBackdrop: true
        });

        this.portal = new TemplatePortal(this.overlayTemplate, this.viewContainerRef);
        this.overlayRef.attach(this.portal);

        this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }

    public getUserGreeting(): string {
        return 'Hello ' + this.user.userName;
    }
}
