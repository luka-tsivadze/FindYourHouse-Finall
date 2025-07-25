import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RAdvertismentComponent } from '../../main-page/r-advertisment/r-advertisment.component';
import { RecentComponent } from '../../main-page/recent/recent.component';
import { RContactComponent } from '../../main-page/rcontact/rcontact.component';
import { ListingComponent } from '../../main-page/listing/listing.component';
import { LDescriptionComponent } from '../../main-page/ldescription/ldescription.component';
import { LprofileCardComponent } from '../../main-page/lprofile-card/lprofile-card.component';
import { SharedModule } from './shared.module';

// Example shared components for lazy loaded modules

@NgModule({
    declarations: [
        RAdvertismentComponent,
        RecentComponent,
        RContactComponent,
         ListingComponent,
         LDescriptionComponent,
         LprofileCardComponent
    ],
 imports:[ SharedModule],
    exports: [
        RAdvertismentComponent,
        RecentComponent,
        RContactComponent,
        ListingComponent,
        LDescriptionComponent,
        LprofileCardComponent
    ]
})
export class AgentsSModule { }