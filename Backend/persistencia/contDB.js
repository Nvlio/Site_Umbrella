import connect from "./conexao.js"
import Modcontas from "../modelo/contMod.js"



export default class DBcontas {

    async GET() {
        const conexao = await connect()
        const sql = "SELECT * FROM contas"
        const [list] = await conexao.query(sql)
        const lista = []
        for (let row of list) {
            const itemprod = new Modcontas(row.nome, row.email, row.senha, row.nivel, row.codigo)
            lista.push(itemprod.ToJSON())
        }
        return lista
    }

    //Testar só add AND email=? AND senha=?
    async GETVAL(nome,senha) {
        try {
            const conexao = await connect()
            const sql = "SELECT * FROM contas where nome = ? AND senha=?"
            const valor = [nome,senha]
            const [lista] = await conexao.query(sql, valor)
            const list = []
            for (let row of lista) {
                const itemprod = new Modcontas(row.nome, row.email, row.senha, row.nivel, row.codigo)
                list.push(itemprod.ToJSON())
            }
            return lista
        } catch (erro) {
            console.log(erro)
            return { status: false, message: erro }
        }
    }

    async PUT(nome, email, senha, nivel, cod) {
        try {
            const conexao = await connect()
            const sql = "UPDATE contas SET nome=?, email=?,senha=?,nivel=? WHERE codigo=?"
            const values = [nome, email, senha, nivel, cod]
            await conexao.query(sql, values)
            return { status: true, message: `conta ${nome} atualizado com sucesso!` }
        } catch (erro) {
            return { status: false, message: (erro) }
        }
    }


    async POST(nome, email, senha, nivel) {
        //ao add vai ter que retornar o id vlw
        try {
            const conexao = await connect()
            const sql = "INSERT INTO contas (nome,email,senha,nivel) VALUES (?,?,?,?)"
            const values = [nome, email, senha, nivel]
            await conexao.query(sql, values)
            return { status: true, message: "Conta adicionado!" }
        } catch (erro) {
            console.log(erro)
            return { status: false, message: erro }
        }
    }

    async DELETE(cod) {
        const conexao = await connect()
        const sql = "DELETE FROM contas WHERE codigo = ?"
        const values = [cod]
        await conexao.query(sql, values)
        return { status: true, message: "conta Apagada!" }
    }
};