import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword, User, updateProfile } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth)
  public authState$ = new BehaviorSubject<User | null>(null);


  constructor() {
    onAuthStateChanged(this.auth, user => this.authState$.next(user));

  }

  async signup(email: string, name:string,password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    if(userCredential.user){
      await updateProfile(userCredential.user, {
        displayName: name,
        
      });
    }
    await userCredential.user.reload(); 


    return userCredential;
    }



  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);

  }

  async logout() {
    return await this.auth.signOut();
  }

 
}
