import Prodsql from "../Peristencia/ProdSQL.js"

export default class Prodmod {
    #nome
    #descricao
    #foto
    #cod

    constructor(foto = null, nome = null, descrição = null, cod = null) {
        this.nome = nome;
        this.foto = foto;
        this.descrição;
        this.cod = cod
    }

    ToJSON() {
        return {
            "Nome" : this.nome,
            "foto" : this.foto,
            "desc" : this.descrição,
            "cod"  : this.cod
        }
    }

    pegar() {
        const DBprod=new Prodsql()
        DBprod.GET().then((resp)=>{
            return resp
        })
    }
}