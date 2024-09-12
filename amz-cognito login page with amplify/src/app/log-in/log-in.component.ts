import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService, IUser } from '../authorization.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loading: boolean;
  user: IUser;
  errorMessage: string = ''; 

  constructor(private router: Router,
              private authorizationService: AuthorizationService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public logIn(): void {
    this.loading = true;
    this.authorizationService.logIn(this.user)
    .then(() => {
      this.router.navigate(['/logOut']);
    }).catch((error) => {
      console.log(error)
      const errorMessageParts = error.message.split(':');
      this.errorMessage = errorMessageParts[0].trim(); 
      this.loading = false;
    });
  }
}
