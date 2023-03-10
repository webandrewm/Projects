import { ArtBody, resHead, result, resultAuth } from '../index.js'
import { pool } from './Pool'
import { OkPacket, ResultSetHeader } from 'mysql2'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const doRecord = async (data: ArtBody) => {
  return new Promise((resolve, rej) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return rej(err)
      }
      connection.query(
        `INSERT INTO Articles (email, author, articleName, articleText) VALUES ('${data.email}', '${data.author}', '${data.articleName}', '${data.articleText}' )`,
        (err, result) => {
          if (err) {
            return rej(err)
          }
          resolve(result)
          connection.release()
          return result
        }
      )
    })
  })
}

const readRecords = () => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          'SELECT id, author, articleName, created_at FROM `Articles` ORDER BY id DESC',
          (err, result) => {
            if (err) {
              return reject(err)
            }

            resolve(result)
            connection.release()
            return result
          }
        )
      }
    })
  })
}
const readOneRecord = (id: number) => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `SELECT id, author, articleName, created_at, articleText FROM Articles WHERE id LIKE '%${id}%'`,
          (err, result) => {
            if (err) {
              return reject(err)
            }

            resolve(result)
            connection.release()
            return result
          }
        )
      }
    })
  })
}
const searchRecords = (artName: string) => {
  return new Promise<result>((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `SELECT * FROM Articles WHERE articleName LIKE '%${artName}%'`,
          (err: OkPacket, result: result) => {
            if (err) {
              return reject(err)
            }
            resolve(result)
            connection.release()
            return result
          }
        )
      }
    })
  })
}

const getRegistration = (
  email: string,
  passwordHash: string
): Promise<resHead> => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `INSERT INTO Users (email, passwordHash) VALUES ('${email}', '${passwordHash}' )`,
          (err, result: resHead) => {
            if (err) {
              return reject(err)
            }
            resolve(result)
            connection.release()
            return result
          }
        )
      }
    })
  })
}

const getLogin = (email: string) => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `SELECT id, email, passwordHash FROM Users WHERE email LIKE '%${email}%'`,
          (err: ResultSetHeader, result: resultAuth) => {
            if (err) {
              return reject(err)
            }
            resolve(result)
            return result
          }
        )
      }
    })
  })
}

export interface resultID {
  id: number
}
interface resultMassive extends Array<resultID> {}

export interface resultJWT extends JwtPayload {
  id: string
}

const findOneByToken = (token: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          'SELECT id FROM `Users` ORDER BY id DESC',
          (err: any, result: resultMassive) => {
            if (err) {
              return reject(err)
            }
            result.forEach(async (item): Promise<number | undefined> => {
              let decoded: resultJWT | any = jwt.verify(
                token,
                't#klfklsdfp23;l;lk42;l'
              )
              let go: boolean = await bcrypt.compare(
                item.id.toString(),
                decoded.id
              )
              if (go) {
                resolve(item.id)
                connection.release()
                return item.id
              }
            })
          }
        )
      }
    })
  })
}

export interface resultEmail {
  email: string
}
interface resEmail extends Array<resultEmail> {}
const findEmailByID = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `SELECT email FROM Users WHERE id LIKE '%${id}%'`,
          (err: any, result: resEmail) => {
            if (err) {
              reject(err)
            }
            if (result.length >= 1) {
              let [res] = result
              resolve(res.email)
              connection.release()
              return res.email
            }
          }
        )
      }
    })
  })
}

export interface oneArt {
  id: number
  author: string
  articleName: string
}
export interface findMyArt extends Array<oneArt> {}
const findMyArticles = (email: string): Promise<findMyArt> => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `SELECT id, author, articleName FROM Articles WHERE email LIKE '%${email}%'`,
          (err: any, result: findMyArt) => {
            if (err) {
              reject(err)
            }
            if (result) {
              resolve(result)
              return result
            }
          }
        )
      }
    })
  })
}

const deleteOneArticle = (
  email: string,
  id: number
): Promise<ResultSetHeader> => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `DELETE FROM Articles WHERE id='${id}' && email='${email}'`,
          (err: any, result: ResultSetHeader) => {
            if (err) {
              reject(err)
            }
            if (result) {
              resolve(result)
              connection.release()
              return result
            }
          }
        )
      }
    })
  })
}

const editOneArticle = (
  id: number,
  author: string,
  articleName: string,
  articleText: string,
  email: string
): Promise<ResultSetHeader> => {
  console.log(id, author, articleName, articleText, email)
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) {
        connection.release()
        return reject(err)
      } else {
        return connection.query(
          `UPDATE Articles SET author='${author}', articleName='${articleName}', articleText='${articleText}' WHERE id='${id}' && email='${email}'`,
          (err: any, result: ResultSetHeader) => {
            if (err) {
              return reject(err)
            }
            if (result) {
              resolve(result)
              connection.release()
              return result
            }
          }
        )
      }
    })
  })
}
export {
  editOneArticle,
  deleteOneArticle,
  findMyArticles,
  findEmailByID,
  findOneByToken,
  getLogin,
  getRegistration,
  doRecord,
  readRecords,
  searchRecords,
  readOneRecord,
}
