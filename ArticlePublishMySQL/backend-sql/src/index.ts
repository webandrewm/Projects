import express, { Request, Response } from 'express'
import cors from 'cors'
import {
  deleteOneArticle,
  doRecord,
  editOneArticle,
  findEmailByID,
  findMyArt,
  findMyArticles,
  findOneByToken,
  getLogin,
  getRegistration,
  readOneRecord,
  readRecords,
  searchRecords,
} from './utils/records'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import console from 'console'
import { ResultSetHeader } from 'mysql2'

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
  token: string
  email: string
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
    const currentID: number = await findOneByToken(data.token)
    const email: string = await findEmailByID(currentID)
    data.email = email
    await doRecord(data)
    res.send({ message: 'ok' })
  } else {
    res
      .status(404)
      .json({ message: 'Статья не создана, неверно указаны данные' })
  }
})

app.get('/getall', async (_, res: Response) => {
  const response = await readRecords()
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
  } catch (err) {
    console.log(err)
    res.send(404).json({ message: 'Ничего не найдено' })
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
        res.status(404).json({ message: 'Ничего не найдено' })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Ничего не найдено' })
  }
})

export interface regData {
  email: string
  password: string
  confirmPass?: string
}

export interface resHead {
  insertId: number
}

app.post('/registr/', async (req: Request, res: Response) => {
  try {
    const { email, password }: regData = req.body
    const salt = await bcrypt.genSalt(10)
    const hash: string = await bcrypt.hash(password, salt)
    const passwordHash = hash
    const response: resHead = await getRegistration(email, passwordHash)
    if (response.insertId) {
      const id: string = response.insertId.toString()
      const saltID = await bcrypt.genSalt(10)
      const hashID = await bcrypt.hash(id, saltID)
      const token = jwt.sign(
        {
          id: hashID,
        },
        't#klfklsdfp23;l;lk42;l',
        {
          expiresIn: '5d',
        }
      )
      res.status(200).json({ message: 'Вы зарегистрированы', token: token })
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Не удалось зарегистрироваться' })
  }
})

export interface authInterface {
  id: number
  email: string
  passwordHash: string
  created_at?: Date
}

export interface resultAuth {
  response: [authInterface]
}

app.post('/authme/', async (req: Request, res: Response) => {
  try {
    const { email, password }: regData = req.body
    const [user]: resultAuth | any = await getLogin(email)
    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return res.status(404).json({ message: 'Не правильная почта или пароль' })
    }
    const id: string = user.id.toString()
    const saltID = await bcrypt.genSalt(10)
    const hashID = await bcrypt.hash(id, saltID)
    const token = jwt.sign(
      {
        id: hashID,
      },
      't#klfklsdfp23;l;lk42;l',
      {
        expiresIn: '5d',
      }
    )
    res.status(200).json({ message: 'Ок!', token: token })
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Не удалось войти' })
  }
})

app.get('/getmyart/:token', async (req: Request, res: Response) => {
  try {
    if (req.params.token) {
      const token: string = req.params.token
      const currentID: number = await findOneByToken(token)
      const email: string = await findEmailByID(currentID)
      const myArt: findMyArt = await findMyArticles(email)
      res.status(200).json(myArt)
    } else {
      res.status(404).json({ message: 'Не удалось найти ваши статьи' })
    }
  } catch (err) {
    res.status(404).json({ message: 'Не удалось найти ваши статьи' })
  }
})

export type deleteOne = {
  id: number
  token: string
}

app.delete(
  '/deleteone/:id/:token',
  async (req: Request<deleteOne>, res: Response) => {
    try {
      if (req.params.token && req.params.id) {
        const { id, token }: deleteOne = req.params
        const currentID: number = await findOneByToken(token)
        const email: string = await findEmailByID(currentID)
        const deleteResult: ResultSetHeader = await deleteOneArticle(email, id)
        if (deleteResult.affectedRows) {
          res.status(200).json({ message: 'Статья удалена.' })
        }
      }
    } catch (err) {
      res.status(404).json({ message: 'Не удалось удалить статью' })
    }
  }
)

export interface editReqInterface {
  id: number
  author: string
  articleName: string
  articleText: string
  token: string
}

app.patch('/editone', async (req: Request<editReqInterface>, res: Response) => {
  try {
    if (req.body) {
      const { id, author, articleName, articleText, token }: editReqInterface =
        req.body
      const currentID: number = await findOneByToken(token)
      const email: string = await findEmailByID(currentID)
      if (email.length > 3) {
        const result = await editOneArticle(
          id,
          author,
          articleName,
          articleText,
          email
        )
        result ? res.status(200).json({ message: 'Стаитья изменена' }) : ''
      }
    } else {
      res.status(404).json({ message: 'не удалось изменить статью' })
    }
  } catch (err) {
    res.status(404).json({ message: 'не удалось изменить статью' })
  }
})

app.get('/authtoken/:token', async (req: Request, res: Response) => {
  try {
    const YourToken: string = req.params.token
    const currentID: number = await findOneByToken(YourToken)
    const email: string = await findEmailByID(currentID)
    const [user]: resultAuth | any = await getLogin(email)
    const id: string = user.id.toString()
    const saltID = await bcrypt.genSalt(10)
    const hashID = await bcrypt.hash(id, saltID)
    const token = jwt.sign(
      {
        id: hashID,
      },
      't#klfklsdfp23;l;lk42;l',
      {
        expiresIn: '5d',
      }
    )
    res.status(200).json({ message: 'Ок!', token: token })
  } catch (err) {
    if (err) {
      res.status(404).json({ message: 'Не удалось войти' })
    }
  }
})
