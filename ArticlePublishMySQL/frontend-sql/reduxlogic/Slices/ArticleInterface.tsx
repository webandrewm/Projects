export interface ArtInterface {
  author: string
  articleName: string
  articleText: string
  allArticles: Array<oneArticle>
  artLoadingStatus?: string
  artLoadingMessage?: object
  sendingStatus?: string
  sendingAnswer?: { message: string }
  token: string
}

export interface oneArticle {
  id: number
  author: string
  articleName: string
  articleText: string
  token?: string
}

export interface getArtInter extends Array<oneArticle> {}

export interface sendArt {
  author: string
  articleName: string
  articleText: string
  token: string
}

export interface messageResponse {
  message: string
}
