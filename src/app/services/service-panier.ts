import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServicePanier {
  private storageKey = 'panier';
  public cartItems: CartItem[] = [];
  public urlPhpCartSave = 'http://127.0.0.1:8000/backend/save_cart.php';
  public urlPhpCartGet = 'http://127.0.0.1:8000/backend/afficher_cart.php';

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart() {
    if (typeof window === 'undefined') {
      this.cartItems = [];
      return;
    }

    const saved = window.localStorage.getItem(this.storageKey);
    this.cartItems = saved ? JSON.parse(saved) : [];
  }

  private saveToLocalStorage() {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  getCart() {
    return this.cartItems.slice();
  }

  setCart(cart: CartItem[]) {
    this.cartItems = cart;
    this.saveToLocalStorage();
  }

  getCartCount() {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  addToCart(ingredient: { id: number; name: string; price: number }) {
    const existing = this.cartItems.find(item => item.id === ingredient.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...ingredient, quantity: 1 });
    }
    this.saveToLocalStorage();
  }

  removeFromCart(id: number) {
    const existing = this.cartItems.find(item => item.id === id);
    if (!existing) {
      return;
    }

    if (existing.quantity > 1) {
      existing.quantity -= 1;
    } else {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    }
    this.saveToLocalStorage();
  }

  deleteItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveToLocalStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.saveToLocalStorage();
  }

  getCartFromServer() {
    console.log('Fetching cart from server...');
    return this.http.get<CartItem[]>(this.urlPhpCartGet);
  }

  saveCartToServer() {
    const body = this.cartItems;
    console.log('Saving cart:', body);
    return this.http.post(this.urlPhpCartSave, body, { responseType: 'text' });
  }
}
