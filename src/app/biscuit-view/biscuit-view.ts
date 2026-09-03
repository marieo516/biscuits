import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Biscuits } from '../biscuits/biscuits';
import { ServiceBiscuit } from '../services/service-biscuit';

@Component({
  selector: 'app-biscuit-view',
  imports: [CommonModule, Biscuits],
  templateUrl: './biscuit-view.html',
  styleUrl: './biscuit-view.scss',
})
export class BiscuitView implements OnInit {
  isLoading = false;
  title = 'Biscuits';
  isAuth = false;

  lastUpdate = new Observable((observer) => {
    window.setInterval(() => {
      observer.next(new Date().toLocaleString("fr-CA"));
    }, 1000);
  });

  biscuits: any;

  constructor(private cdr: ChangeDetectorRef, private service: ServiceBiscuit) {
    setTimeout(
      () => {
        this.isAuth = true;
        this.cdr.detectChanges();
      }, 4000
    );
  };

  get isSaving(): boolean {
    return this.service.isSaving;
  }

  get hasUnsavedChanges(): boolean {
    return this.service.hasUnsavedChanges;
  }

  ngOnInit() {
    if (this.service.isSaving || this.service.hasUnsavedChanges) {
      this.biscuits = this.service.biscuits;
      this.isLoading = false;
      return;
    }

    this.isLoading = true;

    this.service.getBiscuitsFromServer()
      .subscribe((response: any) => {
        this.service.biscuits = response;
        this.biscuits = this.service.biscuits;
        this.isLoading = false;
      });
  }

  allAvailable() {
    if (confirm('Êtes-vous sûr de vouloir cuire tout les biscuits?')) {
      this.service.switchOnAll();
    } else {
      return;
    }
  };

  nothingAvailable() {
    if (confirm('Êtes-vous sûr de ne plus avoir de biscuits cuits?')) {
      this.service.switchOffAll();
    } else {
      return;
    }
  };

  onSave() {
    if (this.isCooking) {
      return;
    }

    this.service.saveBiscuitsToServer()
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.onFetch();
          }, 1000);
        },
        error: (err) => console.error('Erreur:', err)
      });
  }

  onFetch() {
    if (this.service.isSaving || this.service.hasUnsavedChanges) {
      return;
    }

    this.service.getBiscuitsFromServer()
      .subscribe((response: any) => {
        this.service.biscuits = response;
        this.biscuits = this.service.biscuits;
      });;
  }

  get isCooking(): boolean {
    return this.biscuits?.some((b: any) => b.status === 'Dans le four') ?? false;
  }
}
