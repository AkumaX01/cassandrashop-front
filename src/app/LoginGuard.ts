import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionLogService } from './autenticacion-log.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AutenticacionLogService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      tap((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/productos']); // Si está logeado, redirige al componente de productos
        }
      })
    );
  }
}
