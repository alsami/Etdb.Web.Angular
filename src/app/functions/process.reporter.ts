import { HttpEvent, HttpEventType } from '@angular/common/http';

export function uploadProgressReporter(event: HttpEvent<any>): any {
    switch (event.type) {
        case HttpEventType.UploadProgress: {
            return Math.round(100 * event.loaded / event.total);
        }
        case HttpEventType.Response: return event.body;
    }
}
