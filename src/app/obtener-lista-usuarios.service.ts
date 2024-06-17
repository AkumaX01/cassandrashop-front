import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AutenticacionLogService } from './autenticacion-log.service';
import { getUrl } from './utils/api';

@Injectable({
  providedIn: 'root'
})
export class ObtenerListaUsuariosService {

  private apiUrlGlobal = getUrl('user/all');
  private apiUrlSucursal = getUrl('user');  // Asumiendo que hay una URL para usuarios por sucursal

  constructor(private http: HttpClient, private authService: AutenticacionLogService) { }

  getUsers(global: boolean): Observable<any[]> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        if (global) {
          return this.http.get<any[]>(this.apiUrlGlobal, { headers });
        } else {
          return this.authService.user$.pipe(
            switchMap(user => {
              const urlWithSucursal = `${this.apiUrlSucursal}/${user.id_sucursal}`;
              return this.http.get<any[]>(urlWithSucursal, { headers });
            })
          );
        }
      })
    );
  }
}
