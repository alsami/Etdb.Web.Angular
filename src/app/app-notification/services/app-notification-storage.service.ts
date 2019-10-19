import { Injectable } from '@angular/core';
import { AppNotification } from '@etdb/app-notification/models';

const KEY = 'ETDB_APP_NOTIFICATIONS';

@Injectable({
  providedIn: 'root'
})
export class AppNotificationStorageService {
    public storeMany(userId: string, notifications: AppNotification[]): void {
        console.log('STORAGE');
        if (!notifications || !notifications.length || !userId || !userId.length) {
            return;
        }

        const combinedKey = `${KEY}_${userId}`;

        window.localStorage.setItem(combinedKey, JSON.stringify(notifications));
    }


    public restore(userId: string): AppNotification[] {
        if (!userId || !userId.length) {
            return [];
        }

        const combinedKey = `${KEY}_${userId}`;

        const notifications = JSON.parse(window.localStorage.getItem(combinedKey)) as AppNotification[];

        if (!notifications) {
            return [];
        }

        return notifications;
    }

    public clear(): void {
        window.localStorage.removeItem(KEY);
    }
}
