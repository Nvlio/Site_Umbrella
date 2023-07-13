import router from "express";
import Ctrlcontas from "../controle/contCtrl.js";

const rotaCont = new router()
const contas = new Ctrlcontas()

rotaCont.get('/', contas.GET)
    .get('/:Infos', contas.GETVAL)
    .delete('/:id', contas.DELETE)
    .post('/', contas.POST)
    .put('/:id', contas.PUT)

export default rotaCont