import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LanguageChooserService } from '../Services/language-chooser/language-chooser.service';
import { NavInfoService } from '../Services/NavService/nav-info.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  message={text:'' , validity:false , class:'' }; 
  res;
  staticText = {
    header:'Contact Us',
    headerH4:'Home  /  Contact Us',
    Mes:'Message',
    sub:'Submit',
    cd:'Contact Details',
    cp:'Please find below contact details and contact us today!'

  }
  inputs = [
    { placeholder: 'First Name', type: 'text', FormControlname: 'saxeli' },
    { placeholder: 'Last Name', type: 'text', FormControlname: 'gvari' },
    { placeholder: 'Header', type: 'text', FormControlname: 'satauri' },
    { placeholder: 'Email', type: 'email', FormControlname: 'maili' },
  ];

  contactInfo = [
    { IconLink: '../../assets/Imges/StaticImg/StaticIcons/clock.svg', text: '+995 32 21 14 844' },
    { IconLink: '../../assets/Imges/StaticImg/StaticIcons/envelope-fill.svg', text: 'infofindhous@gmail.com' },
    { IconLink: '../../assets/Imges/StaticImg/StaticIcons/telephone-fill.svg', text: '9:30 a.m - 7:00 p.m' },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder , private http: HttpClient ,private lang:LanguageChooserService , private navServ:NavInfoService) {
  
    this.form = this.fb.group({
      
      saxeli: ['', Validators.required],
      gvari: ['', Validators.required],
      satauri: ['', Validators.required],
      maili: ['', [Validators.required, Validators.email]],
      shetyobineba: ['', Validators.required],

    });
  
  }

ngOnInit(): void {
  this.staticText=this.lang.chosenLang.contact.staticText;
  this.inputs=this.lang.chosenLang.contact.inputs;
     
    
  this.navServ.getUserInfo(this.navServ.userId, true).subscribe((resp)=>{})
    
}

  onSubmit(): void {
    
    if (this.form.valid) {
      
      this.http.post('contact.php', this.form.value).subscribe({
        next: response => {
          this.res=response;
          if (this.res.status == 'success' && this.res.message == 'shetyobineba-gaigzavna') {
            this.message.validity=true;
            this.message.text='message sent successfully';
            this.message.class='success';
          }
          console.log('Form submitted:', this.form.value  , response);
        },
        error: error => {
          this.message.validity=true;
          this.message.text='message was not sent';
          this.message.class='error';
          console.error('Error submitting form:', error , this.form.value);
          
        }
      });
    } else {
      this.message.validity=true;
      this.message.text='message was not sent , please fill in all the fields';
      this.message.class='error';
      console.error('Form is invalid:', this.form.errors , this.form.value , this.form.valid);
    }
  }
}
