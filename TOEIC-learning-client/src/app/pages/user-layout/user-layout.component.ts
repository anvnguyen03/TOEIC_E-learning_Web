import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  isLoggedIn: boolean = false
  isAdmin: boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  @ViewChild('dropdownMenu', { static: false })
  dropdownMenu!: ElementRef;

  ngOnInit(): void {
    this.checkLogin()
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
