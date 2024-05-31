import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) { 
    this.obtenerCarrito()
  }

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.carrito=this.carritoService.getCart();
   // this.carrito = this.carritoService.obtenerCarrito();
  }

  agregarProducto(item: any): void {
    //this.carritoService.agregarProducto(item);
    this.obtenerCarrito(); // Actualizar el carrito después de agregar un producto
  }

  eliminarProducto(item: any): void {
    console.log("fe")
    this.carritoService.removeFromCart(item.id)
    this.obtenerCarrito(); // Actualizar el carrito después de eliminar un producto
  }
  getPrecioTotal(): number {
    return this.carritoService.getPrecioTotal();
  }
  

  cantidadCambiada(item: any): void {
    console.log('Cantidad actualizada:', item.cantidad,item);
    item.cantidad--;// le removemos la cantidad agregada ya que el metodo de abajo se encarga de ello
    this.carritoService.addToCart(item);
  }
}
