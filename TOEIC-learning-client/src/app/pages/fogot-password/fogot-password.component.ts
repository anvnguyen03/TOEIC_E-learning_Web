import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-fogot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fogot-password.component.html',
  styleUrl: './fogot-password.component.css'
})
export class FogotPasswordComponent {
  isEmailExist: boolean = true;
  isSendedRequest: boolean = false;
  fogotPasswordForm!: FormGroup;
  email:string = "example@haha.com";
  constructor(private authService: AuthService, private formBuilder: FormBuilder,private activeRoute: ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
    
  const email = this.activeRoute.snapshot.paramMap.get('email');
  const code = this.activeRoute.snapshot.paramMap.get('code');

  if (email && code) {
    this.email = email;
    this.isEmailExist = true;
    this.isSendedRequest = true;
  }
  this.initForm();
  }
  initForm() {
    this.fogotPasswordForm = this.formBuilder.group({
      email: [{ value: this.email ,disabled: this.isSendedRequest},
      [
        Validators.required,
        Validators.email,
        this.validateEmail
      ]
      ],
      newPassword: [{ value: "" },
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(6),
        this.validatePassword
      ]
      ],
      confirmNewpassword: [{ value: "" },
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(6),
        this.validatePassword
      ]
      ]
    });
  }
  validateEmail(control: FormControl) {
    const email: string = control.value as string;
    if (!email) {
      return { 'required': true };
    }
    if (!/^[\u0020-\u007E\u00A0-\u024F\u1E00-\u1EFF]+$/.test(email)) {
      return { 'invalidEmail': true };
    }
    return null;
  }
  validatePassword(control: FormControl) {
    const name = control.value;
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      return { 'invalidpassword': true };
    }
    return null;
  }

  sendFogotPasswordRequest() {
    const email: string = this.fogotPasswordForm.get("email")?.value;

    this.authService.sendFogotPasswordRequest(email).subscribe({
      next: (isEmailExist: boolean,) => {
        this.isEmailExist = isEmailExist;
      },
      error: (error: any) => {
        console.error('fail to check email', error);
      }
    });
  }
  changePassword() {
    const password: string = this.fogotPasswordForm.get("confirmNewpassword")?.value;
    this.authService.resetPassword(this.email,password).subscribe({
      next: (isSuccessful:boolean) => {
        if(isSuccessful){
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        console.error('fail to change pass', error);
      }
    });
  }
}
