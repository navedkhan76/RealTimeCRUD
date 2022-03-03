
import Record from '../Model/Records.js'

import Image from '../Model/images.js'

export const getRecords = async(req,res)=>{
    try{
        const data = await Record.find()
        res.status(200).json(data)
    }
    catch(e){
        res.status(404).json(e)
        console.log(e)
    }
}
 
export const addRecords = async(record)=>{
    try{
        
        const {name,images}=record

        const image = new Image({images:images})

        await image.save()
        
        const newrecord = new Record({name:name,date:new Date(),id:image._id})

        await newrecord.save()
        

        return {newrecord}

    }
    catch(e)
    {
        console.log(e)
    }
}
export const deleteRecords = async(data)=>{
    try{
        
        const {record,image} = data

        await Record.findByIdAndDelete(record)

        await Image.findByIdAndDelete(image)
        
        return record

    }
    catch(e)
    {
        console.log(e)
    }
}
