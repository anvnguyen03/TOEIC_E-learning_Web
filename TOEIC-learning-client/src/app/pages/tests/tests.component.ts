import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent implements OnInit{

  isLoggedIn: boolean = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = {token: this.authService.getToken()}
    this.authService.validateToken(token).subscribe({
      next: (response) => {this.isLoggedIn = response}
    })
  }

  getUsername():string {
    return this.authService.getUsername()
  }
}
