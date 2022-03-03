import express from 'express'
import { getImages } from '../Controller/Images.js'

const images = express.Router()

images.get('/fetch/:id',getImages)

export default images