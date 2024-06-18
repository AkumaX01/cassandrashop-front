import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AutenticacionLogService } from './autenticacion-log.service';
import { getUrl } from './utils/api';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(
    private http: HttpClient,
    private authService: AutenticacionLogService
  ) {}

  addProduct(producto: any): Observable<any> {
    return this.authService.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.post<any>(getUrl('products'), producto, { headers });
      })
    );
  }

  deleteProduct(producto: any): Observable<any> {
    console.log({ producto });
    return this.authService.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.delete<any>(
          getUrl(`products/${producto.id_sucursal}/${producto.id_producto}`),
          { headers }
        );
      })
    );
  }
}
