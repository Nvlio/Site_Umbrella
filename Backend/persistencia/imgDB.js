import connect from "./conexao.js";
import modImg from "../modelo/imgMod.js";
import fs from 'fs'
import { rejects } from "assert";

//classe responsavel para a comunicação e execução correta de dados vindos do sql
export default class dbImg {

    async GET() {
        const conexao = await connect()
        const sql = "SELECT * FROM funcionario"
        const [list] = await conexao.query(sql)
        const lista = []
        for (let row of list) {
            const itemprod = new modFunc(row.Nome, row.Descricao, row.codigo, row.nivel)
            lista.push(itemprod.ToJson())
        }
        return lista
    }

    async GETID(pcod, fcod, cod) {
        try {
            const conexao = await connect()
            let valor
            let field
            if (pcod) {
                valor = [pcod]
                field = 'prod'
            } else if (fcod) {
                valor = [fcod]
                field = 'func'
            }
            const sql = `SELECT * FROM imagens where ${field} = ?`

            const [lista] = await conexao.query(sql, valor)
            const list = []
            for (let row of lista) {
                const itemimg = new modImg(row.imagem, row.func, row.prod, row.cod)
                list.push(itemimg.ToJson())
                console.log(itemimg.ToJson())
            }
            console.log(list)
            return list
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

    async POST(nome, fun, pro) {
        try {
            const conexao = await connect()
            const sql = "INSERT INTO imagens (imagem,func,prod) VALUES (?,?,?)"
            const values = [nome, fun, pro]
            console.log(values)

            await conexao.query(sql, values)
            return { status: true, message: "Funcionario adicionado!" }
        } catch (erro) {
            console.log(erro)
            return { status: false, message: erro }
        }
    }

    //metodo que excluir arquivo 
    async Exclude(name){
        const path = 'D:/Portifolio/Site_Umbrella novo/fotos'
            fs.unlink(`${path}/${name}`,(err)=>{
                if(err){
                    return {msg:'ocorreu um erro ao excluir foto'}
                }else{
                    return {msg:"imagem excluida com sucesso!"}
                }
            })
        
    }

    //ao excluir verifica qual o codigo forneceido, ele recupera o nome e realiza a exclusaõa do arquivo referido
    async DELETE(fcod, pcod, cod) {
        const conexao = await connect()
        let values;
        let code;
        let name;
        if (fcod != null) {
            code = 'func'
            values = [fcod]

        } else if (pcod != null) {
            code = 'prod'
            values = [pcod]

        } else {
            code='cod'
            values = [cod]
        }
        name = await this.GETID(pcod,fcod,cod)
        await this.Exclude(name[0]['nome'])
        const sql = `DELETE FROM imagens WHERE ${code} = ?`
        await conexao.query(sql, values)
        return { status: true, message: "imagem Apagada!" }
    }
};