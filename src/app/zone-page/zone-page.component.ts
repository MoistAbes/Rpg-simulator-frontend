import {Component, OnInit} from '@angular/core';
import {ZoneModel} from "../models/zone.model";
import {ActivatedRoute} from "@angular/router";
import {CharacterModel} from "../models/character.model";
import {CharacterService} from "../service/character.service";

@Component({
  selector: 'app-zone-page',
  standalone: true,
  imports: [],
  templateUrl: './zone-page.component.html',
  styleUrl: './zone-page.component.scss'
})
export class ZonePageComponent implements OnInit{

  zone: ZoneModel | undefined;
  character: CharacterModel | null | undefined;

  constructor(private characterService: CharacterService) {
  }

  ngOnInit(): void {
    this.zone = history.state.zone;
    this.character = this.characterService.getCharacter()
    console.log("Passed zone: ", this.zone);
    console.log("Character: ", this.character)
  }


  getHealthPercentage(health: any, maxHealth: any) {
    return  this.characterService.getHealthPercentage(health, maxHealth);
  }
}
