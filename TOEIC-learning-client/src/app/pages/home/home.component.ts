import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarHomeComponent } from '../layout/navbar-home/navbar-home.component';
import { FooterHomeComponent } from '../layout/footer-home/footer-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarHomeComponent, FooterHomeComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  username?: string
  isLoggedIn: boolean = false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = { token: this.authService.getToken() }
    this.authService.validateToken(token).subscribe({
      next: (response) => {
        this.isLoggedIn = response
        this.username = this.authService.getUsername()
      }
    })
  }
}
