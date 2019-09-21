import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IdentityUser } from '@etdb/core/models';

@Component({
    selector: 'etdb-sidenav-content',
    templateUrl: 'sidenav-content.component.html',
    styleUrls: [
        'sidenav-content.component.scss'
    ]
})

export class SidenavContentComponent {
    @Output() linkClicked = new EventEmitter();

    @Input() authenticatedUser: IdentityUser;

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
        }, {
            path: 'users/user-search',
            displayName: 'Users',
            icon: 'person'
        }
    ];
}
