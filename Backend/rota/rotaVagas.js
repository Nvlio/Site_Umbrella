import router  from "express";
import vagaCtrl from "../controle/vagasCtrl.js";

const vagaRota = new router()
const vaga = new vagaCtrl

vagaRota.get('/',vaga.GET)
.get('/:nome',vaga.GETID)
.put('/:id',vaga.PUT)
.post('/',vaga.POST)
.delete('/:id',vaga.DEL)

export default vagaRota