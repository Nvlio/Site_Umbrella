import connect from "./conexao.js";
import modObj from "../modelo/objMod.js";

export default class dbObj {

    async GET() {
        const conexao = await connect()
        const sql = "SELECT * FROM produtos"
        const [list] = await conexao.query(sql)
        const lista = []
        for (let row of list) {
            const itemprod = new modObj(row.nome, row.descricao, row.foto, row.cod)
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
            const itemprod = new modObj(row.nome, row.descricao, row.foto, row.cod)
            list.push(itemprod.ToJson())
        }
        return lista
    }catch(erro){
        return {status:false,message:erro}
    }
    }

    async PUT(nome, desc, fotoM, cod) {
        console.log(nome,desc,fotoM,cod)
        try {
            const conexao = await connect()
            const sql = "UPDATE produtos SET nome=?, descricao=?, foto=? WHERE cod=?"
            const values = [nome, desc, fotoM, cod]
            await conexao.query(sql, values)
            return { status: true, message: "produto atualizado com sucesso!" }
        }catch(erro){
            return {status:false,message:(erro)}
        }
    }

    async POST(nome, desc, fotoM, cod){
        try{
            const conexao = await connect()
            const sql = "INSERT INTO produtos (nome,descricao,foto,cod) VALUES (?,?,?,?)"
            const values = [nome,desc,fotoM,cod]
            console.log(values)

            await conexao.query(sql,values)
            return {status:true,message:"produto adicionado!"}
        }catch(erro){
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