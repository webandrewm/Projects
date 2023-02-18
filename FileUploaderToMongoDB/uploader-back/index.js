import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import multer from 'multer'
import GridFile from './models/Files.js'
import fs from 'fs'
import { registerValidation } from './AuthData/auth.js'
import UserModel from './models/User.js'
import bcrypt from 'bcrypt'
import checkAuth from './components/checkAuth.js'
import { passChangeValidator } from './AuthData/auth.js'
const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const MONGODB_URI =
  'mongodb+srv://drewm:Ximik61@cluster0.zn6dsnn.mongodb.net/users?retryWrites=true&w=majority'

const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))

app.use(express.json())
app.use(cors())
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('db ok')
  })
  .catch((err) => ('DB error', err))

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('server ok')
})

let tryes = 0
let regtry = 0
const resetTryes = () => {
  setTimeout(() => {
    tryes = 0
  }, 60000)
}

const regTryesReset = () => {
  setTimeout(() => {
    regtry = 0
  }, 60000)
}
app.post('/uploads', upload.single('file'), async (req, res) => {
  try {
    const email = req.body.body
    const file = req.file
    const fileStream = fs.createReadStream(`uploads/${file.originalname}`)
    const gridfile = new GridFile({
      metadata: { email: email },
      filename: file.originalname,
    })
    await gridfile.upload(fileStream)
    fs.unlinkSync(file.path)
    res.send({ message: ' Uploading complete' })
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Failed to upload' })
  }
})

app.get('/download/:id/:name', async (req, res, nxt) => {
  try {
    const { id, name } = req.params
    const gridFile = await GridFile.findById(id)
    res.attachment(name)
    gridFile.downloadStream(res)
  } catch (err) {
    nxt(err)
  }
})
app.post('/getlist', async (req, res, nxt) => {
  try {
    const email = req.body.email
    if (email) {
      const files = await GridFile.find({ metadata: { email: email } })
      res.json(files)
    }
  } catch (err) {
    nxt(err)
  }
})

app.delete('/delete/:id/:name', async (req, res, nxt) => {
  try {
    const { id } = req.params
    await GridFile.findByIdAndDelete(id)
    res.send({ message: 'file was deleted' })
  } catch (err) {
    res.send({ message: 'file was not deleted' })
    nxt(err)
  }
})

app.post('/registr', registerValidation, async (req, res) => {
  if (regtry <= 5) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        regtry++
        return res
          .status(400)
          .json({ message: 'Please enter correct username and password' })
      }
      const password = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const doc = new UserModel({
        email: req.body.email,
        passwordHash: hash,
      })

      const person = await doc.save()
      const token = jwt.sign(
        {
          _id: person._id,
        },
        'mrdrew321',
        {
          expiresIn: '300d',
        }
      )
      const { passwordHash, ...userData } = person._doc
      res.json({
        ...userData,
        token,
      })
    } catch (err) {
      regtry++
      console.log(err)
      res.status(500).json({
        massage: 'I cant register',
      })
    }
  } else {
    regTryesReset()
    res.status(500).json({
      message: 'Attempt limit exceeded',
    })
  }
})

app.post('/auth/Login', async (req, res) => {
  if (tryes <= 5) {
    try {
      const person = await UserModel.findOne({ email: req.body.email })
      if (!person) {
        res.send.status(404).json({ message: 'User does not exist' })
      }
      const isValidPass = await bcrypt.compare(
        req.body.password,
        person._doc.passwordHash
      )
      if (!isValidPass) {
        tryes = tryes + 1
        return res.status(404).json({ message: 'Incorrect email or password' })
      }
      const token = jwt.sign(
        {
          _id: person._id,
        },
        'mrdrew321',
        {
          expiresIn: '15d',
        }
      )
      const { passwordHash, ...userData } = person._doc
      res.json({
        ...userData,
        token,
      })
    } catch (err) {
      tryes = tryes + 1
      res.status(500).json({
        message: 'Incorrect email or password',
      })
    }
  } else {
    resetTryes()
    res.status(500).json({
      message: 'Attempt limit exceeded',
    })
  }
})

app.post('/auth/me', checkAuth, async (req, res) => {
  try {
    const person = await UserModel.findOne({ _id: req.Id })
    if (!person) {
      return res.status(404).json({ message: 'User not found' })
    }
    const { passwordHash, ...userData } = person._doc
    res.json(userData)
  } catch (e) {
    res.status(500).json({
      message: 'Have no user of access',
    })
  }
})
app.patch('/auth/changepass', passChangeValidator, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'New passwords is too short' })
    }
    const id = req.body.id
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const oldPass = req.body.oldPass
    const user = await UserModel.findOne({ _id: id })
    const compareResult = await bcrypt.compare(oldPass, user.passwordHash)
    if (compareResult) {
      await UserModel.updateOne(
        {
          _id: id,
        },
        {
          passwordHash: hash,
        }
      )

      res.status(200).json({ message: 'Password changed' })
    } else {
      res.status(400).json({ message: 'Old password is wrong' })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Failed to change password' })
  }
})
