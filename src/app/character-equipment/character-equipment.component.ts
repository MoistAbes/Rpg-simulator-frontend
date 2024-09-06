import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {CharacterService} from "../service/character.service";
import {CharacterModel} from "../models/character.model";
import {InventoryItemModel} from "../models/inventory-item-model";
import {CharacterApiService} from "../service/character.api.service";
import {CharacterEquipmentModel} from "../models/character-equipment-model";

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
  showDetails(storage: InventoryItemModel) {
    this.hoveredItem = storage; // Set the hovered item details
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
    console.log("On drag start")
    console.log("dragged index: ", this.draggedIndex)
    console.log("dragged item: ", item)

  }

  onDragOver(event: DragEvent) {
    console.log("drag over")
    event.preventDefault(); // Allow drop
  }

  onDrop(event: DragEvent, index: number) {
    console.log("On drop")
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const itemData = event.dataTransfer?.getData('text/plain');
      const droppedItem: InventoryItemModel = itemData ? JSON.parse(itemData) : null;

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

      console.log("inventory: ", this.character?.inventory);

      //SAVE CHARACTER
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
      })

      this.draggedIndex = null; // Reset dragged index
    }
  }

  onDropEquipment(event: DragEvent, slot: CharacterEquipmentModel) {
    console.log("On drop equipment");
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const itemData = event.dataTransfer?.getData('text/plain');
      const droppedItem: InventoryItemModel = itemData ? JSON.parse(itemData) : null;

      if (droppedItem) {
        // Here you can add logic to equip the item and perhaps clear the slot in inventory
        console.log(`Equipped ${droppedItem.item!.name} to ${slot}`);

        // Example: remove item from inventory
        //this.character.inventory[this.draggedIndex] = { id: undefined, quantity: 0, item: null,  };

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

        this.draggedIndex = null; // Reset dragged index
      }
    }
  }

}
