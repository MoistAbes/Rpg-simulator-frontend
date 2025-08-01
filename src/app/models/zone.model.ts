import {EnemyModel} from "./enemy.model";

export interface ZoneModel {
  id: number;
  name: string;
  description: string
  enemyList: EnemyModel[];
}
