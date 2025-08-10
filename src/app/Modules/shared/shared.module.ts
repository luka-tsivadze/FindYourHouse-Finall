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


@NgModule({
  declarations: [NavComponent , RegistrationComponent ,FooterComponent , LoaderComponent , VideoPopupComponent ,ShareCompComponent],
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
    FormsModule,
    FooterComponent,
    LoaderComponent,
    VideoPopupComponent,
    ShareCompComponent
  ]
})
export class SharedModule { 


}
