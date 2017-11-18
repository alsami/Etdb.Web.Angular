import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'etdb-sidenav-content',
    templateUrl: './sidenav-content.component.html',
    styleUrls: [
        'sidenav-content.component.scss'
    ]
})

export class SidenavContentComponent implements AfterViewInit {
    public links: any[] = [
        {
            path: 'movies',
            displayName: 'Movies',
            icon: 'movie'
        }
    ];

    public constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    public ngAfterViewInit(): void {
        const expansionPanelBodies: HTMLElement[] = [];
        expansionPanelBodies.push(this.elementRef.nativeElement.querySelector('.mat-expansion-panel-body'));
        expansionPanelBodies.forEach(body => {
            this.renderer.setStyle(body, 'padding', '0px');
        });
    }
}
