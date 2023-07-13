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
            const itemprod = new modFunc(row.Nome, row.Descricao, row.nivel, row.codigo)
            lista.push(itemprod.ToJson())
        }
        return lista
    }

    async GETID(nome) {
        try {
            const conexao = await connect()
            const sql = "SELECT * FROM funcionario where nome = ?"
            const valor = [nome]
            const [lista] = await conexao.query(sql, valor)
            const list = []
            for (let row of lista) {
                const itemprod = new modFunc(row.nome, row.descricao, row.nivel,row.codigo)
                list.push(itemprod.ToJson())
            }
            return lista
        } catch (erro) {
            return { status: false, message: erro }
        }
    }

    async PUT(nome, desc, cod, nivel) {
        console.log(nome, desc, cod, nivel)
        try {
            const conexao = await connect()
            const sql = "UPDATE funcionario SET nome=?, descricao=?,nivel=? WHERE codigo=?"
            const values = [nome, desc, cod, nivel]
            await conexao.query(sql, values)
            return { status: true, message: `Funcionario ${nome} atualizado com sucesso!` }
        } catch (erro) {
            return { status: false, message: (erro) }
        }
    }

    //ao postar um novo funcionario ele retorna o codigo dele para ser usado na imagem 
    async RESP(tabela) {
        const conexao = await connect();
        const sql = `SELECT codigo FROM ${tabela} ORDER BY codigo DESC LIMIT 1`;
        const valor = await conexao.query(sql)
        console.log(valor['0']['0'].codigo)
        return valor['0']['0'].codigo
    }

    async POST(nome, desc, nivel) {
        try {
            const conexao = await connect()
            const sql = "INSERT INTO funcionario (nome,descricao,nivel) VALUES (?,?,?)"
            const values = [nome, desc, nivel]
            await conexao.query(sql, values)
            const resp = await this.RESP('funcionario')
            console.log('RESPOSTA:', resp)
            return { status: true, message: "Funcionario adicionado!", codigo: resp }
        } catch (erro) {
            console.log(erro)
            return { status: false, message: erro }
        }
    }

    async DELETE(cod) {
        const conexao = await connect()
        const sql = "DELETE FROM funcionario WHERE codigo = ?"
        const values = [cod]
        await conexao.query(sql, values)
        return { status: true, message: "funcionario Apagado!" }
    }
};