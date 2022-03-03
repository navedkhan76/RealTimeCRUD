import Image from '../Model/images.js'

export const getImages = async(req,res)=>{
    try{
        const data = await Image.findById(req.params.id)
        res.status(200).json(data)
    }
    catch(e){
        res.status(404).json(e)
        console.log(e)
    }
}
 