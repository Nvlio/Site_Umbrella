import dbFunc from "../persistencia/funcDB.js"


//classe que constroi e trabalha com os objetos e modelos dele de como deve ser retratado etc...
export default class modFunc{
    
    #nome
    #desc
    #fotoM
    #codProd
    #nivel


    constructor(nome,desc,fotmain,codprod,nivel){
        this.#nome=nome
        this.#desc=desc
        this.#fotoM=fotmain
        this.#codProd=codprod
        this.#nivel=nivel
    }

    get nome(){
        return this.#nome
    }
    set nome(nvalu){
        this.#nome=nvalu
        return this.#nome
    }

    get nivel(){
        return this.#nivel
    }
    set nivel(nvalu){
        this.#nivel=nvalu
        return this.#nivel
    }

    get desc(){
        return this.#desc
    }
    set desc(nvalu){
        this.#desc=nvalu
        return this.#desc
    }
    get fotoM(){
        return this.#fotoM
    }
    get codprod(){
        return this.#codProd
    }

    ToJson(){
        return{
            "nome":this.#nome,
            "desc":this.#desc,
            "fotoM":this.#fotoM,
            "cod":this.#codProd,
            "nivel":this.#nivel
        }
    }
    

    async pegarDados(){
        console.log('chamei')
        const DataBase = new  dbFunc()
        const db = await DataBase.GET()
        return db
    }

    async pegardadosNome(){
        const DataBase = new dbFunc()
        const db = await DataBase.GETID(this.#nome)
        return db
    }

    async atualizaDados(){
        const DataBase = new dbFunc()
        const db = await DataBase.PUT(this.#nome,this.#desc,this.#fotoM,this.#codProd)
        return db
    }

    async adicionarDados(){
        const DataBase = new dbFunc()
        const db = DataBase.POST(this.#nome,this.#desc,this.#fotoM,this.#codProd)
        return db
    }

    async excluirDados(){
        const DataBase = new dbFunc()
        const db = DataBase.DELETE(this.#codProd)
        return db
}}