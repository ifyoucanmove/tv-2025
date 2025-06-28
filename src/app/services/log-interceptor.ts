import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  // Your interceptor logic here
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
