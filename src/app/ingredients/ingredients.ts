import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceIngredients } from '../services/service-ingredients';
import { ServicePanier } from '../services/service-panier';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  imports: [CommonModule, RouterModule],
  templateUrl: './ingredients.html',
  styleUrl: './ingredients.scss',
})
export class Ingredients implements OnInit {
  ingredients: { id: number, name: string, price: number }[] = [];
  isLoading = false;

  constructor(
    private service: ServiceIngredients,
    private servicePanier: ServicePanier,
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 3500);
  }

  ngOnInit() {
    this.service.getIngredientsFromServer()
      .subscribe((response: any) => {
        this.ingredients = response;
        this.cdr.detectChanges();
      });
  }

  addToPanier(ingredient: { id: number, name: string, price: number }) {
    this.servicePanier.addToCart(ingredient);
  }

  get cartCount() {
    return this.servicePanier.getCartCount();
  }
}
