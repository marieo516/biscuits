import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ServiceBiscuit } from '../services/service-biscuit';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-biscuit',
  imports: [FormsModule],
  templateUrl: './edit-biscuit.html',
  styleUrl: './edit-biscuit.scss',
})

export class EditBiscuit {
  defaultOnOff = 'Cru';
  isSaving = false;

  constructor(private biscuitService: ServiceBiscuit, private route: ActivatedRoute, private router2: Router) { }

  onSubmit(form: NgForm) {
    this.isSaving = true;
    
    if (this.biscuitService.biscuits.some((b: any) => b.status === 'Dans le four')) {
      alert(`Un biscuit est en train de cuire, veuillez attendre avant d'ajouter un nouveau biscuit.`);
      this.isSaving = false;
      return;
    }

    const name = form.value['name'];
    const status = form.value['status'];

    this.biscuitService.getBiscuitsFromServer()
      .subscribe((response: any) => {
        this.biscuitService.biscuits = response;
        this.biscuitService.addBiscuit(name, status);
        this.biscuitService.saveBiscuitsToServer().subscribe({
          next: () => {
            setTimeout(() => {
              this.isSaving = false;
              this.router2.navigate(['/biscuits']);
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
