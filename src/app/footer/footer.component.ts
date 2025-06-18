import { Component } from '@angular/core';
import { FooterService } from '../Services/footer/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  staticInfo=this.footerService.staticValues
  footerData=this.footerService.FooterData;
constructor(private footerService:FooterService){

}
}
