import express from 'express'
import cors from 'cors'
import objRota from './rota/rotas.js'

const porta=4004
const host="localhost"
const data = new Date();
const app=express()

app.use(express.json())
app.use("/produtos",objRota)
app.use(cors())

app.listen(porta,host,()=>{
    console.log(`escutando o servidor http://www.${host}:${porta} as ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`)
})