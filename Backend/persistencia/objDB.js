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

    async RESP(tabela) {
        const conexao = await connect();
        const sql = `SELECT cod FROM ${tabela} ORDER BY cod DESC LIMIT 1`;
        const valor = await conexao.query(sql)
        console.log(valor['0']['0'].cod)
        return valor['0']['0'].cod
    }
    
    async POST(nome, desc, value){
        try{
            const conexao = await connect()
            const sql = "INSERT INTO produtos (nome,descricao,valor) VALUES (?,?,?)"
            const values = [nome,desc,value]
            console.log(values)
            await conexao.query(sql,values)
            const resp = await this.RESP('produtos')
            console.log('RESPOSTA:', resp)
            return { status: true, message: "Funcionario adicionado!", codigo: resp }
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