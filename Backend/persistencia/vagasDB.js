import connect from "./conexao.js";
import modVaga from "../modelo/vagasMod.js";

//classe responsavel para a comunicação e execução correta de dados vindos do sql
export default class dbVagas {

    async GET() {
        const conexao = await connect()
        const sql = "SELECT * FROM emprego"
        const [list] = await conexao.query(sql)
        const lista = []
        for (let row of list) {
            const item = new modVaga(row.nome, row.descricao, row.foto, row.cod, row.salario)
            lista.push(item.ToJson())
        }
        return lista
    }

    async GETID(nome) {
        try{
        const conexao = await connect()
        const sql = "SELECT * FROM emprego where nome = ?"
        const valor = [nome]
        const [lista] = await conexao.query(sql, valor)
        const list = []
        for (let row of lista) {
            const item = new modVaga(row.nome, row.descricao, row.foto, row.cod, row.salario)
            list.push(item.ToJson())
        }
        return lista
    }catch(erro){
        return {status:false,message:erro}
    }
    }

    async PUT(nome, desc, fotoM, cod,salario) {
        try {
            const conexao = await connect()
            const sql = "UPDATE emprego SET nome=?, descricao=?, salario=? WHERE cod=?"
            const values = [nome, desc, fotoM, cod, salario]
            await conexao.query(sql, values)
            return { status: true, message: "Informações da vaga atualizada!" }
        }catch(erro){
            return {status:false,message:(erro)}
        }
    }

    async POST(nome, desc, fotoM, cod,salario){
        try{
            const conexao = await connect()
            const sql = "INSERT INTO emprego (nome,descricao,cod,salario) VALUES (?,?,?,?)"
            const values = [nome,desc,fotoM,cod,salario]
            console.log(values)

            await conexao.query(sql,values)
            return {status:true,message:"Vaga adicionado!"}
        }catch(erro){
            return {status:false,message:erro}
        }
    }

    async DELETE(cod){
        const conexao = await connect()
        const sql = "DELETE FROM emprego WHERE cod = ?"
        const values = [cod]
        await conexao.query(sql,values)
        return {status:true,message:"Vaga Finalizada!"}
    }
};