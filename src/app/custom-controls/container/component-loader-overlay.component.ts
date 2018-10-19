import { Component, Input } from '@angular/core';

@Component({
    selector: 'etdb-component-loader-overlay',
    templateUrl: 'component-loader-overlay.component.html',
    styleUrls: ['component-loader-overlay.component.scss']
})

export class ComponentLoaderOverlayComponent {

    @Input() loading = false;

    @Input() message = null;
}
