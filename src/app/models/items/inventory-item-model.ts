import {ItemModel} from "./item.model";

export interface InventoryItemModel {
  id: number| undefined;
  quantity: number;
  location: number;
  item: ItemModel | null;
}
