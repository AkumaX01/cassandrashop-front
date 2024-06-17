import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { DataService } from '../data.service';
import { AutenticacionLogService } from '../autenticacion-log.service';
import { RealizarVentaService } from '../realizar-venta.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnChanges {

  @Input() categoriaSeleccionada!: string;
  productos: any[] = [];
  productosFiltrados: any[] = [];
  busqueda: string = '';
  carrito: any[] = [];
  currentUser: string = ''; // Variable para almacenar el nombre de usuario actual
  total=0;;

  constructor(private route: ActivatedRoute, private dataService: DataService, private carritoService: CarritoService,private authService: AutenticacionLogService, private realizarVentaService: RealizarVentaService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'];
      this.actualizarProductos();
    });

     // Obtén el nombre de usuario del usuario actual desde el servicio de autenticación
     this.authService.user$.subscribe(user => {
      if (user) {
        this.currentUser = user.usuario; // Guarda el nombre de usuario actual
        this.obtenerCarrito(this.currentUser); // Llama a obtenerCarrito() cuando se obtenga el nombre de usuario
      }
    });
    this.getPrecioTotal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriaSeleccionada']) {
      this.actualizarProductos();
    }
    
  }

  actualizarProductos(): void {
    if (this.categoriaSeleccionada) {
      this.dataService.obtenerProductosPorCategoria(this.categoriaSeleccionada).subscribe(
        productos => {
          this.productos = productos;
          this.filtrarProductos();
        },
        error => {
          console.error('Error al obtener productos por categoría:', error);
        }
      );
    } else {
      this.dataService.obtenerProductos().subscribe(
        productos => {
          this.productos = productos;
          this.filtrarProductos();
        },
        error => {
          console.error('Error al obtener todos los productos:', error);
        }
      );
    }
  }

  filtrarProductos(): void {
    if (!this.busqueda) {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }
  getPrecioTotal() {
    this.total= this.carritoService.getPrecioTotal();
  }

  eliminarDelCarrito(item: any){
    this.carritoService.removeFromCart( item.id_producto);
    this.obtenerCarrito(this.currentUser);
    this.total= this.carritoService.getPrecioTotal();
  }
  finalizarCompra(): void {
    this.realizarVentaService.realizarVenta().pipe(first()).subscribe(
      () => {
        // Si la venta se realizó con éxito, borrar el carrito del localStorage
        this.carritoService.clearCart();
        // Actualizar el carrito en el componente para que desaparezcan los elementos del carrito en el HTML
        this.actualizarCarrito();
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
  
  
  obtenerCarrito(username: string): void {
    this.carrito = this.carritoService.getCart();
  }
  actualizarCarrito(): void {
    this.obtenerCarrito(this.currentUser);
    this.total = this.carritoService.getPrecioTotal();
  }
  
}
