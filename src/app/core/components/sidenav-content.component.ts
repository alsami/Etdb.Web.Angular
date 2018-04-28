import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'etdb-sidenav-content',
    templateUrl: 'sidenav-content.component.html'
})

export class SidenavContentComponent {
    @Output() linkClicked = new EventEmitter();

    public adminLinks: any[] = [
        {
            path: 'movies',
            displayName: 'Movies',
            icon: 'movie'
        }
    ];

    public discoverLinks: any[] = [
        {
            path: 'browse',
            displayName: 'Browse',
            icon: 'dashboard'
        }
    ];
}
