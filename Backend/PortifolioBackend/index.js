import express from "express";
import rotaCad from "./Rota/RotaUsu.js";
import rotaObj from "./Rota/RotaObj.js";
import cors from 'cors'

/* inicia a porta e host*/ 
const porta = 2023;
const host = 'localhost';

///incia o express
const app = express();



console.log(data)

app.use(cors());
app.use(express.json());
app.use('/Objects',rotaObj)
app.use('/Usuarios',rotaCad)



app.listen(porta,host,()=>{console.log('escutando servidor http://'+host+':'+porta)})