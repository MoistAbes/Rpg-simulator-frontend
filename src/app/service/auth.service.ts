import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null); // Holds user data
  user$ = this.userSubject.asObservable(); // Observable to subscribe to

  constructor() {
    // Initialize with user data from local storage if available
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.userSubject.value; // Returns true if user data exists
  }

  // Function to log in the user
  login(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
    this.userSubject.next(userData); // Emit the new user data
  }

  // Function to log out the user
  logout(): void {
    localStorage.removeItem('user'); // Remove user data from localStorage
    this.userSubject.next(null); // Emit null to indicate logout
  }

  // Get user info
  getUserInfo(): any {
    return this.userSubject.value; // Returns current user data
  }

  // Add this method to set the user
  setUser(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
    this.userSubject.next(userData);
  }
}
