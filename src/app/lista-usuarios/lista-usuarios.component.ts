import { Component, OnInit } from '@angular/core';
import { ObtenerListaUsuariosService } from '../obtener-lista-usuarios.service';
import { AutenticacionLogService } from '../autenticacion-log.service'; // Asegúrate de importar tu servicio de autenticación

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  users: any[] = [];
  isLoading = false;
  error: string | null = null;
  hasClicked = false;
  userRole: string | null = null;

  constructor(
    private userService: ObtenerListaUsuariosService,
    private authService: AutenticacionLogService // Inyecta el servicio de autenticación
  ) { }

  ngOnInit(): void {
    // Obtener el rol del usuario al inicializar el componente
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userRole = user.rol;
      }
    });
  }

  loadUsers(global: boolean): void {
    this.isLoading = true;
    this.error = null;
    this.hasClicked = true;  // Se ha hecho clic en algún botón
    this.userService.getUsers(global).subscribe(
      data => {
        this.users = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching users', error);
        this.error = 'Error fetching users. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  showGlobalUsers(): void {
    this.loadUsers(true);
  }

  showSucursalUsers(): void {
    this.loadUsers(false);
  }
}
