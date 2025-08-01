import { Injectable } from '@angular/core';
import {API_ENDPOINTS} from "../endpoints/api-endpoints";
import {HttpClient} from "@angular/common/http";
import {CharacterModel} from "../models/character.model";
import {EnemyInstanceModel} from "../models/combat/enemyInstance.model";
import {Observable} from "rxjs";
import {CombatInstanceModel} from "../models/combat/combatInstance.model";

@Injectable({
  providedIn: 'root'
})
export class CombatApiService {

  private apiUrl = API_ENDPOINTS.BASE_URL

  constructor(private http: HttpClient) { }

  public startCombat(characterId: number, enemyIds: number[]): Observable<CombatInstanceModel> {
    return this.http.post<CombatInstanceModel>(`${this.apiUrl}${API_ENDPOINTS.COMBAT.START(characterId)}`, enemyIds)
  }

  public characterAttacks(combatInstance: CombatInstanceModel): Observable<CombatInstanceModel> {
    return this.http.put<CombatInstanceModel>(`${this.apiUrl}${API_ENDPOINTS.COMBAT.CHARACTER_ATTACK}`, combatInstance)
  }

  public enemyAttacks(combatInstance: CombatInstanceModel): Observable<CombatInstanceModel> {
    return this.http.put<CombatInstanceModel>(`${this.apiUrl}${API_ENDPOINTS.COMBAT.ENEMY_ATTACK}`, combatInstance)
  }
}
