import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user!: User;
  userInfoForm!: FormGroup;
  editMode: [boolean,boolean] = [false,false];

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (data: User) => {
        this.user = data;
        this.initForm();
      },
      error: (error: any) => {
        console.error('Error retrieving user information:', error);
      }
    });


  }
  initForm(): void {
    this.userInfoForm = this.formBuilder.group({
      fullname: [{ value: this.user.fullname, disabled: !this.editMode[0] },
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(6),
          this.validateName
        ]
      ],
      password: [{ value: "", disabled: !this.editMode[1] },
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(6),
          this.validatePassword
        ]
      ],
      confirmpassword: [{ value: "", disabled: !this.editMode[1] },
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(6),
          this.validatePassword
        ]
      ]
    });
  }
  validateName(control: FormControl) {
    const name = control.value;
    if (!name || name.trim() === '') {
      return { 'required': true };
    }
    if (!/^[\u0020-\u007E\u00A0-\u024F\u1E00-\u1EFF]+$/.test(name)) {
      return { 'invalidName': true };
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

  toggleEditMode(index:number) {
    this.editMode[index] = !this.editMode[index];
    this.initForm()
  }

  saveChanges(index:number) {
    
    let newFullname:string|null = null;
    let newPassword: string|null = null;
    if(index === 0){
      newFullname = this.userInfoForm.get('fullname')?.value;
    }
    else{
      newPassword = this.userInfoForm.get('password')?.value;
    }

    this.userService.changeUserInfo(newFullname,newPassword).subscribe({
      next: (data: User) => {
        this.user = data;
        console.log(data)
        this.toggleEditMode(index);
      },
      error: (error: any) => {
        console.error('fail save info', error);
      }
    });
  }
}
