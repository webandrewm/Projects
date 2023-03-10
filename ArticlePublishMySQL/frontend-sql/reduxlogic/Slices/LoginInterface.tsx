export interface LoginInterface {
  email: string
  password: string
}

export interface initialLogin {
  email: string
  password: string
  enterStatus: string
  responseLogin: ResponeServer
}

export type ResponeServer = {
  message: string
  token: string
}
export type KnownError = {
  message: string
}
