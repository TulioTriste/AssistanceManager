import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../services/user.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let userData: User;
  userData = history.state as User;

  const categoria = userData.category; // o cualquier otra forma de obtener la categoría

  if (categoria === 'docente') {
    return true;
  } else if (categoria === 'estudiante') {
    return true;
  } else {
    router.navigate(['/folder/Inbox']);
    return false;
  }
};
