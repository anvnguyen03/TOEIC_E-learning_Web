import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.css'
})
export class NavbarHomeComponent implements OnInit {

  isLoggedIn: boolean = false
  isAdmin: boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  @ViewChild('dropdownMenu', { static: false })
  dropdownMenu!: ElementRef;

  ngOnInit(): void {
      if (this.authService.getToken()) {
        this.checkLogin()
      }
  }

  checkLogin() {
    const token = { token: this.authService.getToken() }
    this.authService.validateToken(token).subscribe({
      next: (response) => {
        this.isLoggedIn = response
        this.isAdmin = this.isAdminFn()
      }
    })
  }

  isAdminFn(): boolean {
    return this.authService.getUserRole() == 'ADMIN' ? true : false
  }

  ngAfterViewInit() {
    // Kiểm tra xem các ViewChild đã được khởi tạo chưa
    console.log(this.dropdownMenu)
  }

  toggleDropdown() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.dropdownMenu.nativeElement.classList.remove('show');
    } else {
      this.dropdownMenu.nativeElement.classList.add('show');
    }
  }
}
