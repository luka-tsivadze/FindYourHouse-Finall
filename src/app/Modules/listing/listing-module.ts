import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListingParentComponent } from '../../ListingPageComponents/listing-parent/listing-parent.component';
import { MainListingComponent } from '../../ListingPageComponents/main-listing/main-listing.component';
import { ListingNavComponent } from '../../ListingPageComponents/listing-nav/listing-nav.component';
import { ListingFooterComponent } from '../../ListingPageComponents/listing-footer/listing-footer.component';
import { ProfileComponent } from '../../ListingPageComponents/profile/profile.component';
import { PasswordChangeComponent } from '../../ListingPageComponents/password-change/password-change.component';
import { FavoritePropertiesComponent } from '../../ListingPageComponents/favorite-properties/favorite-properties.component';
import { MyPropertiesComponent } from '../../ListingPageComponents/my-properties/my-properties.component';
import { DashboardComponent } from '../../ListingPageComponents/DashboardParent/dashboard/dashboard.component';
import { ManageComponent } from '../../ListingPageComponents/DashboardParent/manage/manage.component';
import { DashListingComponent } from '../../ListingPageComponents/DashboardParent/dash-listing/dash-listing.component';
import { PersonalInfoComponent } from '../../ListingPageComponents/DashboardParent/personal-info/personal-info.component';
import { DashreviewComponent } from '../../ListingPageComponents/DashboardParent/dashreview/dashreview.component';
import { UploadImageComponent } from '../../ListingPageComponents/DashboardParent/upload-image/upload-image.component';
import { BusinessComponent } from '../../ListingPageComponents/business/business.component';
import { AddFormComponent } from '../../ListingPageComponents/business/add-form/add-form.component';
import { LoaderComponent } from '../../loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from '../../ListingPageComponents/payment/payment.component';


@NgModule({
  declarations: [ListingParentComponent,

    ListingNavComponent,
    DashboardComponent,
      ManageComponent,
      DashListingComponent,
      PersonalInfoComponent,
      DashreviewComponent,
      UploadImageComponent,
   
    ProfileComponent,
    MyPropertiesComponent,
    FavoritePropertiesComponent,
    MainListingComponent,
    
    BusinessComponent,
      AddFormComponent,

    PasswordChangeComponent,
    ListingFooterComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ListingRoutingModule,
    SharedModule
  ]
})
export class ListingModule { 
  
}
