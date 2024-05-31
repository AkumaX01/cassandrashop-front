import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  private cartKey = 'shoppingCart';

  //observable para que se actualice el carrito
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {
    this.loadCart();
    this.cartItemCountSubject.next(this.getTotalItemsCount());
  }

  private cart: any[] = [];

  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  getCart(): any[] {
    return this.cart;
  }

  addToCart(item: any): void {
    //console.log("hola")
    // Busca si el producto ya está en el carrito por su id
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      // Si el producto ya está en el carrito, aumenta su cantidad
      existingItem.cantidad = (existingItem.cantidad || 1) + 1;
    } else {
      // Si el producto no está en el carrito, añádelo con una cantidad de 1
      const newItem = { ...item, cantidad: 1 };
      this.cart.push(newItem);
    }
  
    this.saveCart();
    this.cartItemCountSubject.next(this.getTotalItemsCount());
  }
  

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.saveCart();
    this.cartItemCountSubject.next(this.getTotalItemsCount());
  }

  getTotalItemsCount(): number {
    return this.cart.reduce((total, item) => total + item.cantidad, 0);
  }
  getPrecioTotal(): number {
    return this.cart.reduce((total, item) => total + (item.cantidad * item.costo), 0);
  }
  

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }
}
