export interface LoginInterface {
  email: string
  password: string
}

export interface initialLogin {
  email: string
  password: string
  responseLogin: ResponeServer
}

export type ResponeServer = {
  message: string
  token: string
}
