// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { AutenticacionLogService } from '../autenticacion-log.service';
import { Router } from '@angular/router';
import { SucursalService } from '../sucursal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  nombre: string = '';
  password: string = '';
  role: string = 'Empleado'; // default role
  sucursal: string = ''; // default role
  sucursales: any[] = [];

  constructor(
    private sucursalesService: SucursalService,
    private autenticacionLogService: AutenticacionLogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sucursalesService.obtenerSucursales().subscribe((sucursales) => {
      console.log({ sucursales });
      this.sucursales = sucursales;
    });
  }

  signup() {
    const user = {
      contra: this.password,
      id_sucursal: this.sucursal,
      nombre: this.nombre,
      usuario: this.username,
      rol: this.role,
    };
    //console.log({ user });

    this.autenticacionLogService.signup(user).subscribe((success) => {
      if (success) {
        console.log(`Usuario registrado: ${success}`);
        this.router.navigate(['/productos']);
      } else {
        // this.showLoginError();
      }
    });
  }
}
