import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { NavInfoService } from '../Services/NavService/nav-info.service';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
constructor( private navService: NavInfoService) {

}

 ngOnInit() {
  this.navService.updateScrollStatus(true); 
 }

}
