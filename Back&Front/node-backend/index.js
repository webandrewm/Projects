import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  idValidator,
  orderValidation,
  passChangeValidator,
  registerValidation,
} from './AuthData/auth.js'
import cors from 'cors'
import mongoose from 'mongoose'
import UserModel from './models/User.js'
import ProductModel from './models/Product.js'
import { validationResult } from 'express-validator'
import OrderModel from './models/Order.js'
const app = express()
app.use(express.json())
app.use(cors())

mongoose
  .connect(
    'mongodb+srv://drewm:Ximik61@cluster0.zn6dsnn.mongodb.net/users?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('db ok')
  })
  .catch((err) => ('DB error', err))

app.listen(4444, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('server ok')
})

app.post('/registr', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please enter correct username and password' })
    }
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const doc = new UserModel({
      email: req.body.email,
      username: req.body.username,
      passwordHash: hash,
    })

    const user = await doc.save()
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'mrdrew321',
      {
        expiresIn: '300d',
      }
    )
    const { passwordHash, ...userData } = user._doc
    res.json({
      ...userData,
      token,
    })
  } catch (err) {
    res.status(500).json({
      massage: 'I cant register',
    })
  }
})

app.post('/auth/Login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      res.send.status(404).json({ message: 'User does not exist' })
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    )
    if (!isValidPass) {
      return res.status(404).json({ message: 'Incorrect email or password' })
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'mrdrew321',
      {
        expiresIn: '300d',
      }
    )
    const { passwordHash, ...userData } = user._doc
    res.json({
      ...userData,
      token,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Incorrect email or password',
    })
  }
})
app.patch('/auth/change', passChangeValidator, async (req, res) => {
  try {
    console.log(req)
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

app.get('/prod', async (req, res) => {
  try {
    const prod = await ProductModel.find()
    res.json(prod)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Cant get product list',
    })
  }
})

app.post('/prod/id', idValidator, async (req, res) => {
  const intId = parseInt(req.body.id)
  try {
    const prod = await ProductModel.findOne({ id: intId })
    res.json(prod)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Cant get product list',
    })
  }
})

app.post('/Orders', orderValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ message: 'errorr' })
    }

    const doc = new OrderModel({
      username: req.body.username,
      email: req.body.email,
      info: req.body.list,
      desiredDate: req.body.desiredDate,
      phoneNumber: req.body.phoneNumber,
    })
    await doc.save()
    res.status(200).json({ message: 'accepted' })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Failed to create order',
    })
  }
})
