import DBcontas from "../persistencia/contDB.js";

export default class Modcontas {

    #nome
    #email
    #senha
    #nivel
    #id

    constructor(nome, email, senha, nivel, id) {
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#nivel = nivel;
        this.#id = id;
    }

    get nome() {
        return this.#nome
    }

    set nome(Nvl) {
        this.#nome = Nvl
        return this.#nome
    }

    get email() {
        return this.#email
    }

    set email(Nvl) {
        this.#email = Nvl
        return this.#email
    }

    get senha() {
        return this.#senha
    }

    set senha(Nvl) {
        this.#senha = Nvl
        return this.#senha
    }

    get nivel() {
        return this.#nivel
    }

    set nivel(Nvl) {
        this.#nivel = Nvl
        return this.#nivel
    }

    get id() {
        return this.#id
    }


    ToJSON() {
        return {
            'nome': this.#nome,
            'email': this.#email,
            'senha': this.#senha,
            'nivel': this.#nivel,
            'codigo': this.#id
        }
    }

    async pegarDados() {
        const DBcont = new DBcontas()
        const resp = await DBcont.GET()
        return resp
    }

    async Logar() {
        const DBcont = new DBcontas()
        //mod para que só email e senha sejam necessarios para logar (john : ada)
        const resp = await DBcont.GETVAL(this.#nome,this.#senha)
        if (resp.length!=0){
            return {msg:'FoundIt'}
        }else{
            return {msg:'NotFound'}
        }
    }

    async adicionarDados() {
        const DBcont = new DBcontas()
        const resp = await DBcont.POST(this.#nome, this.#email, this.#senha, this.#nivel)
        return resp
    }

    async atualizarDados() {
        const DBcont = new DBcontas()
        const resp = await DBcont.PUT(this.#nome, this.#email, this.#senha, this.#nivel, this.#id)
        return resp
    }

    async deletarDados() {
        const DBcont = new DBcontas()
        const resp = await DBcont.DELETE(this.#id)
        return resp
    }
};