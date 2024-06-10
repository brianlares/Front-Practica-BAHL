import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { SignUpRequest } from 'src/app/services/auth/signRequest';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignDivVisiable: boolean = true;

  loginError:string="";
  registerError:string="";

  logo = require('file-loader!../../../assets/images/user.png').default as string;

  //signUpObj: SignUpModel = new SignUpModel();
  //loginObj: LoginModel = new LoginModel();

  signUpForm=this.formBuilder.nonNullable.group({
    email:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required],
    name: ['',Validators.required],
    image: [this.logo],
    fechaRegistro: [this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')],
    profile: ['admin']
  },
  {
    validators: this.passwordMatchValidator,
  });

  loginForm=this.formBuilder.nonNullable.group({
    email:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  });

  constructor(
    private datePipe: DatePipe,
    private formBuilder:FormBuilder,
    private router:Router,
    private loginService: LoginService)
   {

   }

  passwordMatchValidator(control: AbstractControl)
  {
    console.log(control);
    return control.get('password')?.value === control.get('confirmPassword')?.value
    ? null
    : { mismatch: true };
  }

  ngOnInit(): void {
  }

  get emailSign(){
    return this.signUpForm.controls.email;
  }

  get nameSign(){
    return this.signUpForm.controls.name;
  }

  get passwordSign(){
    return this.signUpForm.controls.password;
  }

  get confirmPassword(){
    return this.signUpForm.controls.confirmPassword;
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  onLogin()
  {
    if(this.loginForm.valid)
    {
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {

          if(response)
            {
              console.log(response);
              alert("User Found...")
              console.info("Login completo");
              this.router.navigateByUrl('/dashboard');
              this.loginForm.reset();
            }
            else
            {
              console.log(response);
              alert("No User Found")
            }
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError=errorData;
        },
        complete: () => {

          this.loginForm.reset();
        }
      });
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  onRegister()
  {
    if(this.signUpForm.valid)
    {
      this.registerError="";
      this.loginService.register(this.signUpForm.value as SignUpRequest).subscribe({
        next: (userData) => {
          console.log(userData);
          alert(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError=errorData;
        },
        complete: () => {
          console.info("Registro completo");
          this.signUpForm.reset();
        }
      })
    }
    else{
      this.signUpForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

}
