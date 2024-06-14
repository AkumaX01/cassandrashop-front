import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutenticacionLogService } from './autenticacion-log.service'; // Importar el servicio de autenticación
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient, private authService: AutenticacionLogService) { }

  
  // Función para obtener todas las ventas
  getVentasGlobales(mes: number, anio: number): Observable<any> {
    const url = `https://shop.ernestorb.com/reports/ventas/globales?mes=${mes.toString()}&anio=${anio.toString()}`;
    
    // Suscribirse al observable token$ del servicio de autenticación para obtener el token
    return this.authService.token$.pipe(
      // Utilizar el token en la solicitud HTTP
      switchMap(token => {
        // Verificar si se obtuvo un token
        if (token) {
          // Configurar los encabezados con el token de autorización
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          // Realizar la solicitud HTTP con los encabezados configurados
          return this.http.get(url, { headers });
        } else {
          // Si no se obtuvo un token, devolver un observable vacío
          return of(null);
        }
      })
    );
  }


  // Función para obtener las ventas de una sucursal específica
  getVentasSucursal(mes: number, anio: number): Observable<any> {
    // Obtener el ID de la sucursal del Observable user$
    return this.authService.user$.pipe(
      switchMap(user => {
        // Verificar si se obtuvo un usuario y si tiene la propiedad id_sucursal
        if (user && user.id_sucursal) {
          // Construir la URL de la API utilizando el ID de la sucursal, el mes y el año
          const url = `https://shop.ernestorb.com/reports/ventas/${user.id_sucursal}?mes=${mes}&anio=${anio}`;
          // Obtener el token del Observable token$
          return this.authService.token$.pipe(
            switchMap(token => {
              // Verificar si se obtuvo un token
              if (token) {
                // Configurar los encabezados con el token de autorización
                const headers = new HttpHeaders({
                  'Authorization': `Bearer ${token}`
                });
                // Realizar la solicitud HTTP con los encabezados configurados
                return this.http.get(url, { headers });
              } else {
                // Si no se obtuvo un token, devolver un observable vacío
                return of(null);
              }
            })
          );
        } else {
          // Si no se obtuvo un usuario o no tiene la propiedad id_sucursal, devolver un observable vacío
          return of(null);
        }
      })
    );
  }
}
