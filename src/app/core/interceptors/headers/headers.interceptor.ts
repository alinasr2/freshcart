import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem("token")){
    req = req.clone({
      setHeaders:{
        token: localStorage.getItem("token")!
      }
    })
  }
  return next(req);
};
