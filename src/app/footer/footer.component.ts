import { Component } from '@angular/core';
import { FooterService } from '../Services/footer/footer.service';
import { MainPageDataService } from '../Services/mainPageService/main-page-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';

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
successMessage= false;
errorMessage= false;
  constructor(private footerService:FooterService ,private mainServ:MainPageDataService) {
    

}
activeLang
ngOnInit(): void {
this.activeLang= localStorage.getItem('Language') || 'GEO';
}


buttonclicked = false;
SendSubscribtion(){
  this.buttonclicked = true;
  if (this.footerForm.invalid) {
    return;
  }
this.footerService.subscribeToEmail(this.footerForm.value.maili).subscribe({
  next: (response) => {
    
    console.log('Subscription successful:', response)
    if (response.status === 'success') {
    this.successMessage = true
    }else{
    
    this.errorMessage = true;
    }
  },
  error: (error) => {
    console.error('Error occurred while subscribing:', error);
    this.successMessage = false;
    this.errorMessage = true;
  }
})
}
MoveUp() {
     window.scrollTo({ top: 0, behavior: 'smooth' });
}
changeLanguage(lang: string) {
  if(localStorage.getItem('Language') === lang) {
    return;
  }
  localStorage.setItem('Language', lang);
  window.location.reload();
}

}
