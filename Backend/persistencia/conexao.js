import mysql from "mysql2/promise"

//função responsavel por conectar o sql
function connect(){
    if (global.conexao && global.conexao.status!="disconnected"){
        return global.conexao
    }else{
        const conexao= mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"umbrellacorps"
        })
        global.conexao=conexao
        return global.conexao
    }
}

export default connect