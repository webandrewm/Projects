export interface ArtInterface {
  author: string
  articleName: string
  articleText: string
  allArticles?: [oneArticle]
  artLoadingStatus?: string
  artLoadingMessage?: object
  sendingStatus?: string
  sendingAnswer?: Object
  token: string
}

export interface oneArticle {
  id: number
  author: string
  articleName: string
  articleText: string
}
