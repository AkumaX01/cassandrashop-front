import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  // Nombre del carrito en localStorage
  private cartName = 'carrito_usuario_actual';
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();
  cartQty$ = this.cart.asObservable().pipe(map((a) => a.length));
  cartTotal$ = this.cart
    .asObservable()
    .pipe(
      map((cart) =>
        cart.reduce((total, item) => total + item.cantidad * item.costo, 0)
      )
    );

  constructor() {
    this.loadCart();
  }

  // Guarda el carrito en localStorage
  private saveCart(cart: any[]): void {
    localStorage.setItem(this.cartName, JSON.stringify(cart));
  }

  // Carga el carrito desde localStorage
  private loadCart(): void {
    const savedCart = localStorage.getItem(this.cartName);
    this.cart.next(savedCart ? JSON.parse(savedCart) : []);
  }

  // Nueva función para actualizar la cantidad de un artículo en el carrito
  updateCartItemQuantity(itemId: number, nuevaCantidad: number): void {
    this.cart$.pipe(first()).subscribe((cart) => {
      const existingItem = cart.find((cartItem) => cartItem.id === itemId);

      if (existingItem) {
        if (nuevaCantidad > 0) {
          existingItem.cantidad = nuevaCantidad;
        } else {
          // Si la cantidad es 0 o menos, eliminar el artículo del carrito
          cart = cart.filter((cartItem) => cartItem.id !== itemId);
        }
        this.saveCart(cart);
        this.loadCart();
      }
    });
  }

  // Modificar la función de agregar al carrito para no incrementar la cantidad si ya existe
  addToCart(item: any): void {
    this.cart$.pipe(first()).subscribe((cart) => {
      const existingItem = cart.find(
        (cartItem) => cartItem.id_producto === item.id_producto
      );
      if (existingItem) {
        existingItem.cantidad = (existingItem.cantidad || 1) + 1;
      } else {
        const newItem = { ...item, cantidad: 1 };
        cart.push(newItem);
      }

      this.saveCart(cart);
      this.loadCart();
    });
  }

  // Elimina un artículo del carrito
  removeFromCart(itemId: number): void {
    this.cart$.pipe(first()).subscribe((cart) => {
      const index = cart.findIndex(
        (cartItem) => cartItem.id_producto === itemId
      );
      if (index !== -1) {
        cart.splice(index, 1);
        this.saveCart(cart);
        this.loadCart();
      }
    });
  }

  // Limpia el carrito
  clearCart(): void {
    localStorage.removeItem(this.cartName);
    this.loadCart();
  }
}
