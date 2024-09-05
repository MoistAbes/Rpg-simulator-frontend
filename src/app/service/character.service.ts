import { Injectable } from '@angular/core';
import {CharacterModel} from "../models/character.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private character: CharacterModel | null = null;

  constructor() {
    this.loadCharacterFromLocalStorage();
  }

  setCharacter(character: CharacterModel): void {
    this.character = character;
    localStorage.setItem('character', JSON.stringify(character)); // Save to local storage
  }

  getCharacter(): CharacterModel | null {
    return this.character;
  }

  private loadCharacterFromLocalStorage(): void {
    const characterJson = localStorage.getItem("character")
    if (characterJson){
      this.character = JSON.parse(characterJson);
    }
  }

  cleanCharacter(): void {
    this.character = null;
    localStorage.removeItem("character");
  }
}
