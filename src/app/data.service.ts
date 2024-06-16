import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AutenticacionLogService } from './autenticacion-log.service';
import { getUrl } from './utils/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private productos: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private categorias: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private productosLoaded: boolean = false; // Variable para controlar si los productos han sido cargados

  constructor(private http: HttpClient, private authService: AutenticacionLogService) { }

  obtenerProductos(): Observable<any[]> {
    if (!this.productosLoaded) {
      return this.authService.getToken().pipe(
        switchMap(token => {
          if (!token) {
            // Si no hay token, devuelve un observable vacío
            return of([]);
          }
          
          const url = getUrl('products');
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          return this.http.get<any[]>(url, { headers });
        }),
        switchMap(productos => {
          this.productos.next(productos); // Almacena los productos en la variable local
          this.productosLoaded = true; // Marca los productos como cargados
          return of(productos);
        })
      );
    } else {
      return this.productos.asObservable(); // Devuelve los productos almacenados en la variable local
    }
  }

  obtenerProductosPorCategoria(categoria: string): Observable<any[]> {
    return this.obtenerProductos().pipe(
      switchMap(productos => {
        return of(productos.filter(producto => producto.categoria === categoria));
      })
    );
  }

  obtenerCategorias(): Observable<string[]> {
    if (!this.productosLoaded) {
      return this.obtenerProductos().pipe(
        switchMap(productos => {
          // Obtener categorías únicas de los productos
          const categorias = [...new Set(productos.map(producto => producto.categoria))];
          this.categorias.next(categorias.map(categoria => categoria.toString())); // Almacena las categorías en la variable local
          return this.categorias.asObservable();
        })
      );
    } else {
      return this.categorias.asObservable(); // Devuelve las categorías almacenadas en la variable local
    }
  }
  
}
