import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { CarritoService } from '../carrito.service';
import { AutenticacionLogService } from '../autenticacion-log.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categorias: string[] = [];
  cartItemCount = 0;
  dropdownOpen = false;
  isLoggedIn: boolean = false;
  user: any = null;

  @Output() categoriaSeleccionada: EventEmitter<string> = new EventEmitter<string>(); // Se declara el evento
  @Output() cambioCategoria: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dataService: DataService, 
    private carritoService: CarritoService, 
    private autenticacionLogService: AutenticacionLogService
  ) { }

  ngOnInit(): void {
    // Suscribirse a los cambios en el contador del carrito
    this.carritoService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
    this.getCategorias();
  
    // Suscribirse a los cambios en el estado de autenticación
    this.autenticacionLogService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      // Actualizar el contador del carrito cuando cambia el estado de autenticación
      if (status) {
        this.actualizarContadorCarrito();
      }
    });
    this.autenticacionLogService.user$.subscribe(user => {
      this.user = user;
    });
    console.log(this.user.rol)
    console.log(this.user.rol)


  }
  
  // Método para actualizar el contador del carrito
  actualizarContadorCarrito(): void {
    this.autenticacionLogService.user$.subscribe(user => {
      const username = user?.username;
      if (username) {
        const itemCount = this.carritoService.getTotalItemsCount();
        this.cartItemCount = itemCount;
      }
    });
  }
  
  getCategorias(): void {
    this.dataService.obtenerCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  closeNavbar(): void {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarToggler && navbarCollapse) {
      navbarToggler.click();
    }
  }

  // Método para manejar la selección de categoría
  seleccionarCategoria(categoria: string): void {
    console.log('Categoría seleccionada:', categoria); // Se agrega un mensaje de registro para verificar que se está recibiendo la categoría correctamente
    this.cambioCategoria.emit(categoria); // Se emite el evento
  }

  logout(): void {
    this.autenticacionLogService.logout();
  }
  
}
