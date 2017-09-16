import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'etdb-toolbar',
    templateUrl: 'toolbar.component.html'
})

export class ToolbarComponent implements OnInit {
    @Output() openMenu = new EventEmitter();

    constructor() { }

    ngOnInit() { }
}