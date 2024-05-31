import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { CarritoService } from '../carrito.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categorias: string[] = [];
  cartItemCount= 0;
  dropdownOpen = false;
  @Output() categoriaSeleccionada: EventEmitter<string> = new EventEmitter<string>(); // Se declara el evento
  @Output() cambioCategoria: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataService: DataService, private carritoService: CarritoService) { }

  ngOnInit(): void {
     
     // Suscribirse a los cambios en el contador del carrito
     this.carritoService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
    this.getCategorias();
  }


  getCategorias(): void {
    this.categorias = this.dataService.obtenerCategorias();
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
}
