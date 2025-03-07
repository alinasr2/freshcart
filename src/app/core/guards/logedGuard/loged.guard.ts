import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if(localStorage.getItem("token")){
    router.navigate(["/home"]);
    return false;
  }
  else{
    return true;
  }
};
