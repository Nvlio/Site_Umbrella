import  router  from "express";
import ProdutosCtr from "../Controle/ProdControl.js";

const RotaProd = new router()
const Prodctr = new ProdutosCtr()

RotaProd.get("/",Prodctr.GET)
/*.get("/:id",Prodctr.GETID)
.post("/",Prodctr.POST)
.put("/",Prodctr.PUTID)
.delete("/",Prodctr.DELETE)*/

export default RotaProd;