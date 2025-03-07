import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading:boolean = false;
  msgError:string = "";
  msgSuccess:boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  submitForm():void
  {
    this.isLoading = true;    
    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message = 'success'){
            this.isLoading = false;
            this.msgSuccess = true;
            setTimeout(()=>{
              localStorage.setItem("token",res.token);
              this.router.navigate(["/home"]);
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
      this.loginForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}