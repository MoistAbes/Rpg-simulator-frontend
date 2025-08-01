import {EnemyModel} from "../enemy.model";

export interface EnemyInstanceModel {
  id: number;
  enemy: EnemyModel;

  currentHealth: number
  currentDefense: number
  currentAttack: number
}
