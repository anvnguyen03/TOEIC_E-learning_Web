import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  fullname?: string | null
  isLoggedIn: boolean = false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = { token: this.authService.getToken() }
    this.authService.validateToken(token).subscribe({
      next: (response) => {
        this.isLoggedIn = response
        this.fullname = this.authService.getFullname()
      }
    })
  }
}
