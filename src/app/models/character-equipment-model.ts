import {EquipmentSlot} from "../enums/EquipmentSlot";
import {CharacterModel} from "./character.model";
import {ItemModel} from "./items/item.model";

export interface CharacterEquipmentModel {
  id: number;
  slot: EquipmentSlot;
  character: CharacterModel;
  item: ItemModel | null;
}
