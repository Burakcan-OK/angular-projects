import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, AuthorizationService } from '../authorization.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  errorMessage: string = ''; 



  constructor(private router: Router,
              private authorizationService: AuthorizationService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.authorizationService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch((error) => {
      console.log(error)
      const errorMessageParts = error.message.split(':');
      this.errorMessage = errorMessageParts[0].trim(); 
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.authorizationService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signIn']);
    }).catch(() => {
      this.loading = false;
    });
  }
}
