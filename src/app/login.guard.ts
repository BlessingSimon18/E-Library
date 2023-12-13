import { CanActivateFn } from '@angular/router';
import { AuthService } from './Services/auth.service';
import {inject} from '@angular/core'

export const loginGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService)
  
  
  return true;
};
  