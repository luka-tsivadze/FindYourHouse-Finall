import { Component } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})
export class BusinessComponent {
ShowForm = false;

  CallForm(){
    this.ShowForm = !this.ShowForm;
  }

}
