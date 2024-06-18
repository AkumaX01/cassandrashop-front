import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { DataService } from '../data.service';
import { AutenticacionLogService } from '../autenticacion-log.service';
import { RealizarVentaService } from '../realizar-venta.service';
import { first } from 'rxjs';
import { SucursalService } from '../sucursal.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit, OnChanges {
  @Input() categoriaSeleccionada!: string;
  productos: any[] = [];
  productosFiltrados: any[] = [];
  busqueda: string = '';
  carrito: any[] = [];
  currentUser: any = ''; // Variable para almacenar el nombre de usuario actual
  total = 0;
  loadingProducts = false;
  sucursales: any = [];
  sucursal: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private sucursalesService: SucursalService,
    private carritoService: CarritoService,
    private authService: AutenticacionLogService,
    private realizarVentaService: RealizarVentaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoriaSeleccionada = params['categoria'];
      this.actualizarProductos();
    });

    // Obtén el nombre de usuario del usuario actual desde el servicio de autenticación
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.currentUser = user; // Guarda el nombre de usuario actual
        this.sucursal = user.id_sucursal;
      }
    });
    this.carritoService.cart$.subscribe((c) => (this.carrito = c));
    this.carritoService.cartTotal$.subscribe((total) => (this.total = total));
    this.dataService.productos$.subscribe((p) => {
      this.productos = p;
      this.filtrarProductos();
    });
    this.sucursalesService.obtenerSucursales().subscribe((sucursales) => {
      console.log({ sucursales });
      this.sucursales = sucursales;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriaSeleccionada']) {
      this.actualizarProductos();
    }
  }

  actualizarProductos(): void {
    this.loadingProducts = true;
    if (this.categoriaSeleccionada) {
      this.dataService
        .loadProductosPorCategoria(this.sucursal, this.categoriaSeleccionada)
        .subscribe(
          (productos) => {
            this.loadingProducts = false;
          },
          (error) => {
            console.error('Error al obtener productos por categoría:', error);
            this.loadingProducts = false;
          }
        );
    } else {
      this.dataService.loadProductos(this.sucursal).subscribe(
        (productos) => {
          this.loadingProducts = false;
        },
        (error) => {
          console.error('Error al obtener todos los productos:', error);
          this.loadingProducts = false;
        }
      );
    }
  }

  filtrarProductos(): void {
    if (!this.busqueda) {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }

  eliminarDelCarrito(item: any) {
    this.carritoService.removeFromCart(item.id_producto);
  }
  finalizarCompra(): void {
    this.realizarVentaService
      .realizarVenta()
      .pipe(first())
      .subscribe(
        () => {
          // Si la venta se realizó con éxito, borrar el carrito del localStorage
          this.carritoService.clearCart();
          // Mostrar mensaje de éxito
          this.mostrarMensaje('Compra realizada con éxito');
        },
        (error) => {
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
