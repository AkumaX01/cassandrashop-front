import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { getUrl } from './utils/api';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionLogService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  private userSubject: BehaviorSubject<any>;
  public user$: Observable<any>;

  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;

  constructor(private http: HttpClient) {
    // Crear el BehaviorSubject sin un valor inicial
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    // Asignar la referencia del Observable a isLoggedIn$
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();

    // Obtener el usuario almacenado en el almacenamiento local
    const storedUser = localStorage.getItem('user');
    // Crear el BehaviorSubject para el usuario con el valor almacenado o null si no hay ninguno
    this.userSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    // Asignar la referencia del Observable a user$
    this.user$ = this.userSubject.asObservable();

    // Crear el BehaviorSubject para el token con el valor almacenado o null si no hay ninguno
    const storedToken = localStorage.getItem('token');
    this.tokenSubject = new BehaviorSubject<string | null>(storedToken);
    // Asignar la referencia del Observable a token$
    this.token$ = this.tokenSubject.asObservable();

    // Verificar si hay un token almacenado y actualizar el estado de inicio de sesión en consecuencia
    if (storedToken) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const loginUrl = getUrl('/auth/login');
    const credentials = {
      username: username,
      password: password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<{ access_token: string }>(loginUrl, credentials, httpOptions)
      .pipe(
        tap(
          (response) => {
            console.log('Token obtenido:', response.access_token);
            // Guardar el token en el localStorage
            localStorage.setItem('token', response.access_token);
            // Actualizar el BehaviorSubject del token con el token obtenido
            this.tokenSubject.next(response.access_token);
            this.obtenerUsuario(response.access_token);
            this.isLoggedInSubject.next(true); // Indicar que el login fue exitoso
          },
          (error) => {
            console.error('Error al iniciar sesión:', error);
            this.isLoggedInSubject.next(false); // Indicar que el login fracasó
          }
        ),
        map(() => true),
        catchError(() => of(false))
      );
  }

  signup(user: {
    id_sucursal: string;
    usuario: string;
    nombre: string;
    rol: string;
    contra: string;
  }): Observable<boolean> {
    const loginUrl = getUrl('/auth/signup');

    return this.token$.pipe(
      switchMap((token) => {
        if (!token) {
          return of(false); // Si no hay token, regresar false
        }

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
        };

        return this.http.post(loginUrl, user, httpOptions).pipe(
          map(() => true),
          catchError(() => of(false))
        );
      })
    );
  }
  obtenerUsuario(token: string): void {
    const apiUrl = getUrl('user/me');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    this.http.get<any>(apiUrl, httpOptions).subscribe(
      (response) => {
        console.log('Datos del usuario:', response);
        // Asegurar que los datos estén en formato JSON
        const userData =
          typeof response === 'string' ? JSON.parse(response) : response;

        if (userData.id_sucursal) {
          this.obtenerSucursal(userData.id_sucursal).subscribe((sucursal) => {
            console.log({ sucursal });

            userData.sucursal = sucursal;
            // Actualizar el BehaviorSubject del usuario con los datos obtenidos
            this.userSubject.next(userData);
            // Almacenar los datos en el almacenamiento local en formato JSON
            localStorage.setItem('user', JSON.stringify(userData));
          });
        } else {
          // Actualizar el BehaviorSubject del usuario con los datos obtenidos
          this.userSubject.next(userData);
          // Almacenar los datos en el almacenamiento local en formato JSON
          localStorage.setItem('user', JSON.stringify(userData));
        }
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  logout(): void {
    // Actualizar el BehaviorSubject de isLoggedIn para indicar que el usuario ha cerrado sesión
    this.isLoggedInSubject.next(false);
    // Limpiar los BehaviorSubjects de usuario y token
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    // Eliminar el usuario del almacenamiento local
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('carrito_usuario_actual');
  }

  getToken(): Observable<string | null> {
    return this.token$;
  }

  obtenerSucursal(idSucursal: string): Observable<any> {
    // Construir la URL de la API usando el ID de la sucursal
    const apiUrl = getUrl(`sucursal/${idSucursal}`);
    // Realizar la solicitud HTTP y devolver el Observable
    return this.http.get<any>(apiUrl);
  }
}
