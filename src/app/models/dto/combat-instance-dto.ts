import {EnemyInstanceModel} from "../combat/enemyInstance.model";
import {CharacterModel} from "../character.model";

export interface CombatInstanceModel {
  id: number;
  enemyInstance: EnemyInstanceModel;
  character: CharacterModel
}
