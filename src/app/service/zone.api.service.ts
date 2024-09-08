import { Injectable } from '@angular/core';
import {API_ENDPOINTS} from "../endpoints/api-endpoints";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ZoneModel} from "../models/zone.model";

@Injectable({
  providedIn: 'root'
})
export class ZoneApiService {

  private apiUrl = API_ENDPOINTS.BASE_URL

  constructor(private http: HttpClient) { }

  getAllZones(): Observable<ZoneModel[]> {
    return this.http.get<ZoneModel[]>(`${this.apiUrl}${API_ENDPOINTS.ZONE.GET_ALL}`)
  }
}
