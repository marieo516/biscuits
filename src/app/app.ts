import { Component } from '@angular/core';
import { Title } from './title/title';
import { Name } from './name/name';
import { Coordinates } from './coordinates/coordinates';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { ServiceAuth } from './services/service-auth'
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, Title, Name, Coordinates, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
    constructor(private service: ServiceAuth, private http:HttpClient) {}

    get isAuth(): boolean {
        return this.service.isAuth;
    }
}