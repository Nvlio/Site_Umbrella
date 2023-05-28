import router from "express";
import objectCtrl from "../controle/objCtrl.js";

//inicia rotas e controle
const objRota= new router()
const control= new objectCtrl()

//define o que deve ser feito para cada operação
objRota.get('/',control.GET)
.get("/:nome",control.GETID)
.put("/:id",control.PUT)
.post("/",control.POST)
.delete("/:id",control.DEL)

export default objRota