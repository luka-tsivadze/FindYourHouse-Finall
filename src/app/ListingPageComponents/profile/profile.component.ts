import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {
  
  profileForm: FormGroup;
profileInfo;
  forNgRow = [
    { imgLink: '../../../assets/Imges/Footer/FooterIcons/telephone-fill.svg', alt: 'telephone', text: '(234) 0200 17813' },
    { imgLink: '../../../assets/Imges/Footer/FooterIcons/envelope-fill.svg', alt: 'envelope', text: 'lisa&#64;gmail.com' }
  ];

  inputs = [
    {
      type: 'text',
      placeholder: 'First Name',
      formControlName: 'firstName'
    },
    {
      type: 'number',
      placeholder: 'Phone Number',
      formControlName: 'phoneNumber'
    },
    {
      type: 'email',
      placeholder: 'Email',
      formControlName: 'email'
    }
  ];
  header='Profile Details';
  agent='Agent of Property';
  location='Location 32';
  inquary='Request Inquary';
  submit='Submit Request';

  constructor(private fb: FormBuilder, private NavService:NavInfoService, private lang:LanguageChooserService) {
    
  }
  
  ngOnInit() {

    this.NavService.userData$.subscribe((data) => {
      this.profileInfo = data;
  
    this.forNgRow[0].text = this.profileInfo.number;
    this.forNgRow[1].text = this.profileInfo.email;
    });
    
    this.header=this.lang.chosenLang.Profile.header;
    this.inquary=this.lang.chosenLang.Profile.inquary;
    this.submit=this.lang.chosenLang.Profile.submit;
    this.inputs=this.inputs.map((el,index)=>({
      ...el,
      placeholder:this.lang.chosenLang.Profile.input[index]
    })) 


    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

  }
  

  }
