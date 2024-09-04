import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CharacterModel} from "../models/character.model";
import {CharacterService} from "../service/character.service";
import {UserService} from "../service/user.service";
import {userModel} from "../models/user.model";
import {NgClass, NgForOf, NgIf} from "@angular/common";

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
  user: userModel | null

  constructor(private characterService: CharacterService,
              private userService: UserService) {
    this.user = this.userService.getUser();
  }


  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(){

    console.log("Loading characters");

    this.characterService.getAllCharacters(this.user?.id!).subscribe({
      next: (characters) => {
        this.characterList = characters;
      },
      error: err => {
        console.log("Something went wrong while trying to load characters: ", err);
      },
      complete: () => {
        console.log("Succesfully loaded characters");
        console.log("Characters");
      }
    })
  }

  createCharacter() {
    console.log("Creating new character");

    this.characterService.createCharacter("zymixon" ,this.user?.id!).subscribe({
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

  createButtonClicked() {
    this.isCreateButtonClicked = true;
  }
  closeModal() {
    this.isCreateButtonClicked = false;
  }
}
