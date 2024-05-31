import { Component, Input } from '@angular/core';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() producto: any;
  constructor(private carritoService: CarritoService) { }


  agregarAlCarrito() {
    console.log('Producto agregado al carrito:', this.producto);
    this.carritoService.addToCart(this.producto)
  }
}
