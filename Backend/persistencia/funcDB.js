import connect from "./conexao.js";
import modFunc from "../modelo/funcMod.js";

//classe responsavel para a comunicação e execução correta de dados vindos do sql
export default class dbFunc {

    async GET() {
        const conexao = await connect()
        const sql = "SELECT * FROM funcionario"
        const [list] = await conexao.query(sql)
        const lista = []
        for (let row of list) {
            const itemprod = new modFunc(row.Nome, row.Descricao, row.foto, row.codigo,row.nivel)
            lista.push(itemprod.ToJson())
        }
        return lista
    }

    async GETID(nome) {
        try{
        const conexao = await connect()
        const sql = "SELECT * FROM funcionarios where nome = ?"
        const valor = [nome]
        const [lista] = await conexao.query(sql, valor)
        const list = []
        for (let row of lista) {
            const itemprod = new modFunc(row.nome, row.descricao, row.foto, row.cod,row.nivel)
            list.push(itemprod.ToJson())
        }
        return lista
    }catch(erro){
        return {status:false,message:erro}
    }
    }

    async PUT(nome, desc, fotoM, cod,nivel) {
        console.log(nome,desc,fotoM,cod,nivel)
        try {
            const conexao = await connect()
            const sql = "UPDATE funcionarios SET nome=?, descricao=?, foto=? nivel=? WHERE cod=?"
            const values = [nome, desc, fotoM, cod,nivel]
            await conexao.query(sql, values)
            return { status: true, message: `Funcionario ${nome} atualizado com sucesso!` }
        }catch(erro){
            return {status:false,message:(erro)}
        }
    }

    async POST(nome, desc, fotoM, cod,nivel){
        try{
            const conexao = await connect()
            const sql = "INSERT INTO funcionarios (nome,descricao,foto,cod,nivel) VALUES (?,?,?,?,?)"
            const values = [nome,desc,fotoM,cod,nivel]
            console.log(values)

            await conexao.query(sql,values)
            return {status:true,message:"Funcionario adicionado!"}
        }catch(erro){
            return {status:false,message:erro}
        }
    }

    async DELETE(cod){
        const conexao = await connect()
        const sql = "DELETE FROM funcionarios WHERE cod = ?"
        const values = [cod]
        await conexao.query(sql,values)
        return {status:true,message:"funcionario Apagado!"}
    }
};