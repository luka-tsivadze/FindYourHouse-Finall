import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavInfoService } from '../../Services/NavService/nav-info.service';

import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-agent-info',
  templateUrl: './agent-info.component.html',
  styleUrl: './agent-info.component.scss'
})
export class AgentInfoComponent {
  profileForm: FormGroup;
profileInfo;
infoSent=[{bol:false, message:'please Fill in the required fields'},{bol:false, message:'Your request has been sent'}];
 
  staticValues={
    h3:'Agent Information',
    p:'Agent of Property',  //could be changed to dynamic
    Agentp:'გაყიდვების მენეჯერი',
    Userp:'ქონების მესაკუთრე',
    req:'Request Inquiry',
    submit:'Submit Request',
    textArea:'Message'
  }
 
  forNgRow = [
    { imgLink: '../../../assets/Imges/Footer/FooterIcons/telephone-fill.svg', alt: 'telephone', text: '(234) 0200 17813' },
    { imgLink: '../../../assets/Imges/Footer/FooterIcons/envelope-fill.svg', alt: 'envelope', text: 'lisa&#64;gmail.com' }
  ];

  inputs = [
    {
      type: 'text',
      placeholder: 'First Name',
      formControlName: 'gamgzavnis_saxeli'
    },
    {
      type: 'text',
      placeholder: 'Phone Number',
      formControlName: 'gamgzavnis_tel_nomeri'
    },
    {
      type: 'email',
      placeholder: 'Email',
      formControlName: 'gamgzavnis_maili'
    }
  ];
  
   constructor(private fb: FormBuilder, private NavService:NavInfoService ,private propService:PropertyInformationService
    , private lang:LanguageChooserService) {


this.staticValues=this.lang.chosenLang.DetailedInfo.AgentsInfo.staticValues;
this.inputs=this.lang.chosenLang.DetailedInfo.AgentsInfo.inputs;
  }
chosenCard;
  ngOnInit() {
    this.propService.chosenCard.subscribe((card) => {
      this.chosenCard = card;
    this.profileInfo = this.chosenCard;
    console.log(this.profileInfo);
    })
    this.forNgRow[0].text = this.profileInfo.Nomeri;
    this.forNgRow[1].text = this.profileInfo.email;
    
 if(this.NavService.IsSignedIn.signed){

    this.profileForm = this.fb.group({
      gamgzavnis_saxeli: new FormControl(`${this.NavService.IsSignedIn.Name}`, Validators.required),
      gamgzavnis_tel_nomeri: new FormControl(`${this.NavService.IsSignedIn.number}`, Validators.required),
      gamgzavnis_maili: new FormControl(`${this.NavService.IsSignedIn.email}`, [Validators.required, Validators.email]),
      adresatis_idi: new FormControl(''),
      shetyobinebis_teqsti: new FormControl('', Validators.required)
    });
  }else{
    this.profileForm = this.fb.group({
      gamgzavnis_saxeli: new FormControl(``, Validators.required),
      gamgzavnis_tel_nomeri: new FormControl(`+995`, [Validators.required, Validators.minLength(9)]),
      gamgzavnis_maili: new FormControl(``, [Validators.required, Validators.email]),
      adresatis_idi: new FormControl(''),
      shetyobinebis_teqsti: new FormControl('', Validators.required)
    });
  }
}
  onSubmit() {
    this.infoSent[0].bol=true;
    this.infoSent[1].bol=false;
    if(this.profileForm.invalid){
      return;
    }
    this.profileForm.get('adresatis_idi').setValue(this.profileInfo.momxmareblis_id);
    console.log(this.profileForm.value , this.profileForm.valid);
    this.propService.SendUserMessage(this.profileForm.value).subscribe((data)=>{
   
      if(data !== null && data){
        this.infoSent[0].bol=false;
        this.infoSent[1].bol=true;
        this.profileForm.reset();
      }else{
        this.infoSent[0].message='Something went wrong, please try again';
        this.infoSent[0].bol=true;
        this.infoSent[1].bol=false;
      }
      
    });
  }
}
