import express from 'express'
import cors from 'cors'
import objRota from './rota/rotasObj.js'

///inicia as constantes basicas host,porta tempo e inicia o express
const porta=4004
const host="localhost"
const data = new Date();
const app=express()

//define para aceitar e entender json
app.use(express.json())
//ao receber uma chamada que contenha uma dessas rotas ele chama a rota especifica
app.use("/produtos",objRota)
//permite que possa ser chamado por apps externos
app.use(cors())

//inicia servidor
app.listen(porta,host,()=>{
    console.log(`escutando o servidor http://www.${host}:${porta} as ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`)
})