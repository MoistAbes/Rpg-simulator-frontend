import { Component } from '@angular/core';
import {LoginService} from "../service/login.service";
import {FormsModule} from "@angular/forms";
import {userModel} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';

  user: userModel | undefined

  constructor(private loginService: LoginService,
              private router: Router,
              private userService: UserService) {
  }


  loginUser() {
    this.loginService.loginUser(this.username, this.password).subscribe({
      next: (response) => {
      this.user = response;
    },
      error: error => {
        console.log("Something went wrong with trying to log in: ", error)
      },
      complete: () => {

        if (this.user != undefined){
          console.log("Log in successful")
          console.log("Welcome: ", this.user.username)
          // Use navigate with then() to handle navigation success
          this.router.navigate(["/character-selection"]).then(success => {
            if (success) {
              console.log("Navigation successful to /character-selection");
              this.userService.setUser(this.user!);
              console.log("Saved user: ", this.userService.getUser())
            } else {
              console.log("Navigation failed");
            }
          });
        }else {
          console.log("Username or password incorrect")
        }
      }
    })
  }
}
