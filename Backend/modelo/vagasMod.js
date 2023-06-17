import dbVagas from "../persistencia/vagasDB.js"


//classe que constroi e trabalha com os objetos e modelos dele de como deve ser retratado etc...
export default class modVaga{
    
    #nome
    #desc
    #cod
    #salario

    constructor(nome,desc,cod,salario){
        this.#nome=nome
        this.#desc=desc
        this.#cod=cod
        this.#salario=salario
    }

    get nome(){
        return this.#nome
    }
    set nome(nvalu){
        this.#nome=nvalu
        return this.#nome
    }

    get salario(){
        return this.#salario
    }
    set salario(nvalu){
        this.#salario=nvalu
        return this.#salario
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
            'salario':this.#salario
        }
    }
    

    async pegarDados(){
        const DataBase = new  dbVagas()
        const db = await DataBase.GET()
        return db
    }

    async pegardadosNome(){
        const DataBase = new dbVagas()
        const db = await DataBase.GETID(this.#nome)
        return db
    }

    async atualizaDados(){
        const DataBase = new dbVagas()
        const db = await DataBase.PUT(this.#nome,this.#desc,this.#cod,this.#salario)
        return db
    }

    async adicionarDados(){
        const DataBase = new dbVagas()
        const db = DataBase.POST(this.#nome,this.#desc,this.#cod,this.#salario)
        return db
    }

    async excluirDados(){
        const DataBase = new dbVagas()
        const db = DataBase.DELETE(this.#cod)
        return db
}}