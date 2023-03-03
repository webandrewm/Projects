import express, { Request, Response } from 'express'
import cors from 'cors'
import { doRecord, readOneRecord, readRecords, searchRecords } from './utils/records'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(cors())

app.listen('5000', (): void => {
  console.log('Server is up')
})

export interface ArtBody {
  author: string
  articleName: string
  articleText: string
}

export interface oneArticle {
  id: number
  author: string
  articleName: string
  articleText: string
  created_at: Date
}
export interface result {
  response: [oneArticle]
}

app.post('/artsend', async (req: Request, res: Response) => {
  const data: ArtBody = req.body
  if (
    data.author.length > 3 &&
    data.articleText.length > 5 &&
    data.articleName.length > 5
  ) {
    console.log(data.articleText.length)
    await doRecord(data)
    res.send({ message: 'ok' })
  } else {
    res.status(404).json('Статья не создана, неверно указаны данные')
  }
})

app.get('/getall', async (_, res: Response) => {
  const response = await readRecords()
  console.log(response)
  res.json(response)
})

app.get('/getone/:id', async (req: Request, res: Response) => {
  try {  
    if (req.params.id) {
      let id: number = +req.params.id
  const response: result | any = await readOneRecord(id)
  if (response.length > 0) {
    console.log(response)
    res.status(200).json(response)
  } else {
    res.status(403).json({ message: 'Ничего не найдено' })
  }
}
}
  catch (err) {
    console.log(err)
    res.send(404).json({message: 'Ничего не найдено'})
  }
})

app.get('/search/:articleName', async (req: Request, res: Response) => {
  try {
    if (req.params.articleName.length > 0) {
      let artName: string = req.params.articleName
      const response: result | any = await searchRecords(artName)

      if (response.length > 0) {
        res.status(200).json(response)
      } else {
        res.status(403).json({ message: 'Ничего не найдено' })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(404).json('Ничего не найдено')
  }
})
