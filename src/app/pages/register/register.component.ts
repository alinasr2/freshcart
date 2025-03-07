import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean = false;
  msgError:string = "";
  msgSuccess:boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01[0-2]|015)[0-9]{8}$/)])
  },{validators:this.confirmPassword});
  submitForm():void
  {
    this.isLoading = true;    
    if(this.registerForm.valid){
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.message = 'success'){
            this.isLoading = false;
            this.msgSuccess = true;
            setTimeout(()=>{
              this.router.navigate(["/login"]);
            },2000);
          }
        },
        error:(err)=>{
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      });      
    }
    else{
      this.registerForm?.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
  confirmPassword(group:AbstractControl){
    const password = group.get("password")?.value;
    const rePassword = group.get("rePassword")?.value;
    return password == rePassword ? null : {mismatch:true};
  }
}
