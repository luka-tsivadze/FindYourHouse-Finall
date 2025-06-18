import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';

@Component({
  selector: 'app-rcontact',
  templateUrl: './rcontact.component.html',
  styleUrl: './rcontact.component.scss'
})
export class RContactComponent {

  @Input() agent!: {
    status: number;
    imgLink: string;
    Name: string;
    mainalt: string;
    maili: string;
    nomeri: string;
    sacxovrebeli_adgili: string;
    chems_shesaxeb: string;
    idi: string | number;
  };


 profileForm: FormGroup;

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
  
   constructor(private fb: FormBuilder, private NavService:NavInfoService , private lang:LanguageChooserService) {


this.staticValues=this.lang.chosenLang.DetailedInfo.AgentsInfo.staticValues;
this.inputs=this.lang.chosenLang.DetailedInfo.AgentsInfo.inputs;
  }
chosenCard;
  ngOnInit() {


    
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
    
    this.profileForm.get('adresatis_idi').setValue(this.agent.idi);
    if(this.profileForm.invalid){
      return;
    }
    console.log(this.profileForm.value ); 
    // this.propService.SendUserMessage(this.profileForm.value).subscribe((data)=>{
   
    //   if(data !== null && data){
    //     this.infoSent[0].bol=false;
    //     this.infoSent[1].bol=true;
    //     this.profileForm.reset();
    //   }else{
    //     this.infoSent[0].message='Something went wrong, please try again';
    //     this.infoSent[0].bol=true;
    //     this.infoSent[1].bol=false;
    //   }
      
    // });
  }
}
