import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TOEIC-learning-client';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    setInterval(() => {
      if (this.authService.getToken()) {
        const token = { token: this.authService.getToken() }
        this.authService.validateToken(token).subscribe({
          next: (response) => {
            // token has expired
            if (response == false) {
              this.authService.logout()
              this.snackBar.open("Đã hết phiên đăng nhập, vui lòng đăng nhập lại để tiếp tục",
                "Đóng",
                {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                })
                .afterDismissed().subscribe(() => { this.router.navigate(['/home']) })
            }
          }
        })
      }
    }, 10000)
  }

  checkLogin() {
  }

}