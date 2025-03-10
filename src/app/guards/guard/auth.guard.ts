import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem("userId")) {    
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }};
