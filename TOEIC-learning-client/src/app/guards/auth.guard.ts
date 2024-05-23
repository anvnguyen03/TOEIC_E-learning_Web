import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// guard bảo vệ các trang yêu cầu đăng nhập 
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  const token = { token: authService.getToken() }

  return authService.validateToken(token).pipe(
    map((response) => {
      if (response == true) {
        // Nếu token hợp lệ, cho phép truy cập route 
        return true;
      } else {
        localStorage.removeItem('token');
        // Nếu token không hợp lệ, chuyển hướng đến trang đăng nhập
        return router.createUrlTree(['/login']);
      }
    })
  )
  
};
