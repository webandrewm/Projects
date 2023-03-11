import mysql from 'mysql2'

const MYSQL_HOST: string = process.env.MYSQL_HOST || 'mysql'
const MYSQL_USER: string = process.env.MYSQL_USER || 'root'
const MYSQL_PORT: number = 3306
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || 'password'
const MYSQL_DB: string = process.env.MYSQL_DB || 'admin'

export const pool = mysql.createPool({
  connectionLimit: 1000,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
})

const ARTICLES_TABLE_SQL: string = `CREATE TABLE IF NOT EXISTS Articles (
    id INT AUTO_INCREMENT,
    Email TEXT,
    author TEXT,
    articleName TEXT,
    articleText LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
  )`

const USERS_TABLE_SQL: string = `CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email CHAR(50),
  passwordHash TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (email)
)`

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createTable = ARTICLES_TABLE_SQL
    connection.query(createTable, (err) => {
      if (!err) {
        console.log('Table was created')
      }
    })
    connection.release()
  }
})

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createUsersTable = USERS_TABLE_SQL
    connection.query(createUsersTable, (err) => {
      if (!err) {
        console.log('Users table was created')
      }
    })
    connection.release()
  }
})
