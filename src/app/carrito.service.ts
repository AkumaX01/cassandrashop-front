import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Nombre del carrito en localStorage
  private cartName = 'carrito_usuario_actual';

  // Observable para el número de elementos en el carrito
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {}

  // Guarda el carrito en localStorage
  private saveCart(cart: any[]): void {
    localStorage.setItem(this.cartName, JSON.stringify(cart));
  }

  // Carga el carrito desde localStorage
  private loadCart(): any[] {
    const savedCart = localStorage.getItem(this.cartName);
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Obtiene el carrito
  getCart(): any[] {
    return this.loadCart();
  }

  // Nueva función para actualizar la cantidad de un artículo en el carrito
  updateCartItemQuantity(itemId: number, nuevaCantidad: number): void {
    let cart = this.loadCart();
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
      if (nuevaCantidad > 0) {
        existingItem.cantidad = nuevaCantidad;
      } else {
        // Si la cantidad es 0 o menos, eliminar el artículo del carrito
        cart = cart.filter(cartItem => cartItem.id !== itemId);
      }
      this.saveCart(cart);
      this.updateCartItemCount();
    }
  }

  // Modificar la función de agregar al carrito para no incrementar la cantidad si ya existe
  addToCart(item: any): void {
    let cart = this.loadCart();
  
    const existingItem = cart.find((cartItem) => cartItem.id_producto === item.id_producto);
    if (existingItem) {
      existingItem.cantidad = (existingItem.cantidad || 1) + 1;
    } else {
      const newItem = { ...item, cantidad: 1 };
      cart.push(newItem);
    }
  
    this.saveCart(cart);
    this.updateCartItemCount();
  }
  

  // Elimina un artículo del carrito
  removeFromCart(itemId: number): void {
    let cart = this.loadCart();
    const index = cart.findIndex(cartItem => cartItem.id_producto === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        this.saveCart(cart);
        this.updateCartItemCount();
    }
}


  // Obtiene el número total de artículos en el carrito
  getTotalItemsCount(): number {
    let cart = this.loadCart();
    return cart.reduce((total, item) => total + item.cantidad, 0);
  }

  // Obtiene el precio total de los artículos en el carrito
  getPrecioTotal(): number {
    let cart = this.loadCart();
    return cart.reduce((total, item) => total + (item.cantidad * item.costo), 0);
  }

  // Limpia el carrito
  clearCart(): void {
    localStorage.removeItem(this.cartName);
    this.updateCartItemCount();
  }

  // Actualiza el número de elementos en el carrito
  private updateCartItemCount(): void {
    const itemCount = this.getTotalItemsCount();
    this.cartItemCountSubject.next(itemCount);
  }
  
}
