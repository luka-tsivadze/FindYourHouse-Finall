import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavInfoService } from '../../Services/NavService/nav-info.service';

export const loggedInGuard: CanActivateFn = (route, state) => {

 const navInfoService = inject(NavInfoService);
 
 if (!navInfoService.IsSignedIn.signed) {

   return true;
  } else{
    const router = inject(Router);
    router.navigate(['/']);  
    return false;
   }



}
