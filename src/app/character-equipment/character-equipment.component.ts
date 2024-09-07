import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {CharacterService} from "../service/character.service";
import {CharacterModel} from "../models/character.model";
import {InventoryItemModel} from "../models/items/inventory-item-model";
import {CharacterApiService} from "../service/character.api.service";
import {CharacterEquipmentModel} from "../models/character-equipment-model";
import {EquipmentSlot, isItemCompatibleWithSlot} from "../enums/EquipmentSlot";

@Component({
  selector: 'app-character-equipment',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    NgIf
  ],
  templateUrl: './character-equipment.component.html',
  styleUrl: './character-equipment.component.scss'
})
export class CharacterEquipmentComponent implements OnInit{

  hoveredItem: InventoryItemModel | undefined; // Store the currently hovered item
  hoveredEquipmentItem: CharacterEquipmentModel | undefined;

  mouseX: number = 0; // Mouse X coordinate
  mouseY: number = 0; // Mouse Y coordinate

  // Store the index of the item being dragged
  draggedIndex: number | null = null;

  character: CharacterModel | null | undefined;

  constructor(private characterService: CharacterService,
              private characterApiService: CharacterApiService) {
  }

  ngOnInit(): void {
    this.character = this.characterService.getCharacter();
    console.log("CHARACTER DATA: ", this.character);

  }

  // Triggered when hovering over an item
  showDetails(inventoryItem: InventoryItemModel) {
    this.hoveredItem = inventoryItem; // Set the hovered item details
  }

  showEquipmentItemDetails(equipmentItem: CharacterEquipmentModel){
    this.hoveredEquipmentItem = equipmentItem;
  }

  hideEquipmentItemDetails(){
    this.hoveredEquipmentItem = undefined;
  }

  // Triggered when mouse leaves the item
  hideDetails() {
    this.hoveredItem = undefined; // Clear the hovered item details
  }

  // Update mouse coordinates dynamically
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX + 15; // Add 15px to the right of the cursor
    this.mouseY = event.clientY + 15; // Add 15px below the cursor
  }


  //drag methods
  onDragStart(event: DragEvent, item: InventoryItemModel, index: number) {
    this.draggedIndex = index; // Store the index of the item being dragged
    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Store item data
    console.log("On item drag start")
    console.log("dragged index: ", this.draggedIndex)
    console.log("dragged item: ", item)

  }

  onEquipmentDragStart(event: DragEvent, item: CharacterEquipmentModel, index: number) {
    this.draggedIndex = index; // Store the index of the item being dragged
    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Store item data
    console.log("On equipment drag start")
    console.log("dragged index: ", this.draggedIndex)
    console.log("dragged item: ", item)

  }


  onDragOver(event: DragEvent) {
    event.preventDefault(); // Allow drop
  }

  onItemDrop(event: DragEvent, index: number) {
    console.log("On item drop")
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const itemData: string | undefined = event.dataTransfer?.getData('text/plain')

      const droppedItem: any = itemData ? JSON.parse(itemData) : null;

      if (droppedItem.slot){
        const equipmentItem: CharacterEquipmentModel = droppedItem;
        console.log("dropped equipment item: ", equipmentItem)
        console.log("draggedIndex: ", this.draggedIndex)
        console.log("Index: ", index)

        this.character!.equipment[this.draggedIndex].item = null
        this.character!.inventory[index].item = equipmentItem.item;


      }else{
        console.log("dropped inventory item")
        // Move the item to the new position
        if (droppedItem && this.character?.inventory) {
          let itemCopy = this.character.inventory[index];

          const newLocation = itemCopy.location;
          const prevLocation = droppedItem.location

          this.character.inventory[index] = droppedItem; // Place item in new spot
          this.character.inventory[index].location = newLocation // swap location
          this.character.inventory[this.draggedIndex] = itemCopy;
          this.character.inventory[this.draggedIndex].location = prevLocation; //swap location
        }
      }

      console.log("inventory: ", this.character?.inventory);

      this.updateCharacter();

      this.draggedIndex = null; // Reset dragged index
    }
  }

  onDropEquipment(event: DragEvent, slot: CharacterEquipmentModel) {
    console.log("on equipment drop")
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const itemData = event.dataTransfer?.getData('text/plain');
      const droppedItem: InventoryItemModel = itemData ? JSON.parse(itemData) : null;

      console.log("Equipment slot: ", slot);
      console.log("Item dropped: ", droppedItem)


      if (droppedItem) {
        // Here you can add logic to equip the item and perhaps clear the slot in inventory

        console.log("dropped item type: " + droppedItem.item?.type + " slot type: " + slot.slot)

        if (isItemCompatibleWithSlot(droppedItem.item!.type, slot.slot)){
          console.log("this item fits this slot")

          slot.item = droppedItem.item;
          const inventoryItem = this.character?.inventory.find(inventoryItem => inventoryItem.id === droppedItem.id);

          if (inventoryItem) {
            // Now you can directly edit the found item
            inventoryItem.item = null
            inventoryItem.quantity = 0
          } else {
            console.log('Item not found in the inventory.');
          }
          console.log("Character: ", this.character)


        }else {
          console.log("item does not fit this spot")
        }

        this.updateCharacter();

        this.draggedIndex = null; // Reset dragged index
      }
    }
  }

  private updateCharacter(){

    // Save the new equipment state to the character
    this.characterApiService.updateCharacter(this.character!).subscribe({
      next: (updatedCharacter) => {
        this.character = updatedCharacter;
        this.characterService.setCharacter(this.character);
      },
      error: (err) => {
        console.log("Something went wrong while trying to update character: ", err);
      },
      complete: () => {
        console.log("Successfully updated character")
      }
    });
  }





}
