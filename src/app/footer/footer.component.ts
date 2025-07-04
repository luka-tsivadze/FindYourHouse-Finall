import { Component } from '@angular/core';
import { FooterService } from '../Services/footer/footer.service';
import { MainPageDataService } from '../Services/mainPageService/main-page-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  staticInfo=this.footerService.staticValues
  footerData=this.footerService.FooterData;
footerForm = new FormGroup({
  maili: new FormControl('', [Validators.required, Validators.email])
});

  constructor(private footerService:FooterService ,private mainServ:MainPageDataService) {
    

}



SendSubscribtion(){
this.footerService.subscrieToEmail(this.footerForm.value.maili);
}

}
