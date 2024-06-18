import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionLogService } from './autenticacion-log.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AutenticacionLogService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      map((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']); // Si no está logeado, redirige al componente de inicio de sesión
          return false;
        }
        return true;
      })
    );
  }
}
