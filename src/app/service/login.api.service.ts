import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {API_ENDPOINTS} from "../endpoints/api-endpoints";
import {userModel} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  private apiUrl = API_ENDPOINTS.BASE_URL; // Use the base URL from the config

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string): Observable<userModel> {
    return this.http.get<userModel>(`${this.apiUrl}${API_ENDPOINTS.USER.LOGIN(username, password)}`)
  }
}
