import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CharacterModel} from "../models/character.model";
import {CharacterApiService} from "../service/character.api.service";
import {UserService} from "../service/user.service";
import {userModel} from "../models/user.model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {CharacterService} from "../service/character.service";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-character-selection-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './character-selection-page.component.html',
  styleUrl: './character-selection-page.component.scss'
})
export class CharacterSelectionPageComponent implements OnInit{

  isCreateButtonClicked: boolean = false;


  characterList: CharacterModel[] = [];
  characterName: string = '';

  user: userModel | undefined;

  constructor(private characterApiService: CharacterApiService,
              private authService: AuthService,
              private characterService: CharacterService,
              private router: Router) {
    this.user = this.authService.getUserInfo();
  }


  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(){

    console.log("Loading characters");

    this.characterApiService.getAllCharacters(this.user!.id).subscribe({
      next: (characters) => {
        this.characterList = characters;
      },
      error: err => {
        console.log("Something went wrong while trying to load characters: ", err);
      },
      complete: () => {
        console.log("Succesfully loaded characters");
        console.log("Characters");
        console.log(this.characterList)
      }
    })
  }

  createCharacter() {
    console.log("Creating new character");

    this.characterApiService.createCharacter(this.characterName ,this.user?.id!).subscribe({
      next: (character) => {
        console.log("Created character: ", character)
        this.characterList.push(character);
      },
      error: err => {
        console.log("Something went wrong while creating new character: ", err);
      },
      complete: () => {
        console.log("Succesfully created new character");
      }
    })
  }

  playButtonClicked(character: CharacterModel) {
    //move to dashboard
    // Use navigate with then() to handle navigation success
    this.characterService.setCharacter(character);

    this.router.navigate(["/character-dashboard"]).then(success => {
      if (success) {
        console.log("Navigation successful to /character-dashboard");
      } else {
        console.log("Navigation failed");
      }
    });

  }
}
