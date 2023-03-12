export interface RegistrInterface extends response {
  email: string
  password: string
  confirmPass: string
}
interface response {
  response: ResponeServer
}
export type ResponeServer = {
  message: string
  token: string
}

export interface requestToRegister {
  email: string
  password: string
}
