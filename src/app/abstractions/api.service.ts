import {
    Headers
} from '@angular/http';

export abstract class APiService {
    protected baseHeaders: Headers = new Headers({
        'Content-Type' : 'application/json', 'charset' : 'utf-8'
    })
}