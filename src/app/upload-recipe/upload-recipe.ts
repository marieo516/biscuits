import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-recipe',
  imports: [CommonModule],
  templateUrl: './upload-recipe.html',
  styleUrl: './upload-recipe.scss'
})
export class UploadRecipe implements OnInit {
  message: string = '';
  images: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private http: HttpClient) {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  ngOnInit() {
    this.http.get<string[]>('http://127.0.0.1:8000/backend/display_images.php')
      .subscribe(response => this.images = response);

    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['success']) this.message = 'Image uploadée avec succès!';
      if (params['error']) this.message = `Erreur lors de l'upload.`;

      if (this.message) {
        setTimeout(() => {
          this.message = '';
          this.cdr.detectChanges();
        }, 5000);
      }
    });
  }
}
