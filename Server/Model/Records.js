import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Records = new Schema({
    name:{
        type:String
    },
    date:{
        type:String
    },
    id:{
        type:String
    }
})

const Record = mongoose.model('Records',Records)

export default Record