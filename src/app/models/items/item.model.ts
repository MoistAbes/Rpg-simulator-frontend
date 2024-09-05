import {ItemRarity} from "../../enums/ItemRarity";
import {ArmorModel} from "./armor.model";
import {WeaponModel} from "./weapon.model";

export interface ItemModel {
  id: number | undefined;
  name: string;
  description: string;
  dropChance: number;
  value: number
  rarity: ItemRarity;

  armor: ArmorModel;
  weapon: WeaponModel;
}
