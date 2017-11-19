import { ClientConfig } from '../models/client-config.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


@Injectable()
export class ConfigService {
    public constructor(private http: HttpClient) {}

    public LoadClientConfig(): Observable<ClientConfig> {
        return this.http.get(environment.userserviceConfigUrl + 'client')
            .map((res: ClientConfig) => res);
    }
}
