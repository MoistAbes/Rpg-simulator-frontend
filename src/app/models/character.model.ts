import {userModel} from "./user.model";

export interface CharacterModel {
  id: number,
  name: string,
  level: number,
  experience: number,

  health: number,
  attack: number,
  defence: number,
  speed: number,
  luck: number,

  user: userModel
}
