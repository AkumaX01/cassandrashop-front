import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { AutenticacionLogService } from '../autenticacion-log.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  currentUser: string = ''; // Variable para almacenar el nombre de usuario actual

  constructor(
    private carritoService: CarritoService,
    private authService: AutenticacionLogService // Inyecta el servicio de autenticación
  ) {}

  ngOnInit(): void {
    // Obtén el nombre de usuario del usuario actual desde el servicio de autenticación
    this.authService.user$.subscribe(user => {
      if (user) {
        this.currentUser = user.username; // Guarda el nombre de usuario actual
        this.obtenerCarrito(this.currentUser); // Llama a obtenerCarrito() cuando se obtenga el nombre de usuario
      }
    });
  }

  obtenerCarrito(username: string): void {
    this.carrito = this.carritoService.getCart();
  }

  agregarProducto(item: any): void {
    this.carritoService.addToCart(item);
    this.obtenerCarrito(this.currentUser);
  }

  eliminarProducto(item: any): void {
    this.carritoService.removeFromCart(item.id);
    this.obtenerCarrito(this.currentUser);
    this.obtenerCarrito(this.currentUser);
  }

  getPrecioTotal(): number {
    return this.carritoService.getPrecioTotal();
  }

  cantidadCambiada(item: any, nuevaCantidad: number): void {
    if (nuevaCantidad < 0) {
      nuevaCantidad = 0;
    }
    this.carritoService.updateCartItemQuantity(item.id, nuevaCantidad);
    this.obtenerCarrito(this.currentUser);
  }
  
  
  
}
