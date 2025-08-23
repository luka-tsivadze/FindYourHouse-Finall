import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http'; // ✅ Correct placement

import { SharedModule } from './Modules/shared/shared.module';


// Import components
import { MainPageComponent } from './main-page/main-page.component';


import { PartnersFooterComponent } from './partners-footer/partners-footer.component';
import { HeaderComponent } from './header/header.component';


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
// import { MapComponent } from './DetailedInfo/map/map.component';
import { PropvideoLComponent } from './DetailedInfo/propvideo-l/propvideo-l.component';
import { ReviewsComponent } from './DetailedInfo/reviews/reviews.component';
import { ReviewAdderComponent } from './DetailedInfo/review-adder/review-adder.component';
import { SimilarPropComponent } from './DetailedInfo/similar-prop/similar-prop.component';

import { FilterAdvencedComponent } from './header/filter-advenced/filter-advenced.component';

import { GlobalErrorHandler } from './Services/ErrorHandler/global-error-handler';


import { ShareCompComponent } from './Components/share-comp/share-comp.component';


import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    

    PartnersFooterComponent,
    HeaderComponent,

  
    ErrorPageComponent,
   
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
    // MapComponent,
    PropvideoLComponent,
    ReviewsComponent,
    ReviewAdderComponent,
    SimilarPropComponent,


    

    FilterAdvencedComponent,






    ForgotPasswordComponent,
    


  
  ],
  imports: [
    BrowserModule,
        BrowserAnimationsModule,
    AppRoutingModule,

    SharedModule,

  ],
  
  providers: [
    provideHttpClient(), 
    provideClientHydration(), 

    { provide: ErrorHandler, useClass: GlobalErrorHandler } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
