import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AutenticacionLogService } from './autenticacion-log.service';
import { getUrl } from './utils/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private productos: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  productos$ = this.productos.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AutenticacionLogService
  ) {}

  loadProductos(sucursal: string | null): Observable<any[]> {
    return this.authService.getToken().pipe(
      switchMap((token) => {
        if (!token) {
          // Si no hay token, devuelve un observable vacío
          return of([]);
        }

        const url = sucursal
          ? getUrl(
              `products?${new URLSearchParams({
                sucursal: sucursal,
              }).toString()}`
            )
          : getUrl('products');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<any[]>(url, { headers });
      }),
      switchMap((productos) => {
        this.productos.next(productos); // Almacena los productos en la variable local
        return of(productos);
      })
    );
  }

  loadProductosPorCategoria(
    sucursal: string | null,
    categoria: string
  ): Observable<any[]> {
    return this.authService.getToken().pipe(
      switchMap((token) => {
        if (!token) {
          // Si no hay token, devuelve un observable vacío
          return of([]);
        }

        const url = sucursal
          ? getUrl(
              `products?${new URLSearchParams({
                sucursal,
                categoria: categoria,
              }).toString()}`
            )
          : getUrl(
              `products?${new URLSearchParams({
                categoria: categoria,
              }).toString()}`
            );
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<any[]>(url, { headers });
      }),
      switchMap((productos) => {
        this.productos.next(productos); // Almacena los productos en la variable local
        return of(productos);
      })
    );
  }

  obtenerCategorias(): Observable<string[]> {
    return this.http.get<any[]>(getUrl('products/categorias')).pipe(
      map((categorias) => {
        return categorias.map((categoria) => categoria.nombre);
      })
    );
  }
}
