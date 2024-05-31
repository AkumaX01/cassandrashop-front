import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnChanges {
  @Input() categoriaSeleccionada!: string;
  productos: any[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService,private carritoService: CarritoService) { }

  ngOnInit(): void {
    // Obtener el parámetro inicial de la ruta
    this.route.params.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'];
      this.actualizarProductos();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriaSeleccionada']) {
      this.actualizarProductos();
    }
  }

  actualizarProductos(): void {
    if (this.categoriaSeleccionada) {
      this.productos = this.dataService.obtenerProductosPorCategoria(this.categoriaSeleccionada);
    } else {
      this.productos = this.dataService.obtenerProductos();
    }
  }

  
}
