import { inject, Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { from, mergeMap, switchMap } from 'rxjs';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
   const authService = inject(AuthService);
    return from(authService.getTokenAsync()).pipe(
        mergeMap(token => {
         let authReq = req.clone();
        if(req.url.includes("https://us-central1-ifyoucanmove-dev.cloudfunctions.net")) {
            authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
           return next(authReq);
        })
      );
  
/*   let token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3YWU0OWM0YzlkM2ViODVhNTI1NDA3MmMzMGQyZThlNzY2MWVmZTEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUUEyIGxuYW1lIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2lmeW91Y2FubW92ZS1kZXYiLCJhdWQiOiJpZnlvdWNhbm1vdmUtZGV2IiwiYXV0aF90aW1lIjoxNzUyMDY3NzI2LCJ1c2VyX2lkIjoiVEVXTmxFQVRhYVo1aVdoSjBSTXNYSVR5QmxkMiIsInN1YiI6IlRFV05sRUFUYWFaNWlXaEowUk1zWElUeUJsZDIiLCJpYXQiOjE3NTIxMjgwMTMsImV4cCI6MTc1MjEzMTYxMywiZW1haWwiOiJxYTJAbWVudG9yZW0uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicWEyQG1lbnRvcmVtLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Q6rayAY8_AuCzBr4iDRlB7T3XNZHSvWU0eVpqwGMj1h26MsuAycaMSNFaMXU6n9WlAZG6AaMRiP6W-Tkvsx_ZtJo1QSHDtXupojwLwfnWf2ZYG44EgBhrNTjY1RY00Kma_ijx0RXAraNHTwZoZbrI0PgN-sMQDJQ4GIdFQvjH0JQpzKO29B-ElOgZVfnLgTxGshtF8kM_hI1FDcnMUz6Bzl11R1XCUFOE_39gQwy9A-LYepamfWX14gXtC7urCF95jrpfkBjrrMnxy3QqfXLV8pb0TcsRbX_JZn37BQOi-dzKueGe3Uvyp7T0NT_FVLu3-kMPtiXfDl72Uvd3p3N3A`
  if (authService.getToken()) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);  */

};
