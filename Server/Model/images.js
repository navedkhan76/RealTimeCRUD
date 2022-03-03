import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Images = new Schema({
  
    images:{
        type:Array
    }
})

const Image = mongoose.model('Images',Images)

export default Image