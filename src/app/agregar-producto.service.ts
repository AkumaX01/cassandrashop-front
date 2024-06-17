import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AutenticacionLogService } from './autenticacion-log.service';
import { getUrl } from './utils/api';

@Injectable({
  providedIn: 'root'
})
export class AgregarProductoService {
  private apiUrl = getUrl('products');

  constructor(private http: HttpClient, private authService: AutenticacionLogService) {}

  addProduct(producto: any): Observable<any> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.post<any>(this.apiUrl, producto, { headers });
      })
    );
  }
}
