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
    this.sortItemsByLocation()
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

  sortItemsByLocation() {
    if (this.character?.inventory) {
      this.character.inventory.sort((a, b) => a.location - b.location);
    }
  }

  // Function to calculate health percentage
  getHealthPercentage(health: number, maxHealth: number): number {
    if (!health || !maxHealth) {
      return 0;
    }
    return (health / maxHealth) * 100;
  }
}
