import { Component } from '@angular/core';

@Component({
    selector: 'etdb-sidenav-content',
    templateUrl: './sidenav-content.component.html',
    styleUrls: [
        'sidenav-content.component.scss'
    ]
})

export class SidenavContentComponent {
    public links: any[] = [
        {
            path: 'movies',
            displayName: 'Movies',
            icon: 'movie'
        }
    ];
}
