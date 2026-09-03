import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { BiscuitView } from './biscuit-view/biscuit-view';
import { SingleBiscuit } from './single-biscuit/single-biscuit';
import { EditBiscuit } from './edit-biscuit/edit-biscuit';
import { Ingredients } from './ingredients/ingredients';
import { Panier } from './panier/panier';
import { EditIngredients } from './edit-ingredients/edit-ingredients';
import { UploadRecipe } from './upload-recipe/upload-recipe';
import { PaiementPaypal } from './paiement-paypal/paiement-paypal';

export const routes: Routes = [
    { path: 'biscuits', component: BiscuitView },
    { path: 'biscuits/:id', component: SingleBiscuit },
    { path: 'edit', component: EditBiscuit },
    { path: 'auth', component: Auth },
    { path: 'ingredients', component: Ingredients },
    { path: 'panier', component: Panier },
    { path: 'paiement-paypal', component: PaiementPaypal },
    { path: 'editIngredient', component: EditIngredients },
    { path: 'uploadRecipe', component: UploadRecipe },
    { path: '', component: Auth },
    { path: '**', component: Auth }
];
