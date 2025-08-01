import {Component, OnDestroy, OnInit} from '@angular/core';
import {ZoneModel} from "../models/zone.model";
import {ActivatedRoute} from "@angular/router";
import {CharacterModel} from "../models/character.model";
import {CharacterService} from "../service/character.service";
import {NgForOf, NgIf} from "@angular/common";
import {EnemyModel} from "../models/enemy.model";
import {EnemyInstanceModel} from "../models/combat/enemyInstance.model";
import {EnemyInstanceApiService} from "../service/enemy-instance.api.service";
import {CombatInstanceModel} from "../models/combat/combatInstance.model";
import {CombatApiService} from "../service/combat.api.service";
import {CombatInstanceService} from "../service/combat-instance.service";

@Component({
  selector: 'app-zone-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './zone-page.component.html',
  styleUrl: './zone-page.component.scss'
})
export class ZonePageComponent implements OnInit, OnDestroy{

  isStartClicked: boolean = false;
  isPlayerTurn: boolean = true;
  // enemyInstance: EnemyInstanceModel | undefined;
  combatInstance: CombatInstanceModel | undefined;

  //damage dealt
  damage: number = 0;

  //timer
  private combatTimer: any; // To store the interval reference

  zone: ZoneModel | undefined;
  character: CharacterModel | null | undefined;

  constructor(private characterService: CharacterService,
              private combatInstanceService: CombatInstanceService,
              private combatApiService: CombatApiService) {
  }

  ngOnInit(): void {
    this.zone = history.state.zone;
    this.character = this.characterService.getCharacter()
    console.log("Passed zone: ", this.zone);
    console.log("Character: ", this.character)
  }


  getHealthPercentage(health: any, maxHealth: any) {
    return this.characterService.getHealthPercentage(health, maxHealth);
  }

  onStartClicked() {
    this.isStartClicked = true;

    this.startCombat()

  }
  onStopClicked() {
    this.isStartClicked = false;
    this.endCombat();

  }

  startCombat() {
    if (this.zone) {

      this.getCombatInstance();

      // const enemyIds: number[] = this.zone.enemyList.map(enemy => enemy.id);

      // this.combatInstanceService.create(this.character!.id, enemyIds).subscribe({
      //     next: (combatInstance) => {
      //       this.combatInstance = combatInstance
      //       this.startAutomaticCombat(); // Start automatic combat
      //     },
      //     error: (err) => {
      //       console.log("error while trying to generate combat instance: ", err)
      //     },
      //     complete: () => {
      //       console.log("pomyslnie stworzone combat instance")
      //     }
      // })

    }else {
      console.log("zone is undefined");
    }
  }

  startAutomaticCombat() {
    // Start a timer that triggers every 1 second
    this.combatTimer = setInterval(() => {
      this.runCombatTurn();
    }, 1000); // 1000 ms = 1 second
  }

  runCombatTurn() {
    // Your combat logic here
    console.log("Running a combat turn...");

    console.log("Combat instance: ", this.combatInstance)


    if (this.isPlayerTurn){
      this.combatApiService.characterAttacks(this.combatInstance!).subscribe({
        next: (combatInstance) => {
          //calculate dmg dealt
          this.damage = combatInstance.enemyInstance.currentHealth - this.combatInstance!.enemyInstance.currentHealth
          this.combatInstance = combatInstance
          this.isPlayerTurn = false;
        },
        error: (err) => {
          console.log("error while trying to generate combat instance: ", err)
        },
        complete: () => {
          console.log("pomyslnie stworzone combat instance")
        }
      })
    }else {
      //is enemy turn
      this.combatApiService.enemyAttacks(this.combatInstance!).subscribe({
        next: (combatInstance) => {
          //calculate dmg dealt
          this.damage = combatInstance.character.stats.currentHealth - this.combatInstance!.character.stats.currentHealth
          this.combatInstance = combatInstance
          this.isPlayerTurn = true;
        },
        error: (err) => {
          console.log("error while trying to generate combat instance: ", err)
        },
        complete: () => {
          console.log("pomyslnie stworzone combat instance")
        }
      })
    }



    // Example: check if the combat is over
    if (this.isCombatOver()) {
      this.endCombat();
    }
  }

  isCombatOver(): boolean {
    // Check if either the character or the enemy is dead, for example
    return this.combatInstance!.enemyInstance.currentHealth <= 0 || this.combatInstance!.character.stats.currentHealth <= 0;
  }

  endCombat() {
    // Stop the timer when the combat ends
    if (this.combatTimer) {
      clearInterval(this.combatTimer);
      this.combatTimer = null; // Clear the reference
    }
    console.log("Combat has ended.");
  }

  // Optional: clear the interval when the component is destroyed to avoid memory leaks
  ngOnDestroy() {
    if (this.combatTimer) {
      clearInterval(this.combatTimer);
    }
  }

  getCombatInstance() {
    //check if charactes has combat instance
    this.combatInstanceService.getByCharacterId(this.character!.id).subscribe({
      next: (combatInstance) => {
        if (combatInstance == undefined){
          this.createCombatInstance();
        }else {
          this.combatInstance = combatInstance
          this.startAutomaticCombat();
        }
      },
      error: (err) => {
        console.log("error while trying to generate combat instance: ", err)
      },
      complete: () => {
        console.log("pomyslnie stworzone combat instance")
      }
    })
  }

  createCombatInstance() {
    const enemyIds: number[] = this.zone!.enemyList.map(enemy => enemy.id);

    this.combatInstanceService.create(this.character!.id, enemyIds).subscribe({
      next: (combatInstance) => {
          this.combatInstance = combatInstance
        this.startAutomaticCombat()
      },
      error: (err) => {
        console.log("error while trying to generate combat instance: ", err)
      },
      complete: () => {
        console.log("pomyslnie stworzone combat instance")
      }
    })
  }



}
