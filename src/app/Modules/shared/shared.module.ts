import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../nav/nav.component'; 
import { RegistrationComponent } from '../../Components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';
import { LoaderComponent } from '../../loader/loader.component';


@NgModule({
  declarations: [NavComponent , RegistrationComponent ,FooterComponent , LoaderComponent],
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
    LoaderComponent
  ]
})
export class SharedModule { 


}
