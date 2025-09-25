import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../nav/nav.component'; 
import { RegistrationComponent } from '../../Components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';
import { LoaderComponent } from '../../loader/loader.component';
import { VideoPopupComponent } from '../../Components/video-popup/video-popup.component';
import { ShareCompComponent } from '../../Components/share-comp/share-comp.component';
import { FilterComponent } from '../../CardPage/filter/filter.component';
import { AllCardsComponent } from '../../CardPage/all-cards/all-cards.component';
import { filter } from 'rxjs';
import { CoordinatePickerComponentComponent } from '../../ListingPageComponents/coordinate-picker-component/coordinate-picker-component.component';
import { MapComponent } from '../../DetailedInfo/map/map.component';
import { CardHComponent } from '../../Components/card-h/card-h.component';


@NgModule({
  declarations: [NavComponent , RegistrationComponent
     ,FooterComponent , MapComponent,LoaderComponent ,
      VideoPopupComponent ,ShareCompComponent ,FilterComponent, AllCardsComponent ,
     CoordinatePickerComponentComponent,    CardHComponent,
   ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    NavComponent,
    RouterModule,
    ReactiveFormsModule,
    MapComponent,
    FormsModule,
    FooterComponent,
    LoaderComponent,
    VideoPopupComponent,
    ShareCompComponent,
    FilterComponent,
    AllCardsComponent,
    CoordinatePickerComponentComponent,
    CardHComponent
  ]
})
export class SharedModule { 


}
