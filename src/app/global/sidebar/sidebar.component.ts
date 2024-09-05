import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

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

}
