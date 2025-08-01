import {EnemyInstanceModel} from "./enemyInstance.model";
import {CharacterModel} from "../character.model";

export interface CombatInstanceModel {
  id: number;
  enemyInstance: EnemyInstanceModel;
  character: CharacterModel
}
