import router from 'express'
import funcCtrl from '../controle/funcCtrl.js'

const funcRota = new router()
const funcion = new funcCtrl()

funcRota.get('/',funcion.GET)
.get('/:nome',funcion.GETID)
.put('/:id',funcion.PUT)
.post('/',funcion.POST)
delete('/:id',funcion.DEL)

export default funcRota;