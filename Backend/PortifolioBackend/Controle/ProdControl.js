import Prodmod from "../Modelo/ProdMod.js";

export default class ProdutosCtr {

    GET(req, resp) {
        if (req.method == "GET") {
            const produtomod = new Prodmod()
            produtomod.pegar().then((resposta) => {
                resp.json(resposta)
            })
        }

    }

    /* GETID(req,resp) {
         
     }
 
     POST(req,resp){
         
     }
 
     PUTID(req,resp) {
         
     }
 
     DELETE(req,resp) {
         
     }*/
};