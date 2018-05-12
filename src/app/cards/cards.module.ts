import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';
import { MaterialModule } from '@etdb/shared';
import { UserCardComponent } from '@etdb/cards/components';

@NgModule({
    imports: [
        CommonModule,
        CustomControlModule,
        MaterialModule
    ],
    declarations: [
        UserCardComponent
    ],
    exports: [
        UserCardComponent
    ]
})
export class CardsModule { }
