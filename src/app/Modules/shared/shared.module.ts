import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../nav/nav.component'; 
import { RegistrationComponent } from '../../Components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavComponent , RegistrationComponent],
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
    FormsModule
  ]
})
export class SharedModule { 
constructor() {
  console.log('SharedModule loaded'); 
}

}
