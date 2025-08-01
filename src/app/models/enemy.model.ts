import {EnemyStatsModel} from "./enemy-stats.model";
import {ItemModel} from "./items/item.model";

export interface EnemyModel {
  id: number;
  name: string;
  stats: EnemyStatsModel;
  lootTable: ItemModel[];
}
