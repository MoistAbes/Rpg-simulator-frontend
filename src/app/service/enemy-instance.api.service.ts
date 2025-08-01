import { Injectable } from '@angular/core';
import {API_ENDPOINTS} from "../endpoints/api-endpoints";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnemyInstanceModel} from "../models/combat/enemyInstance.model";

@Injectable({
  providedIn: 'root'
})
export class EnemyInstanceApiService {

  private apiUrl = API_ENDPOINTS.BASE_URL

  constructor(private http: HttpClient) { }

  getRandomEnemyInstance(enemyIds: number[]): Observable<EnemyInstanceModel> {
    return this.http.post<EnemyInstanceModel>(`${this.apiUrl}${API_ENDPOINTS.ENEMY_INSTANCE.GET_RANDOM}`, enemyIds)
  }


}
