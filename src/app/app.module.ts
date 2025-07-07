import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http'; // ✅ Correct placement
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// Import components
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { PartnersFooterComponent } from './partners-footer/partners-footer.component';
import { HeaderComponent } from './header/header.component';
import { MainListingComponent } from './ListingPageComponents/main-listing/main-listing.component';
import { ListingNavComponent } from './ListingPageComponents/listing-nav/listing-nav.component';
import { ListingParentComponent } from './ListingPageComponents/listing-parent/listing-parent.component';
import { ProfileComponent } from './ListingPageComponents/profile/profile.component';
import { ListingFooterComponent } from './ListingPageComponents/listing-footer/listing-footer.component';
import { PasswordChangeComponent } from './ListingPageComponents/password-change/password-change.component';
import { FavoritePropertiesComponent } from './ListingPageComponents/favorite-properties/favorite-properties.component';
import { MyPropertiesComponent } from './ListingPageComponents/my-properties/my-properties.component';
import { AllCardsComponent } from './CardPage/all-cards/all-cards.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FilterComponent } from './CardPage/filter/filter.component';
import { MainCardsComponent } from './CardPage/main-cards/main-cards.component';
import { DetailedInfoParentComponent } from './DetailedInfo/detailed-info-parent/detailed-info-parent.component';
import { CardGallery1Component } from './DetailedInfo/card-gallery1/card-gallery1.component';
import { ScheduleRComponent } from './DetailedInfo/schedule-r/schedule-r.component';
import { AgentInfoComponent } from './DetailedInfo/agent-info/agent-info.component';
import { LeftAmentiesComponent } from './DetailedInfo/left-amenties/left-amenties.component';
import { FloorPlanComponent } from './DetailedInfo/floor-plan/floor-plan.component';
import { RecentPropRComponent } from './DetailedInfo/recent-prop-r/recent-prop-r.component';
import { FeaturedPRComponent } from './DetailedInfo/featured-pr/featured-pr.component';
import { AdvertismentRComponent } from './DetailedInfo/advertisment-r/advertisment-r.component';
import { TagsRComponent } from './DetailedInfo/tags-r/tags-r.component';
import { NearbyLComponent } from './DetailedInfo/nearby-l/nearby-l.component';
import { MapComponent } from './DetailedInfo/map/map.component';
import { PropvideoLComponent } from './DetailedInfo/propvideo-l/propvideo-l.component';
import { ReviewsComponent } from './DetailedInfo/reviews/reviews.component';
import { ReviewAdderComponent } from './DetailedInfo/review-adder/review-adder.component';
import { SimilarPropComponent } from './DetailedInfo/similar-prop/similar-prop.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './ListingPageComponents/DashboardParent/dashboard/dashboard.component';
import { ManageComponent } from './ListingPageComponents/DashboardParent/manage/manage.component';
import { DashListingComponent } from './ListingPageComponents/DashboardParent/dash-listing/dash-listing.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PersonalInfoComponent } from './ListingPageComponents/DashboardParent/personal-info/personal-info.component';
import { DashreviewComponent } from './ListingPageComponents/DashboardParent/dashreview/dashreview.component';
import { FilterAdvencedComponent } from './header/filter-advenced/filter-advenced.component';
import { UploadImageComponent } from './ListingPageComponents/DashboardParent/upload-image/upload-image.component';

import { TermsAndConditionsComponent } from './Components/terms-and-conditions/terms-and-conditions.component';
import { GlobalErrorHandler } from './Services/ErrorHandler/global-error-handler';
import { LoaderComponent } from './loader/loader.component';
import { WebReviewAdderComponent } from './about-us/web-review-adder/web-review-adder.component';
import { AgentsDetailedComponent } from './main-page/agents-detailed/agents-detailed.component';
import { LprofileCardComponent } from './main-page/lprofile-card/lprofile-card.component';
import { LDescriptionComponent } from './main-page/ldescription/ldescription.component';
import { RContactComponent } from './main-page/rcontact/rcontact.component';
import { RecentComponent } from './main-page/recent/recent.component';
import { ListingComponent } from './main-page/listing/listing.component';
import { RAdvertismentComponent } from './main-page/r-advertisment/r-advertisment.component';
import { CompaniesComponent } from './companies/companies.component';
import { BusinessComponent } from './ListingPageComponents/business/business.component';
import { AddFormComponent } from './ListingPageComponents/business/add-form/add-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareCompComponent } from './Components/share-comp/share-comp.component';
import { PrivacePolicyComponent } from './Components/privace-policy/privace-policy.component';
import { DeletePolicyComponent } from './Components/privace-policy/delete-policy/delete-policy.component';


import { RegistrationComponent } from './Components/registration/registration.component';
import { ForgotPasswordComponent } from './Components/registration/forgot-password/forgot-password.component';
import { RegPageComponent } from './reg-page/reg-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavComponent,
    FooterComponent,
    PartnersFooterComponent,
    HeaderComponent,
    RegistrationComponent,
    MainListingComponent,
    ListingNavComponent,
    ListingParentComponent,
    ProfileComponent,
    ListingFooterComponent,
    PasswordChangeComponent,
    FavoritePropertiesComponent,
    MyPropertiesComponent,
    AllCardsComponent,
    ErrorPageComponent,
    FilterComponent,
    MainCardsComponent,
    DetailedInfoParentComponent,
    CardGallery1Component,
    ScheduleRComponent,
    AgentInfoComponent,
    LeftAmentiesComponent,
    FloorPlanComponent,
    RecentPropRComponent,
    FeaturedPRComponent,
    AdvertismentRComponent,
    TagsRComponent,
    NearbyLComponent,
    MapComponent,
    PropvideoLComponent,
    ReviewsComponent,
    ReviewAdderComponent,
    SimilarPropComponent,
    ContactComponent,
    DashboardComponent,
    ManageComponent,
    DashListingComponent,
    AboutUsComponent,
    PersonalInfoComponent,
    DashreviewComponent,
    FilterAdvencedComponent,
    UploadImageComponent,
    LoaderComponent,
    TermsAndConditionsComponent,
    LoaderComponent,
    WebReviewAdderComponent,
    AgentsDetailedComponent,
    LprofileCardComponent,
    LDescriptionComponent,
    RContactComponent,
    RecentComponent,
    ListingComponent,
    RAdvertismentComponent,
    CompaniesComponent,
    BusinessComponent,
    AddFormComponent,
    ForgotPasswordComponent,
    ShareCompComponent,
    PrivacePolicyComponent,
    DeletePolicyComponent,
    RegPageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule

  ],
  providers: [
    provideHttpClient(), 
    provideClientHydration(), 

    { provide: ErrorHandler, useClass: GlobalErrorHandler } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
