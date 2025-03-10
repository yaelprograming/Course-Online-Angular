import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = sessionStorage.getItem("userId");
  const isHomePage = state.url === '/';
  if (userId || isHomePage) {    
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
