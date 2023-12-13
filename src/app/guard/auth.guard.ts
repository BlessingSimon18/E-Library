import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { AuthService } from '../Services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

 
  
  let service = inject(AuthService);
  let router = inject(Router);

  if(service.isLoggedIn()){
    return true;
  }else {
    router.navigate(['userlog']);
    return false;
  }

 
  
};
