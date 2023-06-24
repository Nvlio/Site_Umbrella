import reouter from 'express'
import imagectrl from '../controle/ImgCtrl.js'

const imgrota = new reouter()
const img = new imagectrl()

imgrota.get('/',img.GET)
.get('/:name',img.GETNAME)
.post('/',img.POST)
.delete('/id',img.DELETE)

export default imgrota