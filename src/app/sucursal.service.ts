import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getUrl } from './utils/api';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  constructor(private http: HttpClient) {}

  obtenerSucursal(idSucursal: string): Observable<any> {
    // Construir la URL de la API usando el ID de la sucursal
    const apiUrl = getUrl(`sucursal/${idSucursal}`);
    // Realizar la solicitud HTTP y devolver el Observable
    return this.http.get<any>(apiUrl);
  }

  obtenerSucursales(): Observable<any> {
    // Construir la URL de la API usando el ID de la sucursal
    const apiUrl =  getUrl("sucursal")
    // Realizar la solicitud HTTP y devolver el Observable
    return this.http.get<any>(apiUrl);
  }
}
