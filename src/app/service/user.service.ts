import { Injectable } from '@angular/core';
import {userModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: userModel | null = null; // In-memory storage for the user

  constructor() {
    this.loadUserFromLocalStorage(); // Load user from local storage on service initialization
  }

  // Store user in memory and local storage
  setUser(user: userModel): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user)); // Save to local storage
  }

  // Get user from memory
  getUser(): userModel | null {
    return this.user;
  }

  // Load user from local storage
  private loadUserFromLocalStorage(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
    }
  }

  // Clear user from memory and local storage (e.g., on logout)
  clearUser(): void {
    this.user = null;
    localStorage.removeItem('user'); // Remove from local storage
  }
}
