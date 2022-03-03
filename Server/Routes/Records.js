import express from 'express'
import { getRecords,addRecords } from '../Controller/Records.js'
const records = express.Router()

records.get('/fetch',getRecords)

export default records