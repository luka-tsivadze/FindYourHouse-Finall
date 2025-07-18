import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { RegistrationService } from '../../Services/registration/registration.service';
import { HttpClient } from '@angular/common/http';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrl: './reg-page.component.scss',
   animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms  ease-out', style({ opacity: 0 }))
      ])
    ]),

  ]
})
export class RegPageComponent {


userId;

RegistrForm!: FormGroup;
codeSegment=false;
verification: boolean=false
error=false;
RError=false;
errorText;
regErrorText;
verificationCode ;
Registration={
header:{
p:'welcome to',
},
confirmation:{ text:'You have Succesfully Registered' , show:false},  
 mainInputs:[
  {FormControlName:'saxeli' , labelText:'First Name*', For:"firstNameReg" ,type:'text' ,errortext:'First Name is required.', chack:false},
  {FormControlName:'gvari' , labelText:'Last Name*', For:"lastNameReg" ,type:'text' ,errortext:'Last Name is required.', chack:false},
  {FormControlName:'maili' , labelText:'Email Address*', For:"emailReg" ,type:'email' ,errortext:'Email is required.' , chack:false},
  {FormControlName:'paroli' , labelText:'Password*', For:"passwordReg" ,type:'password' ,errortext:'Password is required.' , chack:false , showPassword: false},
  {FormControlName:'paroliRepeat' , labelText:'Repeat Password*', For:"repeatPasswordReg" ,type:'password' ,errortext:'Passwords must match.' , chack:true , showPassword: false},
],
register:{
  buttonText:'Register',
  mobile:'mobile Number*',
  notification:'verification ended succsesfully',
  Codeerror:'Code is incorrect',
  GError:'Gender is required',
  numbererror:'write Your phone number',
  Hgender:'Gender*',
  Man:'Male',
  agree:'I agree to',
  terms:'the terms and conditions',
  Fam:'Famale',
  codeHolder:'Enter the code  you received on the phone',

  respErrorNumber:'Phone number is incorrect',
  respErrorEmail:'Email already in use',
  respErrorEmailInvalid:'Email is invalid',
  respErrorServer:'There is a problem with the server, try again later.',
},

}

 
constructor(private registrationService: RegistrationService, private http:HttpClient ,private navServ:NavInfoService ,private mainServ:MainPageDataService ,
  private router:Router){

}


  ngOnInit() {
    this.Registration=this.mainServ.LangMainData.Registration;


 
    
    this.RegistrForm = new FormGroup({
      maili: new FormControl('', [Validators.required, Validators.email]),
      paroli: new FormControl('', [Validators.required, Validators.minLength(6)]),
      saxeli: new FormControl('', Validators.required),
      gvari: new FormControl('', Validators.required),
      paroliRepeat: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.requiredTrue),
      nomeri : new FormControl('+995', [      Validators.required,    Validators.minLength(9),    Validators.maxLength(13),       Validators.pattern('^\\+?[0-9]*$')    ]),
      verificationInput: new FormControl('', Validators.required),
      sqesi: new FormControl('', Validators.required),
      buttonSub: new FormControl('register'),
    });


 this.watchResponse(); 
  }





     
 watchResponse(): void {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    this.http.post('/api/google-login.php', { code }).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.navServ.getUserInfo(data.userId);
          window.location.href = '/'; 
        } else {
          alert('Login failed.');
        }
      },
      error: () => {
        alert('Login failed.');
      }
    });
  }
 }
 
  onSubmitR(): void {
    if (!this.RegistrForm.invalid) {
      
      

 
      const formData = this.RegistrForm.getRawValue();
 
      this.http.post("reg_user.php", formData).subscribe({
        next: (response: any) => {
          
          // Handle successful registration
       
if (response.message === 'nomeri-arasworia') {
  this.regErrorText = this.Registration.register.respErrorNumber;
} else if (response.message === 'email-already-in-use') {
  this.regErrorText = this.Registration.register.respErrorEmail;

  this.regErrorText = this.Registration.register.respErrorEmailInvalid;
} else if (response.status === 'error') {
  this.regErrorText = `${this.Registration.register.respErrorServer} Error Message:(${response.message})`;
} else {
  this.RError = false;
this.router.navigate(['/login']);
this.Registration.confirmation.show=true;

  this.RegistrForm.reset();

  return;
}
this.RError = true;
},
        error: (error) => {
          // Handle HTTP errors
          console.error('Request failed:', error);
          this.RError=true;
          this.regErrorText=`there is a problem with the server try agein later  Error Message:(${error.message})`;
        }
      });
    } else {
      console.log('Registration form has validation errors');
    }
  }
  

  onCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 4) {

      this.checkCode();
    }
  }
  
  sendCode() {
    this.codeSegment = true;
    
    let phoneNumber = this.RegistrForm.controls['nomeri'].value;


    if (phoneNumber.length === 9) {
      phoneNumber = '+995' + phoneNumber; 
    } else if (phoneNumber.startsWith('995')) {
      phoneNumber = '+' + phoneNumber;
    } else if (phoneNumber.startsWith('99')) {
      phoneNumber = '+995' + phoneNumber.substring(2);
    }else if (phoneNumber.startsWith('95')) {
      phoneNumber = '+995' + phoneNumber.substring(2);
    }else if (phoneNumber.startsWith('5')) {
      phoneNumber = '+995' + phoneNumber.substring(1);
    }else if (phoneNumber.startsWith('+95')) {
      phoneNumber = '+995' + phoneNumber.substring(3);
    }
    // Update form value before submission
    this.RegistrForm.controls['nomeri'].setValue(phoneNumber);
    this.RegistrForm.controls['nomeri'].disable();
    // Helper function to generate a random 4-digit code
    const generateRandomCode = (length: number): string => {
      const characters = '0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
  
 
    const verificationCode = generateRandomCode(4);
    this.verificationCode = verificationCode;
  
    // Validate phone number (international format)
    const nomeri = phoneNumber;
    if (!/^\+[0-9]{7,15}$/.test(nomeri)) {
      console.error('Invalid phone number format');
      return;
    }
  
  

    this.http.post('send_code.php', { nomeri, random_kodi: verificationCode }).subscribe({
      next: (response) => {
        console.log('Verification code sent successfully:' , response);
    this.RegistrForm.get('nomeri')?.disable();
    
      },
      error: (error) => {
        console.error('Failed to send verification code:', error);
      }
    });
  }
  
  checkCode(){
 
    if (this.RegistrForm.value.verificationInput === this.verificationCode) {
      this.verification = true;

    
    }
  }



}
