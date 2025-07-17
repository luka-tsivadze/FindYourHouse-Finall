import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../nav/nav.component'; 
import { RegistrationComponent } from '../../Components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';


@NgModule({
  declarations: [NavComponent , RegistrationComponent ,FooterComponent],
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
    FooterComponent
  ]
})
export class SharedModule { 
constructor() {
  console.log('SharedModule loaded'); 
}

}
