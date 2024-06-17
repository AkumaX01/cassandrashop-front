import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas.service';
import Chart from 'chart.js/auto';
import { AutenticacionLogService } from '../autenticacion-log.service';

@Component({
  selector: 'app-reportes-ventas',
  templateUrl: './reportes-ventas.component.html',
  styleUrls: ['./reportes-ventas.component.css']
})
export class ReportesVentasComponent implements OnInit {
  
  ventas: any[] = [];
  titulo: string = "Reporte de Ventas";
  selectedYear: number = new Date().getFullYear(); // Año actual
  selectedMonth: number = new Date().getMonth(); // Mes actual (0-indexado)
  years: number[] = [];
  months: { name: string, value: number }[] = [
    { name: 'Enero', value: 0 },
    { name: 'Febrero', value: 1 },
    { name: 'Marzo', value: 2 },
    { name: 'Abril', value: 3 },
    { name: 'Mayo', value: 4 },
    { name: 'Junio', value: 5 },
    { name: 'Julio', value: 6 },
    { name: 'Agosto', value: 7 },
    { name: 'Septiembre', value: 8 },
    { name: 'Octubre', value: 9 },
    { name: 'Noviembre', value: 10 },
    { name: 'Diciembre', value: 11 }
  ];

  isLoading: boolean = false;
  mostrarOpcionGrafica: boolean = false;
  ocultarReportes: boolean = false;
  graficoVentas: Chart | null = null;
  noHayReportes: boolean = false;
  

  constructor(private ventasService: VentasService, private autenticacionLogService: AutenticacionLogService) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {}

  obtenerVentasGlobales() {
    this.limpiarGrafica();
    this.ocultarReportes = false;
    this.isLoading = true;
    this.ventas = [];
    this.mostrarOpcionGrafica = false;
    this.noHayReportes = false;
    this.titulo = "Reporte de Ventas Globales";
    this.ventasService.getVentasGlobales(this.selectedMonth, this.selectedYear).subscribe(data => {
      if (data) {
        this.ventas = data;
        this.calcularTotales();
        this.noHayReportes = this.ventas.length === 0;
        this.mostrarOpcionGrafica = this.ventas.length!=0;
      } else {
        this.noHayReportes = true;
      }
      this.isLoading = false;
    },
    error => {
      console.error('Error al obtener ventas globales:', error);
      this.isLoading = false;
      this.noHayReportes = true;
    });
  }


  obtenerVentasSucursal() {
    this.limpiarGrafica();
    this.ocultarReportes = false;
    this.isLoading = true;
    this.ventas = [];
    this.mostrarOpcionGrafica = false;
    this.noHayReportes = false;

    this.autenticacionLogService.user$.subscribe(user => {
      if (user) {
        const idSucursal = user.id_sucursal;

        this.autenticacionLogService.obtenerSucursal(idSucursal).subscribe(sucursal => {
          if (sucursal) {
            this.titulo = `Reporte de Ventas, ${sucursal.nombre}`;

            this.ventasService.getVentasSucursal(this.selectedMonth, this.selectedYear).subscribe(data => {
              if (data) {
                this.ventas = data;
                this.calcularTotales();
                this.noHayReportes = this.ventas.length === 0;
                this.mostrarOpcionGrafica = this.ventas.length!=0;
              } else {
                this.noHayReportes = true;
              }
              this.isLoading = false;
            },
            error => {
              console.error('Error al obtener ventas de sucursal:', error);
              this.isLoading = false;
              this.noHayReportes = true;
            });
          }
        });
      }
    });
  }

  generarGraficoVentas() {
    this.ocultarReportes = true;

    this.limpiarGrafica();

    const datosProductos = this.obtenerDatosProductos();
    const nombresProductos = datosProductos.map(producto => producto.nombre);
    const ventasTotales = datosProductos.map(producto => producto.total);

    const ctx = document.getElementById('graficoVentas') as HTMLCanvasElement;
    this.graficoVentas = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nombresProductos,
        datasets: [{
          label: 'Ventas Totales $',
          data: ventasTotales,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  limpiarGrafica() {
    if (this.graficoVentas) {
      this.graficoVentas.data.labels = [];
      this.graficoVentas.data.datasets = [];
      this.graficoVentas.update();
      this.graficoVentas.destroy();
      this.graficoVentas = null;
    }
  }

  obtenerDatosProductos(): { nombre: string; total: number; }[] {
    const datosProductos: { nombre: string; total: number; }[] = [];
    this.ventas.forEach(venta => {
      venta.productos.forEach((producto: { nombre: string; total: number; }) => {
        const index = datosProductos.findIndex(item => item.nombre === producto.nombre);
        if (index !== -1) {
          datosProductos[index].total += producto.total;
        } else {
          datosProductos.push({
            nombre: producto.nombre,
            total: producto.total
          });
        }
      });
    });
    return datosProductos;
  }
  
  calcularTotales() {
    this.ventas.forEach(venta => {
      let totalVenta = 0;
      venta.productos.forEach((producto: { total: number; cantidad: number; precio: number; }) => {
        producto.total = producto.cantidad * producto.precio;
        totalVenta += producto.total;
      });
      venta.totalVenta = totalVenta;
    });
  }
}
