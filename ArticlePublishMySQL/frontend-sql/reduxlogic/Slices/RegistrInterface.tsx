export interface RegistrInterface {
  email: string
  password: string
  confirmPass: string
  response?: ResponeServer
}

export type ResponeServer = {
  message: string
  token: string
}
