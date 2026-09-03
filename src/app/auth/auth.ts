import { Component } from '@angular/core';
import { ServiceAuth } from '../services/service-auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  authStatus: boolean = true;
  isSigningIn = false;

  constructor(private service: ServiceAuth,  private router: Router) { }

  ngOnInit() {
    this.authStatus = this.service.isAuth;
  }

  onSignIn() {
    this.isSigningIn = true;

    this.service.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.authStatus = this.service.isAuth;
        this.router.navigate(['biscuits']);
      }
    ).catch((err) => {
      console.error('Erreur:', err);
      this.isSigningIn = false;
    });
  }

  onSignOut() {
    this.service.signOut();
    this.authStatus = this.service.isAuth;
  }
}
