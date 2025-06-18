import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageChooserService } from '../../../Services/language-chooser/language-chooser.service';
import { text } from 'node:stream/consumers';
import { NavInfoService } from '../../../Services/NavService/nav-info.service';
import { ListingServiceService } from '../../../Services/listing-service/listing-service.service';
import { load } from 'ol/Image';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit {
  staticElements={Header:'Personal Information' , updateBtn:'Update Your Password' , submit:'Submit' , placeholder:'write Your profile Link'}
  UserMessage={text:'Your Information has been updated successfully',error:false,load:false , };
  inputText=[{   label:'First Name', placeholder:'Enter Your First Name',type:'text', FormControlName:'saxeli'},
 {
   label:'Last Name',placeholder:'Enter Your Last Name',type:'text', FormControlName:'gvari',
 },

 {
   label:'Phone Number',placeholder:'ex:+1-800-7700-00',type:'text', FormControlName:'nomeri',
 },
 {label:'Address',placeholder:'Write Your Address hare',FormControlName:'sacxovrebeli_adgili'},
 
]


UserSelect=[
  {label:'Account type', placeholder:'Choose Acaunt Type' ,options:{dis:['Sales Manager','User'], val:['gayidvebis_menejeri','momxmarebeli'] },FormControlName:'angarishis_tipi'},
   {label:'Gender',placeholder:'Choose Gender' ,options:{dis:['Male', 'Female'],val:['kaci', 'qali'] },FormControlName:'sqesi'}
]
textArea=[
  {label:'About Yourself',placeholder:'Write about Yourself', FormControlName:'chems_shesaxeb'},

]
Allnetworks = {
  Header: 'Social Networks',
  elements: [
    {
      
      FormControlHref: 'facebook_linki',
     name: 'Facebook', 
     value:'Facebook'
    },
    {
      
      FormControlHref: 'instagram_linki',
  name: 'Instagram', value:'Instagram'
    },
    {
      
      FormControlHref: 'telegram_linki',
name: 'Telegram', value: 'Telegram'
    },
    {
      
      FormControlHref: 'linkedin_linki',
     name: 'LinkedIn', value: 'LinkedIn'
    },
    {
      FormControlHref: 'whatsapp_linki',
     name: 'WhatsApp',
     value:'WhatsApp'
    }

   
  ]
};

Form: FormGroup;

// Initial Controls
FormControls = [{ btn: 'Btn1', Href: 'Href1' }];
selectedNetworks: Set<string> = new Set(); // ✅ Track used networks
plusbtn=true;
displayLinks=false;


constructor(private langServ:LanguageChooserService , private fb:FormBuilder , private navServ:NavInfoService , private cd:ChangeDetectorRef ,
  private listingServ:ListingServiceService) {
  this.Form = this.fb.group({
    saxeli: [this.navServ.IsSignedIn.Name.split(' ')[0], Validators.required],
    gvari: [this.navServ.IsSignedIn.Name.split(' ')[1] ,  Validators.required],
    nomeri: [this.navServ.IsSignedIn.number , Validators.required],
    sacxovrebeli_adgili: [this.navServ.IsSignedIn.location],
    chems_shesaxeb: [this.navServ.IsSignedIn.AboutMe],
    momxmareblis_idi: [''],                          
    angarishis_tipi: [this.navServ.IsSignedIn.type],
    sqesi: [this.navServ.IsSignedIn.gender],
    linkedin_linki: [this.navServ.IsSignedIn.links.linkdIn],
    facebook_linki: [this.navServ.IsSignedIn.links.facebook],
    instagram_linki: [this.navServ.IsSignedIn.links.instagram],
    whatsapp_linki: [this.navServ.IsSignedIn.links.whatsapp],

    telegram_linki: [this.navServ.IsSignedIn.links.telegram],


 
  });
  if(this.navServ.IsSignedIn.type=='gayidvebis_menejeri'){
    this.displayLinks=true;
}else{
  this.displayLinks=false;
}
  }
change($event){

  if($event.value=='gayidvebis_menejeri'){
    this.displayLinks=true;
  }else if($event.value=='momxmarebeli'){
    this.displayLinks=false;
  }
}

submit(){
  this.Form.get('momxmareblis_idi')?.setValue(this.navServ.userId);
  this.listingServ.ChangeUserData(this.Form.value).subscribe((data: { status: string })=>{


    if(data.status=="success"){
      this.UserMessage={text:`${this.langServ.chosenLang.Dashboard.PersonalInfo.UserMessage.text}`,error:false ,load:true }
this.navServ.getUserInfo().subscribe((data)=>{

}); // Update the user info

  }else {
    this.UserMessage={text:`${this.langServ.chosenLang.Dashboard.PersonalInfo.UserMessage.ErrorText}`,error:true ,load:true }
  }
});
  

}
ngOnInit(){
this.staticElements=this.langServ.chosenLang.Dashboard.PersonalInfo.staticElements;
this.Allnetworks=this.langServ.chosenLang.Dashboard.PersonalInfo.Allnetworks;
this.UserSelect = this.langServ.chosenLang.Dashboard.PersonalInfo.UserSelect;
this.textArea = this.langServ.chosenLang.Dashboard.PersonalInfo.textArea;
  this.inputText = this.inputText.map((el, index) => ({
    ...el ,// spread existing properties
    placeholder: this.langServ.chosenLang.Dashboard.PersonalInfo.inputText[index].placeholder,
    label: this.langServ.chosenLang.Dashboard.PersonalInfo.inputText[index].label,
  }));


  
}


}
