import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { RegistrationService } from '../../Services/registration/registration.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
  trigger('buttonClick', [
    transition('* => clicked', [
      animate('1050ms', style({ transform: 'scale(0.95)' , opacity: 0.4 })),
      animate('1050ms', style({ transform: 'scale(1)'  , opacity: 1 }))
    ])
  ])
]
})
export class LoginComponent {
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
login:{
   inputs:[
    {FormControlName:'maili' , labelText:'Email Address*', For:"firstNameLogin" ,type:'text' ,errortext:'Write Your User Name Or Email.', chack:false},
    {FormControlName:'paroli' , labelText:'Password*', For:"passwordLogin" ,type:'password' ,errortext:'Password must be at least 6 characters.' , chack:false , showPassword: false},
   ],
   button:'Login',
   remember:'Remember Me',
    forget:'Forget Password?',
}

}
CodeInfo={  
   inputs:[
    {FormControlName:'CodeMaili' , labelText:'Email Address*', For:"firstNameLogin" ,type:'text' ,errortext:'Write Your User Name Or Email.', chack:false},
   ],
   codeSent:false,
}
error=false;
errorText;
LoginForm!: FormGroup;
CodeLoginForm;
chackCodeForm;


  constructor(   private http: HttpClient,
  private navServ: NavInfoService,
private mainServ:MainPageDataService) {    // Initialization logic can go here
   
      this.LoginForm = new FormGroup({
          maili: new FormControl('', Validators.required),
          paroli: new FormControl('', [
            Validators.required,
            Validators.minLength(6),// At least one digit
          ]),
          rememberMe: new FormControl(false)   
        }); 
        this.CodeLoginForm = new FormGroup({
          CodeMaili: new FormControl('', [Validators.required ,Validators.email]),
      });
      this.chackCodeForm = new FormGroup({
          Code: new FormControl('', [Validators.required, Validators.minLength(5)]),
        
        });
    }

  ngOnInit(): void {
      this.Registration=this.mainServ.LangMainData.Registration;
      this.navServ.CodePage.subscribe(value => {
        if (value) {
        this.moveTologinWithCode('email')
        } 
      })
  } 

    onSubmitL(): void {
    if (this.LoginForm.valid) {
      this.http.post('login_user.php', this.LoginForm.value).subscribe({
        next: (response: any) => {
       
        localStorage.setItem('id', response.id)
         this.navServ.getUserInfo(response.id).subscribe({});

          window.location.reload();
        },
        error: (error) => {
        this.error=true;
        this.errorText=error.error.message;
        if (error.error.message=='paroli-arasworia'){
            this.errorText='password is incorrect'; 
        }else if(error.error.message=='angarishi-ver-moidzebna'){
            this.errorText='user not found';
        }
          console.error('Request failed:', error.error.message);
        }
      })
     


    
    } else {
      console.log('Login form has validation errors');
    }


  

  }
codePage=' ';
  moveTologinWithCode(word){
    this.error=false;
    this.errorText='';
    if(word=='email'){
      this.CodeLoginForm.reset();
      this.chackCodeForm.reset();
    }
this.codePage=word;
  }
resendDisabled = false;
countdown = 0;
intervalId: any;

 
  sendCode(){

      if (this.resendDisabled) return;

  // Your existing resend logic


  this.resendDisabled = true;
  this.countdown = 10;

  this.intervalId = setInterval(() => {
    this.countdown--;
    if (this.countdown === 0) {
      this.resendDisabled = false;
      clearInterval(this.intervalId);
    }
  }, 1000);
const Body={
  Maili: this.CodeLoginForm.value.CodeMaili,
  Int_ena: this.navServ.chosenLang

}

this.http.post('send_verify_code.php', Body).subscribe({
  next: (response: any) => {
    if(response.status=='success'){
      this.moveTologinWithCode('code');
    }else if(response.status=='error'){
      if(response.message=="es-maili-ar-arsebobs"){
        this.error=true;
        this.errorText='ემაილი არ არსებობს';
  }
}
  },
  error: (error) => {

    this.error = true;
    this.errorText = error.error.message;
    if (error.error.message == 'email-arasworia') {
      this.errorText = 'Email is incorrect';
    } else if (error.error.message == 'email-arasworia') {
      this.errorText = 'Email is incorrect';
    } else if (error.error.message == 'email-ver-moidzebna') {
      this.errorText = 'Email not found';
    }
    console.warn('Request failed:', error.error.message);
  }
})

  }



  codeError=false;
  codeErrorText='';
  onSubmitCode(){

    const Body={
      Maili: this.CodeLoginForm.value.CodeMaili,
      Kodi: this.chackCodeForm.value.Code,
       
    }
  
this.http.post('check_verify_code.php', Body ).subscribe({
  next: (response: any) => {
  
    if(response.status=='ok'){
      this.navServ.getUserInfo(response.id).subscribe({});
      localStorage.setItem('id', response.id);
      window.location.reload();
    }else if(response.status=='error'){
      this.error=true;
      this.errorText=response.message;
    }
  },
  error: (error) => {
    this.error = true;
    this.errorText = error.error.message;
    if (error.error.message == 'kodi-arasworia') {
      console.warn('Request failed:', error.error.message);
      this.codeError=true;
      this.codeErrorText = 'კოდი არასწორია';
    }else{
      this.codeError=true;
      this.codeErrorText = 'There is a problem with the server, try again later.';
    } 
  }

})
  }
}