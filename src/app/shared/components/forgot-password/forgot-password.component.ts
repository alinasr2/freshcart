import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step:number = 1;
  msgError:string= "";
  isLoading:boolean = false;
  email:string = "";
  msgSuccess:string = "";
  emailForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required , Validators.email]),
  });
  verifyResetCode:FormGroup = new FormGroup({
    resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^\d$/)]),
  });
  resetPassword:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null, [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/)]),
  });
  submitEmailForm():void
  {
    this.msgError = "";
    if(this.emailForm.valid){
      this.isLoading = true;
      this.authService.forgotPassword(this.emailForm.value).subscribe({
        next: (res)=>{
          if(res.statusMsg == "success"){
            this.step = 2;
            let email = this.emailForm.value.email;
            this.resetPassword.get("email")?.patchValue(email);
            this.isLoading = false;
            this.msgError = "";
          }
        },
        error: (err) =>{
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      });
    }
    else{
      this.emailForm.markAllAsTouched();
    }
  }
  submitCodeForm():void
  {    
      this.msgError = "";
      this.isLoading = true;
      this.authService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = false;
          this.msgError = "";
          this.step = 3;
        },
        error:(err)=>{
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      });
  }
  resetAccount():void
  {
    this.isLoading = true;
    if(this.resetPassword.valid){
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res)=>{
          this.isLoading = false;
          this.msgSuccess = "Acoount Reset success"
          setTimeout(()=>{
            localStorage.setItem("token",res.token);
            this.authService.saveUserData();
            this.router.navigate(["/home"]);
          },2000);
        },
        error: (err)=>{
          console.log(err);
          
        }
      });
    }
    else{
    this.isLoading = false;
      this.resetPassword.markAllAsTouched();
    }
  }
}
