import express from "express";
import  cors from 'cors';
import RotaProd from "./Rotas/ProdRoute.js";

const App = express()
const porta=3245
const host="localhost"

App.use(cors());
App.use(express.json());
App.use("/Produtos",RotaProd)

App.listen(porta,host,()=>{
    console.log(`servidor aberto em http://www.${host}:${porta}`)
})