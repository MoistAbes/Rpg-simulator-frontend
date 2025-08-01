import { Injectable } from '@angular/core';
import {API_ENDPOINTS} from "../endpoints/api-endpoints";
import {HttpClient} from "@angular/common/http";
import {CombatInstanceModel} from "../models/combat/combatInstance.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CombatInstanceService {

  private apiUrl = API_ENDPOINTS.BASE_URL


  constructor(private http: HttpClient) { }

  public getByCharacterId(characterId: number): Observable<CombatInstanceModel> {
    return this.http.get<CombatInstanceModel>(`${this.apiUrl}${API_ENDPOINTS.COMBAT_INSTANCE.GET_BY_CHARACTER_ID(characterId)}`)
  }

  public create(characterId: number, enemyIds: number[]): Observable<CombatInstanceModel> {
    return this.http.post<CombatInstanceModel>(`${this.apiUrl}${API_ENDPOINTS.COMBAT_INSTANCE.CREATE(characterId)}`, enemyIds)
  }

  public clean(instanceId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${API_ENDPOINTS.COMBAT_INSTANCE.CLEAN(instanceId)}`, {})
  }

}
