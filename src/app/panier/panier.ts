import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ServicePanier, CartItem } from '../services/service-panier';
import { ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './panier.html',
  styleUrl: './panier.scss',
})
export class Panier implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private servicePanier: ServicePanier, private cdr: ChangeDetectorRef, private router: Router) {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  ngOnInit() {
    this.servicePanier.getCartFromServer().subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.servicePanier.setCart(response);
        }
        this.refreshCart();
      },
      error: () => {
        this.refreshCart();
      }
    });
  }

  refreshCart() {
    this.cartItems = this.servicePanier.getCart();
    this.cdr.detectChanges();
  }

  get total() {
    return this.servicePanier.getCartTotal();
  }

  increaseQuantity(item: CartItem) {
    this.servicePanier.addToCart(item);
    this.refreshCart();
  }

  decreaseQuantity(item: CartItem) {
    this.servicePanier.removeFromCart(item.id);
    this.refreshCart();
  }

  removeItem(item: CartItem) {
    this.servicePanier.deleteItem(item.id);
    this.refreshCart();
  }

  clearCart() {
    this.servicePanier.clearCart();
    this.servicePanier.saveCartToServer().subscribe({
      next: () => {
        console.log('Cart cleared on server');
      },
      error: (err) => {
        console.error('Error clearing cart on server:', err);
      }
    });
    this.refreshCart();
  }

  saveCart() {
    this.servicePanier.saveCartToServer().subscribe({
      next: () => {
        alert('Panier enregistré sur le serveur.');
      },
      error: (err) => {
        console.error('Erreur de sauvegarde du panier :', err);
        alert('Impossible d\'enregistrer le panier pour le moment.');
      }
    });
  }

  checkout() {
    this.router.navigate(['/paiement-paypal'], { state: { total: this.total } });
  }
}
