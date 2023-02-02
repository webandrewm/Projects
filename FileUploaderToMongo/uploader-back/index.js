import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import multer from 'multer'
import GridFile from './models/Files.js'
import fs from 'fs'

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

app.post('/uploads', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    const fileStream = fs.createReadStream(`uploads/${file.originalname}`)
    const gridfile = new GridFile({ filename: file.originalname })
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
app.get('/getlist', async (req, res, nxt) => {
  try {
    const files = await GridFile.find({})

    res.json(files)
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
