import {userModel} from "./user.model";
import {CharacterStatsModel} from "./character-stats.model";
import {CharacterStorageModel} from "./character-storage-model";

export interface CharacterModel {
  id: number,
  name: string,
  level: number,
  experience: number,

  storage: CharacterStorageModel[];
  stats: CharacterStatsModel
  user: userModel
}
