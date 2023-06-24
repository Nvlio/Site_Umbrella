import connect from "./conexao.js";
import modImg from "../modelo/imgMod.js";

//classe responsavel para a comunicação e execução correta de dados vindos do sql
export default class dbImg {

    async GET() {
        const conexao = await connect()
        const sql = "SELECT * FROM funcionario"
        const [list] = await conexao.query(sql)
        const lista = []
        for (let row of list) {
            const itemprod = new modFunc(row.Nome, row.Descricao, row.codigo,row.nivel)
            lista.push(itemprod.ToJson())
        }
        return lista
    }

    async GETID(pcod,fcod) {
        try{
        const conexao = await connect()
        let valor
        let field
        if(pcod){
            valor = [pcod]
            field='prod'
        }else if(fcod){
            valor = [fcod]
            field='func'
        }
        const sql = `SELECT * FROM imagens where ${field} = ?`
        
        const [lista] = await conexao.query(sql, valor)
        const list = []
        for (let row of lista) {
            const itemimg = new modImg(row.imagem, row.id, row.func, row.prod)
            list.push(itemimg.ToJson())
            console.log(itemimg.ToJson())
        }
        console.log(list)
        return list
    }catch(erro){
        return {status:false,message:erro}
    }
    }

    async PUT(nome, desc, cod,nivel) {
        console.log(nome,desc,cod,nivel)
        try {
            const conexao = await connect()
            const sql = "UPDATE funcionario SET nome=?, descricao=?,nivel=? WHERE codigo=?"
            const values = [nome, desc,  cod,nivel]
            await conexao.query(sql, values)
            return { status: true, message: `Funcionario ${nome} atualizado com sucesso!` }
        }catch(erro){
            return {status:false,message:(erro)}
        }
    }

    async POST(nome, fun,  pro){
        try{
            const conexao = await connect()
            const sql = "INSERT INTO imagens (imagem,func,prod) VALUES (?,?,?)"
            const values = [nome,fun,pro]
            console.log(values)

            await conexao.query(sql,values)
            return {status:true,message:"Funcionario adicionado!"}
        }catch(erro){
            console.log(erro)
            return {status:false,message:erro}
        }
    }

    async DELETE(cod){
        const conexao = await connect()
        const sql = "DELETE FROM funcionario WHERE codigo = ?"
        const values = [cod]
        await conexao.query(sql,values)
        return {status:true,message:"funcionario Apagado!"}
    }
};