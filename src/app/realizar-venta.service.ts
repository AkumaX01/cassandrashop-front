import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AutenticacionLogService } from './autenticacion-log.service';
import { getUrl } from './utils/api';

// Definir el tipo Producto
interface Producto {
  cantidad: number;
  categoria: string;
  costo: number;
  id_producto: string;
  id_sucursal: string;
  imagen: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class RealizarVentaService {

  constructor(private http: HttpClient, private authService: AutenticacionLogService) { }

  realizarVenta(): Observable<any> {
    // Obtener el token del servicio de autenticación
    return this.authService.getToken().pipe(
      switchMap(token => {
        if (!token) {
          throw new Error('No se ha proporcionado un token de autenticación');
        }

        // Obtener el carrito actual del localStorage
        const carritoActualStr: string | null = localStorage.getItem('carrito_usuario_actual');
        const carritoActual: Producto[] = carritoActualStr ? JSON.parse(carritoActualStr) : [];

        // Manejar errores al analizar el carrito del localStorage
        if (!Array.isArray(carritoActual)) {
          return throwError('Error al obtener el carrito del localStorage');
        }

        // Obtener id_sucursal desde el carrito
        const id_sucursal = carritoActual.length > 0 ? carritoActual[0].id_sucursal : null;

        if (!id_sucursal) {
          return throwError('No se pudo obtener el id_sucursal del carrito');
        }

        // Crear una estructura de datos para la solicitud POST
        const datosVenta = {
          id_sucursal: id_sucursal,
          productos: carritoActual.map(producto => ({
            cantidad: producto.cantidad,
            precio: producto.costo, // Asumiendo que el precio es igual al costo del producto
            nombre: producto.nombre,
            id_producto: producto.id_producto
          })),
          fecha: new Date().toISOString() // Fecha actual en formato ISO 8601
        };

        // Crear las opciones de encabezado con el token como autorización
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Token como autorización
          })
        };

        // Realizar la solicitud POST
        return this.http.post<any>(getUrl('/sales'), datosVenta, httpOptions).pipe(
          catchError(error => {
            return throwError('Error al realizar la venta');
          })
        );
      })
    );
  }
}
