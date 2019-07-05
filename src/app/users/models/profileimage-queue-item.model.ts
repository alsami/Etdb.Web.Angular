import { UniqueIdentifier } from '@etdb/core/models';

export class ProfileImagesUploadQueueItem {
    public readonly id: string;
    public readonly userId: string;
    public readonly queuedAt: Date;
    public images: File[];

    public constructor(userId: string, images: File[]) {
        this.id = UniqueIdentifier.create().toString();
        this.userId = userId;
        this.queuedAt = new Date(Date.now());
        this.images = images;
    }
}
