import router from "express";
import objectCtrl from "../controle/objCtrl.js";

const objRota= new router()
const control= new objectCtrl()

objRota.get('/',control.GET)
.get("/:nome",control.GETID)
.put("/:id",control.PUT)
.post("/",control.POST)
.delete("/:id",control.DEL)

export default objRota