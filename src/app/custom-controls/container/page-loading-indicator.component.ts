import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'etdb-page-loading-indicator',
    templateUrl: 'page-loading-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageLoadingIndicatorComponent {
    @Input() loading: boolean;
}
