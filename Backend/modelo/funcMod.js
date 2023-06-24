import dbFunc from "../persistencia/funcDB.js"


//classe que constroi e trabalha com os objetos e modelos dele de como deve ser retratado etc...
export default class modFunc{
    
    #nome
    #desc
    #cod
    #nivel


    constructor(nome,desc,nivel,cod){
        this.#nome=nome
        this.#desc=desc
        this.#cod=cod
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
    get cod(){
        return this.#cod
    }

    ToJson(){
        return{
            "nome":this.#nome,
            "desc":this.#desc,
            "cod":this.#cod,
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
        const db = await DataBase.PUT(this.#nome,this.#desc,this.#cod,this.#nivel)
        return db
    }

    async adicionarDados(){
        const DataBase = new dbFunc()
        const db = DataBase.POST(this.#nome,this.#desc,this.#nivel)
        return db
    }

    async excluirDados(){
        const DataBase = new dbFunc()
        const db = DataBase.DELETE(this.#cod)
        return db
}}