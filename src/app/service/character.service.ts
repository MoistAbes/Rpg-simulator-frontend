import { Injectable } from '@angular/core';
import {API_ENDPOINTS} from "../endpoints/api-endpoints";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CharacterModel} from "../models/character.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = API_ENDPOINTS.BASE_URL; // Use the base URL from the config


  constructor(private http: HttpClient) { }

  public getAllCharacters(userId: number): Observable<CharacterModel[]> {
    return this.http.get<CharacterModel[]>(`${this.apiUrl}${API_ENDPOINTS.CHARACTER.GET_ALL(userId)}`)
  }

  public createCharacter(username: string,userId: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${this.apiUrl}${API_ENDPOINTS.CHARACTER.CREATE(username ,userId)}`)
  }

}
