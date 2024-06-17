import { Component } from '@angular/core';
import { VentasService } from '../ventas.service';

@Component({
  selector: 'app-mis-ventas',
  templateUrl: './mis-ventas.component.html',
  styleUrls: ['./mis-ventas.component.css'],
})
export class MisVentasComponent {
  ventas: any[] = [];
  titulo: string = 'Mis ventas';

  isLoading: boolean = false;
  noHayReportes: boolean = false;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.isLoading = true;
    this.ventas = [];
    this.titulo = 'Reporte de Ventas Globales';
    this.ventasService.getMisVentas().subscribe(
      (data) => {
        if (data) {
          this.ventas = data;
          this.calcularTotales();
          this.noHayReportes = false;
        } else {
          this.noHayReportes = true;
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener ventas globales:', error);
        this.isLoading = false;
        this.noHayReportes = true;
      }
    );
  }

  calcularTotales() {
    this.ventas.forEach((venta) => {
      let totalVenta = 0;
      venta.productos.forEach(
        (producto: { total: number; cantidad: number; precio: number }) => {
          producto.total = producto.cantidad * producto.precio;
          totalVenta += producto.total;
        }
      );
      venta.totalVenta = totalVenta;
    });
  }
}
