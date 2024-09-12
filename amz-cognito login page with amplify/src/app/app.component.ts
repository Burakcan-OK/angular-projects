import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  public isAuthenticated: boolean;
  
  constructor(private router: Router, private authorizationService: AuthorizationService) {
    this.isAuthenticated = false;
  }

  
  public ngOnInit(): void {
    this.authorizationService.getAuthenticationStatus().subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
    
    
  }

  public logOut(): void {
    this.authorizationService.logOut()
    .then(() => {
      this.router.navigate(['/logIn']);
      this.isAuthenticated = false
    });
  }
}
