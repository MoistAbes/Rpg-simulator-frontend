import {Component, OnInit} from '@angular/core';
import {CharacterService} from "../service/character.service";
import {CharacterModel} from "../models/character.model";

@Component({
  selector: 'app-character-stats',
  standalone: true,
  imports: [],
  templateUrl: './character-stats.component.html',
  styleUrl: './character-stats.component.css'
})
export class CharacterStatsComponent implements OnInit{

  character: CharacterModel | null | undefined;

  constructor(private characterService: CharacterService) {
  }

  ngOnInit(): void {
    this.character = this.characterService.getCharacter();
    console.log("Loaded character: ", this.character);
  }



}
