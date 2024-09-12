import { Component } from '@angular/core';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent {

  username!: ''

  constructor(private authorizationService: AuthorizationService) {
}

  public ngOnInit(): void {
    const email = this.authorizationService.userInfo
    this.username = email
    
  }

}
