import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { User } from '../services/user.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let userData: User;
  userData = history.state as User;
  try {
    const categoria = userData.category.toLowerCase(); // o cualquier otra forma de obtener la categoría

    if (categoria === 'docente' || categoria === 'estudiante') {
      return true;
    } else {
      router.navigate(['/folder/Inbox']);
      return false;
    }
  } catch {
    router.navigate(['error_page']);
    return false;
  }
};
