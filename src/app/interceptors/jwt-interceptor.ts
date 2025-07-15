import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/authservice/auth-service';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  if(token){
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`},
    });
  }

  return next(req).pipe(
    catchError(err => {
      if(err.status === 401){
        router.navigate(['login'])
      }
      return throwError(() => err);
    })
  );
};
