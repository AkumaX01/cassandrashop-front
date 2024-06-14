import { Component } from '@angular/core';
import { AutenticacionLogService } from '../autenticacion-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private autenticacionLogService: AutenticacionLogService, private router: Router) {}

  login(): void {
    this.autenticacionLogService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/productos']);
      } else {
        this.showLoginError();
      }
    });
  }

  private showLoginError(): void {
    this.loginError = true;
    setTimeout(() => {
      this.loginError = false;
    }, 2000); // Ocultar el mensaje después de 2 segundos
  }
}
