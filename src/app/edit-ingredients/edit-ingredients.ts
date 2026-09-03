import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ServiceIngredients } from '../services/service-ingredients';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-ingredients',
  imports: [FormsModule],
  templateUrl: './edit-ingredients.html',
  styleUrl: './edit-ingredients.scss',
})

export class EditIngredients {
  isSaving = false;

  constructor(
    private ingredientService: ServiceIngredients,
    private route: ActivatedRoute,
    private router2: Router,
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  onSubmit(form: NgForm) {
    this.isSaving = true;
    const name = form.value['name'];
    const price = parseFloat(form.value['price']);

    this.ingredientService.getIngredientsFromServer()
      .subscribe((response: any) => {
        this.ingredientService.ingredients = response;
        this.ingredientService.addIngredient(name, price);
        this.ingredientService.saveIngredientsToServer().subscribe({
          next: () => {
            setTimeout(() => {
              this.router2.navigate(['/ingredients']);
            }, 3000);
          },
          error: (err) => {
            console.error('Erreur:', err);
            this.isSaving = false;
          }
        });
      });
  }
}
