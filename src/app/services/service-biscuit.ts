import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Injectable()

export class ServiceBiscuit {
  isSaving = false;
  hasUnsavedChanges = false;
  biscuitSubject = new Subject<any[]>();

  public urlPhp : string = "http://127.0.0.1:8000/backend/inserer_angular66.php";
  public urlPhpGet : string = "http://127.0.0.1:8000/backend/afficher_angular.php";
  public urlPhpDel : string = "http://127.0.0.1:8000/backend/destruction_angular.php";

  statusRaw = 'Cru';
  statusBaking = 'Dans le four';
  statusBaked = 'Cuit';

  biscuits: {id: number, name: string, status: string, bakingtime: number}[] = [];
  biscuitToDelete: any = null;

  constructor(private router: Router, private http: HttpClient) { }

  randomNumber(): number {
    const numbers = [10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
    return numbers[Math.floor(Math.random() * numbers.length)];
  }

  getBiscuitById(id: number) {
    const biscuit = this.biscuits.find((biscuitObject) => {
      return biscuitObject.id === id;
    });
    return biscuit;
  }

  switchOnAll() {
    this.isSaving = true;
    this.hasUnsavedChanges = true;

    for (let biscuit of this.biscuits) {
      if (biscuit.status === this.statusRaw) {
        biscuit.status = this.statusBaking;

        const cookTime = biscuit.bakingtime;

        setTimeout(() => {
          biscuit.status = this.statusBaked;
          this.hasUnsavedChanges = true;
          this.updateSavingStatus();
        }, cookTime);
      }
    }

    this.updateSavingStatus();
  }

  switchOffAll() {
    for (let biscuit of this.biscuits) {
      biscuit.status = this.statusRaw;
    }

    this.hasUnsavedChanges = true;
  }

  switchOnOne(index: number) {
    this.isSaving = true;
    this.hasUnsavedChanges = true;
    this.biscuits[index].status = this.statusBaking;

    const cookTime = this.biscuits[index].bakingtime;
    setTimeout(() => {
      this.biscuits[index].status = this.statusBaked;
      this.hasUnsavedChanges = true;
      this.updateSavingStatus();
    }, cookTime);
  }

  switchOffOne(index: number) {
    this.biscuits[index].status = this.statusRaw;
    this.hasUnsavedChanges = true;
  }

  addBiscuit(name: string, status: string) {
    const biscuitObject = {
      id: this.biscuits.length > 0 ? this.biscuits[this.biscuits.length - 1].id + 1 : 1,
      name: name,
      status: status,
      bakingtime: Number(this.randomNumber())
    };
    
    this.biscuits.push(biscuitObject);
  }

  deleteBiscuit(id: number) {
    return this.http.post(this.urlPhpDel, { id }, { responseType: 'text' });
  }

  saveBiscuitsToServer() {
    if (this.biscuits.some((biscuit) => biscuit.status === this.statusBaking)) {
      return throwError(() => new Error('Impossible de sauvegarder pendant la cuisson de biscuits.'));
    }

    const body = this.biscuits;
    console.log('Saving:', body);
    return this.http.put(this.urlPhp, body, { responseType: 'text' }).pipe(
      tap(() => {
        this.hasUnsavedChanges = false;
      })
    );
  }

  getBiscuitsFromServer() {
    console.log('Fetching biscuits from server...');
    return this.http.get<any[]>(this.urlPhpGet).pipe(
      map((biscuits) => this.normalizeFetchedBiscuits(biscuits))
    );
  }

  private updateSavingStatus() {
    this.isSaving = this.biscuits.some((biscuit) => biscuit.status === this.statusBaking);
  }

  private normalizeFetchedBiscuits(biscuits: {id: number, name: string, status: string, bakingtime: number}[]) {
    let correctedBakingStatus = false;

    const normalizedBiscuits = biscuits.map((biscuit) => {
      if (biscuit.status === this.statusBaking) {
        correctedBakingStatus = true;
        return {
          ...biscuit,
          status: this.statusBaked
        };
      }

      return biscuit;
    });

    if (correctedBakingStatus) {
      this.hasUnsavedChanges = true;
    }

    return normalizedBiscuits;
  }
}
