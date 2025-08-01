export const API_ENDPOINTS = {
  BASE_URL: "http://localhost:8080/",
  USER: {
    LOGIN: (username: string, password: string) => `user/login/${username}/${password}`
  },
  CHARACTER: {
    GET_ALL: (userId: number) => `character/find-all/${userId}`,
    CREATE: (characterName: string ,userId: number) => `character/create/${characterName}/${userId}`,
    UPDATE: `character/update`
  },
  ZONE: {
    GET_ALL: `zone/find-all`
  },
  ENEMY_INSTANCE: {
    GET_RANDOM: `enemy-instance/random`
  },
  COMBAT_INSTANCE: {
    GET_BY_CHARACTER_ID: (characterId: number) => `combat-instance/${characterId}`,
    CREATE: (characterId: number) => `combat-instance/create/${characterId}`,
    CLEAN: (combatInstanceId: number) => `combat-instance/clean/${combatInstanceId}`
    // GET_BY_ID: (combatInstanceId: number) => `combat-instance/${combatInstanceId}`,
  },
  COMBAT: {
    START: (characterId: number) => `combat/start/${characterId}`,
    CHARACTER_ATTACK: `combat/character-attack`,
    ENEMY_ATTACK: `combat/enemy-attack`
  }

}
