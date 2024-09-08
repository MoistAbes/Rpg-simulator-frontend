import {ItemType} from "./ItemType";

export enum EquipmentSlot {
  HEAD = "HEAD",
  TORSO = "TORSO",
  HANDS = "HANDS",
  LEGS = "LEGS",
  FEET = "FEET",
  MAIN_HAND = "MAIN_HAND",
  OFF_HAND = "OFF_HAND"



}

// Helper function to check compatibility
export function isItemCompatibleWithSlot(itemType: ItemType, slot: EquipmentSlot): boolean {

  switch (slot) {
    case EquipmentSlot.MAIN_HAND:
      return itemType === ItemType.WEAPON;
    case EquipmentSlot.OFF_HAND:
      return itemType === ItemType.SHIELD || itemType === ItemType.WEAPON;
    case EquipmentSlot.HEAD:
      return itemType === ItemType.HEAD;
    case EquipmentSlot.TORSO:
      return itemType === ItemType.TORSO;
    case EquipmentSlot.HANDS:
      return itemType === ItemType.HANDS;
    case EquipmentSlot.LEGS:
      return itemType === ItemType.LEGS;
    case EquipmentSlot.FEET:
      return itemType === ItemType.FEET;
    default:
      console.log("default case running")
      return false;
  }


}



