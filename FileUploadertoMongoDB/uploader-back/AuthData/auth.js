import { body } from 'express-validator'

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
]

export const passChangeValidator = [
  body('id'),
  body('password').isLength({ min: 5 }),
  body('oldPass').isLength({ min: 5 }),
]

export const idValidator = [body('id')]
