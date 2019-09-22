import { Injectable } from '@angular/core';
import { AppNotification } from '@etdb/app-notification/models';

const KEY = 'ETDB_APP_NOTIFICATIONS';

@Injectable({
  providedIn: 'root'
})
export class AppNotificationStorageService {
    public store(notification: AppNotification): void {
        let existingNotifications = JSON.parse(window.localStorage.getItem(KEY)) as AppNotification[];

        if (!existingNotifications) {
            existingNotifications = [];
        }

        existingNotifications.push(notification);

        window.localStorage.setItem(KEY, JSON.stringify(existingNotifications));
    }

    public update(mutatedNotification: AppNotification): void {
        let existingNotifications = JSON.parse(window.localStorage.getItem(KEY)) as AppNotification[];

        if (!existingNotifications) {
            existingNotifications = [];
        }

        const index = existingNotifications.findIndex(notifi => notifi.id === mutatedNotification.id);

        if (index === -1) {
            return;
        }

        existingNotifications[index] = mutatedNotification;
        window.localStorage.setItem(KEY, JSON.stringify(existingNotifications));
    }

    public read(id: string): void {
        let existingNotifications = JSON.parse(window.localStorage.getItem(KEY)) as AppNotification[];

        if (!existingNotifications) {
            existingNotifications = [];
        }

        const index = existingNotifications.findIndex(notifi => notifi.id === id);

        if (index === -1) {
            return;
        }

        existingNotifications[index].read = !existingNotifications[index].read;
        window.localStorage.setItem(KEY, JSON.stringify(existingNotifications));
    }

    public remove(id: string): void {
        let existingNotifications = JSON.parse(window.localStorage.getItem(KEY)) as AppNotification[];

        if (!existingNotifications) {
            existingNotifications = [];
        }

        const index = existingNotifications.findIndex(notifi => notifi.id === id);

        if (index === -1) {
            return;
        }

        existingNotifications.splice(index, 1);
        window.localStorage.setItem(KEY, JSON.stringify(existingNotifications));
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
