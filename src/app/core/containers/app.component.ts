import { Component, OnDestroy } from '@angular/core';
import { PRIMARY_THEME } from '@etdb/core/core.constants';
import {
    OverlayContainer,
} from '@angular/cdk/overlay';
import { AuthFacadeService, LayoutFacadeService } from '@etdb/core/+state/facades';
import { Subscription } from 'rxjs';
import { AppNotificationsFacadeService } from '@etdb/app-notification/+state/facades';

@Component({
    selector: 'etdb-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
    private themeSub: Subscription;

    public theme = PRIMARY_THEME;

    public constructor(

        private overlayContainer: OverlayContainer,
        private authFacadeService: AuthFacadeService,
        private layoutFacadeService: LayoutFacadeService,
        private notificationsFacadeService: AppNotificationsFacadeService,
    ) {
        this.subscribeThemeChanges();
        this.authFacadeService.initialize();
        this.notificationsFacadeService.restore();
    }

    public ngOnDestroy(): void {
        this.themeSub.unsubscribe();
    }

    private subscribeThemeChanges(): void {
        this.themeSub = this.layoutFacadeService.currentTheme$.subscribe(theme => {
            if (theme !== this.theme) {
                this.overlayContainer
                    .getContainerElement()
                    .classList.remove(this.theme);
                this.theme = theme;
            }
            this.overlayContainer.getContainerElement().classList.add(theme);
        });
    }
}
