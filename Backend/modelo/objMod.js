import dbObj from "../persistencia/objDB.js"


//classe que constroi e trabalha com os objetos e modelos dele de como deve ser retratado etc...
export default class modObj{
    
    #nome
    #desc
    #codProd
    #valor

    constructor(nome,desc,codprod,valor){
        this.#nome=nome
        this.#desc=desc
        this.#codProd=codprod
        this.#valor=valor
    }

    get nome(){
        return this.#nome
    }
    set nome(nvalu){
        this.#nome=nvalu
        return this.#nome
    }

    get valor(){
        return this.#valor
    }

    set valor(Nvalor){
        this.#valor=valor
        return this.#valor
    }

    get desc(){
        return this.#desc
    }
    set desc(nvalu){
        this.#desc=nvalu
        return this.#desc
    }
    get codprod(){
        return this.#codProd
    }

    ToJson(){
        return{
            "nome":this.#nome,
            "desc":this.#desc,
            "cod":this.#codProd,
            "valor":this.#valor
        }
    }
    

    async pegarDados(){
        const DataBase = new  dbObj()
        const db = await DataBase.GET()
        console.log('db',db)
        return db
    }

    async pegardadosNome(){
        const DataBase = new dbObj()
        const db = await DataBase.GETID(this.#nome)
        return db
    }

    async atualizaDados(){
        const DataBase = new dbObj()
        const db = await DataBase.PUT(this.#nome,this.#desc,this.#codProd,this.#valor)
        return db
    }

    async adicionarDados(){
        
        const DataBase = new dbObj()
        const db = DataBase.POST(this.#nome,this.#desc,this.#valor)
        return db
    }

    async excluirDados(){
        const DataBase = new dbObj()
        const db = DataBase.DELETE(this.#codProd)
        return db
}}