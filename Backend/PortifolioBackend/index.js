import express from "express";
import funcRota from "../rota/rotafunc.js";
import objRota from "../rota/rotasObj.js";
import vagaRota from "../rota/rotaVagas.js";
import cors from 'cors'

/* inicia a porta e host*/ 
const porta = 2023;
const host = 'localhost';

///incia o express
const app = express();




app.use(cors());
app.use(express.json());
app.use('/Objects',objRota)
app.use('/funcionario',funcRota)
app.use('/empregos',vagaRota)



app.listen(porta,host,()=>{console.log('escutando servidor http://'+host+':'+porta)})