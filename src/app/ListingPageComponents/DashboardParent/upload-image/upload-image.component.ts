import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LanguageChooserService } from '../../../Services/language-chooser/language-chooser.service';
import { HttpClient } from '@angular/common/http';
import { NavInfoService } from '../../../Services/NavService/nav-info.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent implements OnInit {
    UserMessage={text:'Your Information has been updated successfully',error:false , ErrorText:'',  fileSelected:false};
     Elements={Header:'Upload Profile photo'  , submit:'Save' };

imgUrl={url:'', showImg:false };
Form:FormGroup ;
  selectedFile!: File;
constructor(private langServ:LanguageChooserService , private fb:FormBuilder , private http:HttpClient , private navServ:NavInfoService) {
  this.Form=this.fb.group({
    foto:new FormControl(null),
    momxmareblis_idi:new FormControl('')
  });
}
ngOnInit(): void {
  this.UserMessage=this.langServ.chosenLang.Dashboard.PersonalInfo.UserMessage;
  this.Elements=this.langServ.chosenLang.Dashboard.PersonalInfo.Elements;
}
submit(){
this.Form.get('momxmareblis_idi')?.setValue(this.navServ.userId);
if(this.Form.get('foto')?.value){
const formData = new FormData();
formData.append('foto', this.Form.get('foto')?.value);
formData.append('momxmareblis_id', this.Form.get('momxmareblis_idi')?.value);

  this.http.post('change_profile_image.php', formData ).subscribe({
    next: data => {
  
      this.navServ.getUserInfo().subscribe(()=>{}); // Update the user info
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });

}
}

  onFileSelected(event: any) {
    
    this.UserMessage.fileSelected=true;
    const file = event.target.files[0]; 
    if (file && file.type.startsWith('image/')){ 
      this.Form.get('foto')?.setValue(file); 
      this.UserMessage.error=false;
      this.UserMessage.text=this.langServ.chosenLang.Dashboard.PersonalInfo.UserMessage.text;
      this.imgUrl.url=URL.createObjectURL(file);
      this.imgUrl.showImg=true;

    } else {
      this.UserMessage.error=true;
      this.UserMessage.text=this.UserMessage.ErrorText;
      alert('Only image files are allowed.');
      this.Form.get('foto')?.setValue(null); 
    }
  }
}


