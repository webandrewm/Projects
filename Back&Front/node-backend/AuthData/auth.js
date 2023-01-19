import { body } from 'express-validator'

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('username').isLength({ min: 5 }),
]

export const passChangeValidator = [
  body('id'),
  body('password').isLength({ min: 5 }),
  body('oldPass').isLength({ min: 5 }),
]

export const orderValidation = [
  body('username').isLength({ min: 5 }),
  body('email').isLength({ min: 5 }),
  body('date'),
  body('list'),
  body('phone'),
]
export const idValidator = [body('id')]
