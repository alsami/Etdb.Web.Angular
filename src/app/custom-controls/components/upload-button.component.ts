import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'etdb-upload-button',
    templateUrl: 'upload-button.component.html'
})

export class UploadButtonComponent {
    @Input() accept = 'image/*';
    @Input() multiple = false;
    @Input() text = 'Upload file';
    @Output() filesSelected: EventEmitter<File[]> = new EventEmitter<File[]>();

    public triggerFileDialog(): void {
        const element: HTMLElement = document.querySelector('input[type=file]');
        console.log(element);
        element.click();
    }

    public emitSelection($event): void {
        const files = $event.target.files as File[];

        console.log('GOT FILES: ', files);

        if (!files || files.length === 0) {
            return;
        }

        this.filesSelected.emit(files);
    }
}
