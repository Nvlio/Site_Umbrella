import conectar from "./Conexão.js";
import Prodmod from "../Modelo/ProdMod.js";

export default class Prodsql {
    async GET() {
        try{
        const conexao = await conectar()
        const sql = "SELECT * FROM Produtos";
        const [produtos] = conexao.query(sql)
        const lista = []
        for (let prod of produtos) {
            const produto = new Prodmod(prod.nome, prod.foto, prod.desc)
            lista.push(produto.ToJSON())
        }
        return lista
    }
        catch(error){
            const erro=error
            return {"status":false,"message":error}
        }

    }
}