import connect from "./conexao.js";
import modObj from "../modelo/objMod.js";

//classe responsavel para a comunicação e execução correta de dados vindos do sql
export default class dbObj {

    async GET() {
        const conexao = await connect()
        const sql = "SELECT * FROM produtos"
        const [list] = await conexao.query(sql)
        const lista = []
        for (let row of list) {
            const itemprod = new modObj(row.nome, row.descricao, row.cod, row.valor)
            lista.push(itemprod.ToJson())
        }
        return lista
    }

    async GETID(nome) {
        try{
        const conexao = await connect()
        const sql = "SELECT * FROM produtos where nome = ?"
        const valor = [nome]
        const [lista] = await conexao.query(sql, valor)
        const list = []
        for (let row of lista) {
            const itemprod = new modObj(row.nome, row.descricao, row.cod,row.value)
            list.push(itemprod.ToJson())
        }
        return lista
    }catch(erro){
        return {status:false,message:erro}
    }
    }

    async PUT(nome, desc, cod,value) {
        console.log(nome,desc,cod,value)
        try {
            const conexao = await connect()
            const sql = "UPDATE produtos SET nome=?, descricao=?, valor = ? WHERE cod=?"
            const values = [nome, desc, cod,value]
            await conexao.query(sql, values)
            return { status: true, message: "produto atualizado com sucesso!" }
        }catch(erro){
            return {status:false,message:(erro)}
        }
    }

    async POST(nome, desc, cod,value){
        try{
            const conexao = await connect()
            const sql = "INSERT INTO produtos (nome,descricao,foto,cod,valor) VALUES (?,?,?,?)"
            const values = [nome,desc,cod,value]
            console.log(values)

            await conexao.query(sql,values)
            return {status:true,message:"produto adicionado!"}
        }catch(erro){
            console.log(erro)
            return {status:false,message:erro}
        }
    }

    async DELETE(cod){
        const conexao = await connect()
        const sql = "DELETE FROM produtos WHERE cod = ?"
        const values = [cod]
        await conexao.query(sql,values)
        return {status:true,message:"produto escluido com sucesso!"}
    }
};