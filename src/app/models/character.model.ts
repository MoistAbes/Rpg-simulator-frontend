import {userModel} from "./user.model";
import {CharacterStatsModel} from "./character-stats.model";
import {InventoryItemModel} from "./items/inventory-item-model";
import {CharacterEquipmentModel} from "./character-equipment-model";

export interface CharacterModel {
  id: number,
  name: string,
  level: number,
  experience: number,

  equipment: CharacterEquipmentModel[]
  inventory: InventoryItemModel[];
  stats: CharacterStatsModel
  user: userModel
}
