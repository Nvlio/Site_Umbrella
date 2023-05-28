import dbObj from "../persistencia/objDB.js"


//classe que constroi e trabalha com os objetos e modelos dele de como deve ser retratado etc...
export default class modObj{
    
    #nome
    #desc
    #fotoM
    #codProd

    constructor(nome,desc,fotmain,codprod){
        this.#nome=nome
        this.#desc=desc
        this.#fotoM=fotmain
        this.#codProd=codprod
    }

    get nome(){
        return this.#nome
    }
    set nome(nvalu){
        this.#nome=nvalu
        return this.#nome
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
            "codprod":this.#codProd
        }
    }
    

    async pegarDados(){
        const DataBase = new  dbObj()
        const db = await DataBase.GET()
        return db
    }

    async pegardadosNome(){
        const DataBase = new dbObj()
        const db = await DataBase.GETID(this.#nome)
        return db
    }

    async atualizaDados(){
        const DataBase = new dbObj()
        const db = await DataBase.PUT(this.#nome,this.#desc,this.#fotoM,this.#codProd)
        return db
    }

    async adicionarDados(){
        const DataBase = new dbObj()
        const db = DataBase.POST(this.#nome,this.#desc,this.#fotoM,this.#codProd)
        return db
    }

    async excluirDados(){
        const DataBase = new dbObj()
        const db = DataBase.DELETE(this.#codProd)
        return db
}}