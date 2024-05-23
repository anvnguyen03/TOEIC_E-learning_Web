import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{

  constructor(private authService: AuthService) {}

  fullname?: string
  username?: string

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    this.fullname = this.authService.getFullname()
    this.username = this.authService.getUsername()
  }
}
