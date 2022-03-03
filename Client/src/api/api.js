import axios from'axios'

const url='https://realtimecrud.herokuapp.com/'

export const getRecords = ()=>axios.get(`${url}records/fetch`)

export const addRecords = (record)=>axios.post(`${url}records/add`,record)

export const getImages = (id)=>axios.get(`${url}images/fetch/${id}`)