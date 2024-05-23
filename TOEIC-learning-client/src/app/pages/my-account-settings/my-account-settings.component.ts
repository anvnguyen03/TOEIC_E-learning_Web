import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account-settings',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './my-account-settings.component.html',
  styleUrl: './my-account-settings.component.css'
})
export class MyAccountSettingsComponent implements OnInit{

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  username?: string
  fullname?: string
  userInfoForm!: FormGroup
  userPasswordForm!: FormGroup
  ngOnInit(): void {
    this.getUserInfo()
    this.userInfoFormInit()
    this.userPasswordFormInit()
  }

  getUserInfo() {
    this.username = this.authService.getUsername()
    this.fullname = this.authService.getFullname()
  }

  userInfoFormInit() {
    this.userInfoForm = this.formBuilder.group({
      fullname: [this.fullname, [Validators.required]]
    })
  }

  userPasswordFormInit() {
    
  }
}
