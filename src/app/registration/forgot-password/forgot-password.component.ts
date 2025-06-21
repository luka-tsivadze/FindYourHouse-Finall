import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { LoadingServiceService } from '../../Services/LoadingServ/loading-service.service';
import { set } from 'ol/transform';
import { RegistrationService } from '../../Services/registration/registration.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  Pages='Email';
  email: string = '';
  showSuc: boolean = false;
  showError: boolean = false;
  passwords: boolean = true;
  forgotPassword={
    
    title: 'Reset Your Password',
    description: 'Enter your email address to receive a code that will be used to reset your password.',    
    enterEmail: 'Please enter your email address to reset your password.',
    emailLabel: 'Email Address :',
    submitButton: 'Submit',
    emailPlaceholder: 'Enter your email',
    errorMessage: 'Please enter a valid email address.',
  
    
    codeTitle: 'We have sent you a code',
    codeDescription: 'Enter the code sent to your email to reset your password.',
    codeLabel: 'Enter Code :',
    codePlaceholder: 'Enter the code',
    codeButton: 'Verify Code',
    codeErrorMessage: 'The code you entered is incorrect. Please try again.',
    SendCodeAgein: 'Send Code Again',

    resetPasswordTitle: 'Reset Your Password',
    resetPasswordDescription: 'Enter your new password below.',
    resetPasswordLabel: 'New Password :',
    resetPasswordPlaceholder: 'Enter your new password',
    resetPasswordErrorMessage: 'Passwords do not match. ',
    resetPasswordConfirmLabel: 'Confirm New Password :',
    resetPasswordConfirmPlaceholder: 'Confirm your new password',

    resetPasswordButton: 'Reset Password',

    successTitle: 'your Password have been changed Successfully You can GO back to Login Now',

    
  } 
  inputCode: string = '';
  Code;

  newPassword: string = '';
  confirmNewPassword: string = '';
  constructor(private reg:RegistrationService) { }
  onSubmit() {
    this.Code = Math.random().toString(36).substring(2, 7);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(this.Pages === 'Code') {
      this.Pages = 'Email';
    return;
    }

    if (this.email && emailPattern.test(this.email)) {
      this.showSuc = true;
      this.showError = false;

        this.reg.PasswordCode(this.Code, this.email).subscribe({
          next: (response) => {
            console.log('Code sent successfully:', response);
            this.Pages = 'Code';
          },
          error: (error) => {
            alert('ბოდიში რაღაც შეცდომაა მოგვიანებით ცადეთ :'+ error.message);
         
        }
    });
    

  }   else {
      this.showSuc = false;
      this.showError = true;
  
    }
  }

  onCodeSubmit(){
  if (this.inputCode === this.Code) {
  
    this.showError = false;
    this.Pages = 'ResetPassword';
  }else{
    this.showError = true;
  }

}
onResetSubmit(){
  console.log('New Password:', this.confirmNewPassword);
  if (this.newPassword === this.confirmNewPassword) {
  this.showError = false;
  
this.reg.PasswordReset(this.newPassword, this.email).subscribe({
next: (response) => {

  this.Pages = 'Success';
},
error: (error) => {
  alert('ბოდიში რაღაც შეცდომაა მოგვიანებით ცადეთ :'+ error.message);
}

  });
 

}else{
  this.showError = true;
  this.Pages = 'ResetPassword';
}

}
}
