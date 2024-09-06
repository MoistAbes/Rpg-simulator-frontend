import { Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {CharacterSelectionPageComponent} from "./character-selection-page/character-selection-page.component";
import {CharacterDashboardComponent} from "./character-dashboard/character-dashboard.component";
import {CharacterStatsComponent} from "./character-stats/character-stats.component";
import {CharacterEquipmentComponent} from "./character-equipment/character-equipment.component";

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },  // Route for the login page
  { path: 'register', component: RegisterPageComponent },  // Route for the login page
  { path: 'home', component: HomePageComponent },  // Route for the login page
  {path: 'character-selection', component: CharacterSelectionPageComponent},
  {path: 'character-dashboard', component: CharacterDashboardComponent},
  {path: 'character-stats', component: CharacterStatsComponent},
  {path: 'character-equipment', component: CharacterEquipmentComponent},




  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirect the root path to the login page
  { path: '**', redirectTo: 'login' }  // Wildcard route to handle unknown routes
];
