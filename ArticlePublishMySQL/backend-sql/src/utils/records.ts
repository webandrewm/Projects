import { ArtBody, result } from '../index.js'
import { pool } from './Pool'
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2'

const doRecord = async (data: ArtBody) => {
  let newPromise = new Promise((resolve, rej) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return rej(err)
      }
      connection.query(
        `INSERT INTO Articles (author, articleName, articleText) VALUES ('${data.author}', '${data.articleName}', '${data.articleText}' )`,
        (err, result) => {
          if (err) {
            return rej(err)
          }
          resolve(result)
          return result
        }
      )
      connection.release()
    })
  })
  return newPromise
}

const readRecords = () => {
  let newPromise = new Promise((resolve, reject) =>
    pool.getConnection((err, connection) => {
      connection.query(
        'SELECT id, author, articleName, created_at, articleText FROM `Articles` ORDER BY id DESC',
        (err, result) => {
          if (err) {
            return reject(err)
          }

          resolve(result)
          return result
        }
      )
      connection.release()
    })
  )
  return newPromise
}

const searchRecords = (artName: string) => {
  let newPromise = new Promise<result>((resolve, reject) =>
    pool.getConnection((err, connection) => {
      connection.query(
        `SELECT * FROM Articles WHERE articleName LIKE '%${artName}%'`,
        (err: OkPacket, result: result) => {
          if (err) {
            return reject(err)
          }
          resolve(result)
          return result
        }
      )
    })
  )
  return newPromise
}

export { doRecord, readRecords, searchRecords }
