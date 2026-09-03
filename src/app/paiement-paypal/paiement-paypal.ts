import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ServicePanier } from '../services/service-panier';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

declare var paypal: any;

@Component({
  selector: 'app-paiement-paypal',
  imports: [CommonModule, CurrencyPipe, HttpClientModule],
  templateUrl: './paiement-paypal.html',
  styleUrl: './paiement-paypal.scss',
})
export class PaiementPaypal implements OnInit, AfterViewInit {
  montant: number = 0;
  transport: number = 10;
  tps: number = 0;
  tvq: number = 0;
  total: number = 0;

  constructor(
    private servicePanier: ServicePanier,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Check if total was passed via router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['total']) {
      this.montant = navigation.extras.state['total'];
    } else {
      // Fallback: calculate from cart service
      this.montant = this.servicePanier.getCartTotal();
    }

    this.tps = Math.round(this.montant * 0.05 * 100) / 100;
    this.tvq = Math.round(this.montant * 0.09975 * 100) / 100;
    this.total = Math.round((this.montant + this.transport + this.tps + this.tvq) * 100) / 100;
  }

  ngAfterViewInit() {
    this.loadPayPalSDK();
  }

  loadPayPalSDK() {
    if (typeof paypal !== 'undefined') {
      this.initPayPalButton();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=xxxxxx&enable-funding=venmo&currency=CAD';
    script.onload = () => this.initPayPalButton();
    document.head.appendChild(script);
  }

  initPayPalButton() {
    if (typeof paypal !== 'undefined') {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal',
        },

        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "CAD",
                value: this.total.toFixed(2),
                breakdown: {
                  item_total: { currency_code: "CAD", value: this.montant.toFixed(2) },
                  shipping: { currency_code: "CAD", value: this.transport.toFixed(2) },
                  tax_total: { currency_code: "CAD", value: (this.tps + this.tvq).toFixed(2) }
                }
              }
            }]
          });
        },

        onApprove: (data: any, actions: any) => {
          const container = document.getElementById('smart-button-container');
          if (container) {
            container.innerHTML =
              '<div class="alert alert-success text-center mt-3" role="alert">' +
              '<h4 class="alert-heading">Paiement accepté</h4>' +
              '<p class="mb-0">La commande a été effectuée avec succès! Les ingrédients seront bientôt livrés.</p>' +
              '</div>';
          }

          this.http.post('http://127.0.0.1:8000/backend/clear_cart.php', {}).subscribe({
            next: () => {
              this.servicePanier.clearCart();
            },
            error: (err) => {
              console.error('Error clearing cart:', err);
            }
          });
        },

        onError: (err: any) => {
          console.log(err);
        }

      }).render('#paypal-button-container');
    }
  }
}
