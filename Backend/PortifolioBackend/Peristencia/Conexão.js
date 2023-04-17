import mysql from "mysql2/promise"



export default async function conectar(){
    if (global.conexao || global.conexao.status!="disconnected"){
        return conexao
    }else{
        const conexao = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"Umbrella"
        })
        global.conexao=conexao
        return conexao
    }
}