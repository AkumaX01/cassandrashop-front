import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { AutenticacionLogService } from '../autenticacion-log.service';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css'],
})
export class ProductoCardComponent {
  @Input() producto: any;
  @Output('delete') deleteEmitter: EventEmitter<boolean> = new EventEmitter();

  user: any = null;

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private authService: AutenticacionLogService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((u) => (this.user = u));
  }
  agregarAlCarrito(): void {
    console.log(this.producto);
    this.authService.user$.subscribe((user) => {
      if (user) {
        const nombreUsuario = user.usuario;
        console.log(nombreUsuario);
        this.carritoService.addToCart(this.producto);
      }
    });
  }

  eliminar() {
    console.log({ producto: this.producto });
    if (!this.producto) return;
    this.productoService.deleteProduct(this.producto).subscribe((user) => {
      this.deleteEmitter.emit(true);
    });
  }
}
