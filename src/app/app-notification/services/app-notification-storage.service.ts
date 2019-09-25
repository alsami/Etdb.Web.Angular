import { Injectable } from '@angular/core';
import { AppNotification } from '@etdb/app-notification/models';

const KEY = 'ETDB_APP_NOTIFICATIONS';

@Injectable({
  providedIn: 'root'
})
export class AppNotificationStorageService {
    public storeMany(notifications: AppNotification[]): void {
        if (!notifications) {
            return;
        }

        window.localStorage.setItem(KEY, JSON.stringify(notifications));
    }


    public restore(): AppNotification[] {
        const notifications = JSON.parse(window.localStorage.getItem(KEY)) as AppNotification[];

        if (!notifications) {
            return [];
        }

        return notifications;
    }

    public clear(): void {
        window.localStorage.removeItem(KEY);
    }
}
