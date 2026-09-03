import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ServiceIngredients {
  public urlPhp : string = "http://127.0.0.1:8000/backend/inserer_ingredient.php";
  public urlPhpGet : string = "http://127.0.0.1:8000/backend/afficher_ingredient.php";

  ingredients: {id: number, name: string, price: number}[] = [];

  constructor(private http: HttpClient) { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(name: string, price: number) {
    const ingredientObject = {
      id: this.ingredients.length > 0 ? this.ingredients[this.ingredients.length - 1].id + 1 : 1,
      name: name,
      price: price
    };

    this.ingredients.push(ingredientObject);
  }

  saveIngredientsToServer() {
    const body = this.ingredients;
    console.log('Saving ingredients:', body);
    return this.http.put(this.urlPhp, body, { responseType: 'text' });
  }

  getIngredientsFromServer() {
    console.log('Fetching ingredients from server...');
    return this.http.get(this.urlPhpGet);
  }
}
