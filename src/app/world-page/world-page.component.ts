import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ZoneApiService} from "../service/zone.api.service";
import {ZoneModel} from "../models/zone.model";

@Component({
  selector: 'app-world-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './world-page.component.html',
  styleUrl: './world-page.component.scss'
})
export class WorldPageComponent implements OnInit{

  zoneList: ZoneModel[] = []

  constructor(private zoneApiService: ZoneApiService) {
  }

  ngOnInit(): void {
    this.loadZones();
  }


  loadZones() {
    this.zoneApiService.getAllZones().subscribe({
      next: value => {
        console.log("zones: ", value);
        this.zoneList = value;
      },
      error: err => {
        console.log("Something went wrong with loading all zones: ", err)
      },
      complete: () => {
        console.log("Succesfully loaded all zones");
      }
    })
  }






}
