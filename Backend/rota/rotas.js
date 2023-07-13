import router from 'express'
import imagectrl from '../controle/ImgCtrl.js'
import multer  from 'multer'

const imgrota = new router()
const img = new imagectrl()

const armazenamento = multer.diskStorage({
    destination:     function (req,file,cb){
        cb(null,'D:\Portifolio\Site_Umbrella novo\fotos')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

const upload = multer({storage: armazenamento});

imgrota.get('/',img.GET)
.get('/:name',img.GETNAME)
.post('/',upload.single('foto'),img.POST)
.delete('/id',img.DELETE)

export default imgrota