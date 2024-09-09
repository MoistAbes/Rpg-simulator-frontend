import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ZoneApiService} from "../service/zone.api.service";
import {ZoneModel} from "../models/zone.model";
import {Router} from "@angular/router";

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

  constructor(private zoneApiService: ZoneApiService,
              private router: Router) {
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


  enterZone(zone: ZoneModel) {
    this.router.navigate(["world/zone"], { state: { zone } });  }
}
