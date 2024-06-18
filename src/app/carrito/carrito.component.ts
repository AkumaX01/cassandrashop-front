import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { AutenticacionLogService } from '../autenticacion-log.service'; // Importa el servicio de autenticación
import { RealizarVentaService } from '../realizar-venta.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  precioTotal: number = 0
  currentUser: string = ''; // Variable para almacenar el nombre de usuario actual

  constructor(
    private carritoService: CarritoService,
    private realizarVentaService: RealizarVentaService,
    private authService: AutenticacionLogService // Inyecta el servicio de autenticación
  ) {}

  ngOnInit(): void {
    // Obtén el nombre de usuario del usuario actual desde el servicio de autenticación
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.currentUser = user.username; // Guarda el nombre de usuario actual
      }
    });
    this.carritoService.cart$.subscribe((c) => (this.carrito = c));
    this.carritoService.cartTotal$.subscribe((total) => (this.precioTotal = total));
  }

  agregarProducto(item: any): void {
    this.carritoService.addToCart(item);
  }

  eliminarProducto(id: any): void {
    this.carritoService.removeFromCart(id);
  }

  cantidadCambiada(item: any, nuevaCantidad: number): void {
    if (nuevaCantidad < 0) {
      nuevaCantidad = 0;
    }
    this.carritoService.updateCartItemQuantity(item.id, nuevaCantidad);
  }

  finalizarCompra(): void {
    this.realizarVentaService.realizarVenta().pipe(first()).subscribe(
      () => {
        // Si la venta se realizó con éxito, borrar el carrito del localStorage
        this.carritoService.clearCart();
        // Mostrar mensaje de éxito
        this.mostrarMensaje('Compra realizada con éxito');
      },
      error => {
        console.error('Error al realizar la venta:', error);
        // Mostrar mensaje de error
        this.mostrarMensaje('Error al realizar la compra');
      }
    );
  }
  
  mostrarMensaje(mensaje: string): void {
    alert(mensaje); // Mostrar mensaje en una ventana emergente
  }
  
}
