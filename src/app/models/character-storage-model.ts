import {ItemModel} from "./items/item.model";

export interface CharacterStorageModel {
  id: number| undefined;
  quantity: number;
  item: ItemModel
}
