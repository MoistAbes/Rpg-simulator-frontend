import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
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
    NgIf,
    NgOptimizedImage
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
  onItemDragStart(event: DragEvent, item: InventoryItemModel, index: number) {
    this.draggedIndex = index; // Store the index of the item being dragged
    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Store item data
    console.log("On item drag start")
    // console.log("dragged index: ", this.draggedIndex)
    // console.log("dragged item: ", item)

  }
  onItemDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const itemData: string | undefined = event.dataTransfer?.getData('text/plain')
      const droppedItem: any = itemData ? JSON.parse(itemData) : null;


      if (droppedItem.slot){
        console.log("this is equipment item")
        const equipmentItem: CharacterEquipmentModel = droppedItem;

        this.character!.equipment[this.draggedIndex].item = null
        this.character!.inventory[index].item = equipmentItem.item;


      }else{
        console.log("this is inventory item")
        const inventoryItem: InventoryItemModel = droppedItem;

        // Move the item to the new position
          let itemCopy: InventoryItemModel = this.character!.inventory[index];

          this.character!.inventory[index] = inventoryItem; // Place item in new spot
        const tempLocation = this.character!.inventory[index].location
        this.character!.inventory[index].location = itemCopy.location
          this.character!.inventory[this.draggedIndex] = itemCopy;
        this.character!.inventory[this.draggedIndex].location = tempLocation

      }

      this.updateCharacter();
      this.draggedIndex = null; // Reset dragged index
    }
  }

  onEquipmentDragStart(event: DragEvent, item: CharacterEquipmentModel, index: number) {
    this.draggedIndex = index; // Store the index of the item being dragged
    event.dataTransfer?.setData('text/plain', JSON.stringify(item)); // Store item data
    console.log("On equipment drag start")
    // console.log("dragged index: ", this.draggedIndex)
    // console.log("dragged item: ", item)

  }

  onDropEquipment(event: DragEvent, equipmentSlot: CharacterEquipmentModel, dropIndex: number) {
    console.log("on equipment drop")
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const itemData = event.dataTransfer?.getData('text/plain');
      const droppedItem: any = itemData ? JSON.parse(itemData) : null;


      //check if item fits equipment slot
      if (isItemCompatibleWithSlot(droppedItem.item!.type, equipmentSlot.slot)){
        console.log("this item fits this slot")
        //checks if its equipment slot
        if (droppedItem.slot){
          console.log("dropping equipment item")
          const equipmentItem: CharacterEquipmentModel = droppedItem;

          //checks if items are not the same
          if(equipmentSlot.id !== droppedItem.id){

            //add item to slot
            equipmentSlot.item! = droppedItem.item;

            this.character!.equipment[dropIndex].item = equipmentItem.item
            this.character!.equipment[this.draggedIndex].item = null;
          }

          this.draggedIndex = null; // Reset dragged index
        }else {
            console.log("Dropping inventory item")
            const inventoryItem: InventoryItemModel = droppedItem;

            this.character!.equipment[dropIndex].item = inventoryItem.item
            this.character!.inventory[this.draggedIndex].item = null;
        }
      }else {
        console.log("item does not fit this spot")
      }
    }
   this.updateCharacter();

  }


  onDragOver(event: DragEvent) {
    event.preventDefault(); // Allow drop
  }





  private updateCharacter(){

    // Save the new equipment state to the character
    this.characterApiService.updateCharacter(this.character!).subscribe({
      next: (updatedCharacter) => {
        console.log("UPDATED CHARACTER: ", updatedCharacter)
        this.character = updatedCharacter;
        this.characterService.setCharacter(updatedCharacter);
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
