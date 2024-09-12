import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Amplify} from 'aws-amplify'
import { signIn, signUp, signOut, confirmSignUp, getCurrentUser } from 'aws-amplify/auth';

export interface IUser {
    email: string;
    password: string;
    showPassword: boolean;
    code: string;
  }
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthorizationService {
  
    public authenticationSubject: BehaviorSubject<any>;
    userInfo!: '';
  
    constructor() {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: 'user-pool-id',
            userPoolClientId: 'user-pool-client-id',
            identityPoolId: "<identity-pool-id>",
            loginWith: {
              email: true,
            },
            signUpVerificationMethod: "code",
            userAttributes: {
              email: {
                required: true,
              },
            },
            allowGuestAccess: true,
            passwordFormat: {
              minLength: 8,
              requireLowercase: true,
              requireUppercase: true,
              requireNumbers: true,
              requireSpecialCharacters: true,
            },
          },
        },
      })
  
      this.authenticationSubject = new BehaviorSubject<boolean>(false);
    }

    public getAuthenticationStatus() {
      return this.authenticationSubject.asObservable();
    }
  
    public signUp(user: IUser): Promise<any> {
      return signUp({
        username: user.email,
        password: user.password,
      });
    }
  
    public confirmSignUp(user: IUser): Promise<any> {
      return confirmSignUp({
        username: user.email, 
        confirmationCode: user.code
      });
    }
  
    public logIn(user: IUser): Promise<any> {
      return signIn({
        username:user.email, 
        password: user.password
      })
      .then(() => {
        this.authenticationSubject.next(true);
        this.getUser().then((user:any) =>{
          const loginId =user.signInDetails.loginId
          this.userInfo =loginId
        })
      });
      
    }
  
    public logOut(): Promise<any> {
      return signOut()
      .then(() => {
        this.authenticationSubject.next(false);
      });
    }
  
    public isAuthenticated(): Promise<boolean> {
      if (this.authenticationSubject.value) {
        return Promise.resolve(true);
      } else {
        return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
      }
    }
  
    public getUser(): Promise<any> {
      return getCurrentUser();
    }
  
  }
  