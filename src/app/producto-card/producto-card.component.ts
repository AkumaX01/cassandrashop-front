import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { AutenticacionLogService } from '../autenticacion-log.service';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() producto: any;

  constructor(
    private carritoService: CarritoService,
    private authService: AutenticacionLogService
  ) {}

  agregarAlCarrito(): void {
    console.log(this.producto)
    this.authService.user$.subscribe(user => {
      if (user) {
        const nombreUsuario = user.usuario;
        console.log(nombreUsuario)
        this.carritoService.addToCart(this.producto);
      }
    });
  }
}
