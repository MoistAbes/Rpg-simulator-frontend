import {ItemType} from "./ItemType";

export enum EquipmentSlot {
  HEAD = "Head",
  TORSO = "TORSO",
  ARMS = "Arms",
  LEGS = "Legs",
  MAIN_HAND = "MAIN_HAND",
  OFF_HAND = "Off hand"



}

// Helper function to check compatibility
export function isItemCompatibleWithSlot(itemType: ItemType, slot: EquipmentSlot): boolean {

  switch (slot) {
    case EquipmentSlot.MAIN_HAND:
      console.log('case main hand')
      return itemType === ItemType.WEAPON;
    // case EquipmentSlot.OFF_HAND:
    //   return itemType === ItemType.SHIELD || itemType === ItemType.WEAPON;
    // case EquipmentSlot.HEAD:
    //   return itemType === ItemType.HELMET;
    case EquipmentSlot.TORSO:
      return itemType === ItemType.ARMOR;
    // case EquipmentSlot.ARMS:
    //   return itemType === ItemType.GLOVES;
    // case EquipmentSlot.LEGS:
    //   return itemType === ItemType.LEGS;
    default:
      console.log("default case running")
      return false;
  }


}



