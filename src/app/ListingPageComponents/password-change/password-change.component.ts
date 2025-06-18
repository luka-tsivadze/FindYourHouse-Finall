import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss'
})
export class PasswordChangeComponent implements OnInit {
  passwordChangeForm:FormGroup;
  resp;

  staticData={
    header:'change Password',
    pas:'Current password',
    NewPas:'New password',
    ConfPas:'Confirm Your password',
    submit:'Send Changes'


  }
constructor( private http:HttpClient ,private lang:LanguageChooserService){ 
  this.passwordChangeForm = new FormGroup({
    id: new FormControl('',Validators.required),
    dzveli_paroli:new FormControl('',Validators.required),
    axali_paroli:new FormControl ('',[Validators.required , Validators.minLength(6)]),
    axali_paroli_1:new FormControl('',[Validators.required, Validators.minLength(6)])
  }
)
this.passwordChangeForm.patchValue({id:localStorage.getItem('id')});
}
ngOnInit(): void {
  // this.test();
 this.staticData=this.lang.chosenLang.ChangePassword;
}

changePassword(){

  console.log(this.passwordChangeForm.value);

  if(this.passwordChangeForm.valid && this.passwordChangeForm.value.axali_paroli==this.passwordChangeForm.value.axali_paroli_1){
    console.log('valid')

  this.http.post('change_password.php', this.passwordChangeForm.value).subscribe({
    next: (response) => {
      console.log(response);
      this.resp = response;
      if (this.resp.status == 'success' && this.resp.message == 'paroli-sheicvala-warmatebit') {
        alert('პაროლი წარმატებით შეიცვალა');
      } else if (this.resp.status == 'error' && this.resp.message == 'paroli-ver-sheicvala') {
      alert('ძველი პაროლი არასწორია');
      }
    },
    error: (error: any) => {
      console.log(error);
    }
  });
      
    
  }else if(this.passwordChangeForm.value.axali_paroli!=this.passwordChangeForm.value.axali_paroli_1){
    alert('ახალი პაროლები არ ემთხვევა')
  }
}
// test(){
//   this.http.get('get_keywords.php').subscribe({
//     next:(data)=>{
//       console.log('kayWords', data);
//     }
//   });
// }
}
