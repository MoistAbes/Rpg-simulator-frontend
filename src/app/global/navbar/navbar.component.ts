import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../service/user.service";
import {CharacterService} from "../../service/character.service";
import {userModel} from "../../models/user.model";
import {CharacterModel} from "../../models/character.model";
import {AuthService} from "../../service/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  userInfo: any = null; // To hold user info

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to user$ observable to get updates
    this.authService.user$.subscribe(user => {
      this.userInfo = user; // Update userInfo whenever it changes
    });
  }

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Function to log out the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

}
