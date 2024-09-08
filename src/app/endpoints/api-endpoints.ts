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
  }

}
