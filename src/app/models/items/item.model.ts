import {ItemRarity} from "../../enums/ItemRarity";
import {ArmorModel} from "./armor.model";
import {WeaponModel} from "./weapon.model";
import {ItemType} from "../../enums/ItemType";

export interface ItemModel {
  id: number | undefined;
  name: string;
  description: string;
  dropChance: number;
  value: number
  rarity: ItemRarity;
  type: ItemType;
  icon: string;

  armor: ArmorModel;
  weapon: WeaponModel;
}
