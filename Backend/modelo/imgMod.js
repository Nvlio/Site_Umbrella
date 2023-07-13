import dbImg from "../persistencia/imgDB.js"


//classe que constroi e trabalha com os objetos e modelos dele de como deve ser retratado etc...
export default class modImg {

    #nome
    #cod
    #fcod
    #pcod


    constructor(nome, funcod, prodcod, cod) {
        this.#nome = nome

        if (funcod == "undefined") {
            this.#fcod = null
        } else { this.#fcod = funcod }

        if (prodcod == 'undefined') {
            this.#pcod = null
        } else {
            this.#pcod = prodcod
        }
        this.#cod = cod
    }

    get nome() {
        return this.#nome
    }
    set nome(nvalu) {
        this.#nome = nvalu
        return this.#nome
    }

    get cod() {
        return this.#cod
    }

    get fcod() {
        return this.#fcod
    }

    get pcod() {
        return this.#pcod
    }

    ToJson() {
        return {
            "nome": this.#nome,
            "cod": this.#cod,
            "fcod": this.#fcod,
            "pcod": this.#pcod
        }
    }


    async pegarDados() {
        console.log('chamei')
        const DataBase = new dbImg()
        const db = await DataBase.GET()
        return db
    }

    async pegardadosId() {
        const DataBase = new dbImg()
        const db = await DataBase.GETID(this.#pcod, this.#fcod)
        console.log(db.nome)
        return db
    }

    async adicionarDados() {

        const DataBase = new dbImg()
        const db = DataBase.POST(this.#nome, this.#fcod, this.#pcod)
        return db
    }

    async excluirDados() {
        const DataBase = new dbImg()
        const db = DataBase.DELETE(this.#fcod, this.#pcod, this.#cod)
        return db
    }
}