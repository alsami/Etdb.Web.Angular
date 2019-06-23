import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '@etdb/models';

@Component({
    selector: 'etdb-user-card',
    templateUrl: 'user-card.component.html',
})

export class UserCardComponent implements OnChanges {
    @Input() user: User;
    @Input() showProfileImageUploadButton: boolean;

    public profileImageUrl = null;

    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes['user'] || !this.user) {
            return;
        }

        if (!this.user.profileImageMetaInfos || this.user.profileImageMetaInfos.length === 0) {
            this.profileImageUrl = null;
            return;
        }

        const imageMeta = this.user.profileImageMetaInfos.find(profileImage => profileImage.isPrimary);

        if (imageMeta !== undefined) {
            this.profileImageUrl = imageMeta.url;
            return;
        }

        this.profileImageUrl = this.user.profileImageMetaInfos[0].url;
    }
}
