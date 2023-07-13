import { response } from "express";
import Modcontas from "../modelo/contMod.js";

export default class Ctrlcontas {

    async GET(req, resp) {
        if (req.method == 'GET') {
            const modeloC = new Modcontas(null, null, null, null, null)
            modeloC.pegarDados().then((resposta=>{
                resp.json(resposta)
                return 
            })).catch((err=>{
                console.log(err)
            }))
        }
    }

    async GETVAL(req, resp) {
        if (req.method == 'GET') {
            const valor = req.params.Infos.split(/-/)
            const modeloC = new Modcontas(valor[0],null,valor[1],null,null)
            modeloC.Logar().then((resposta=>{
                return resp.json(resposta)
            })).catch((err=>{
                return resp.json({message:err})
            }))
        }
    }

    async POST(req, resp) {
        if (req.method == 'POST' && req.is('application/json')) {
            const body = req.body;
            const nome = body.nome;
            const email = body.email;
            const senha = body.senha;
            const nivel = body.nivel;
            if (nome, email, senha, nivel) {
                const modeloC = new Modcontas(nome, email, senha, nivel, null)
                modeloC.adicionarDados().then((resposta=>{
                    return resp.json(resposta)
                })).catch((err=>{
                    return resp.json({message:err})
                }))
            }
        }
    }

    //vai ter que colocar id depois mas depois
    async PUT(req, resp) {
        if (req.method == 'PUT' && req.is('application/json')) {
            const body = req.body;
            const nome = body.nome;
            const email = body.email;
            const senha = body.senha;
            const nivel = body.nivel;
            if (nome, email, senha, nivel) {
                const modeloC = new Modcontas(nome, email, senha, nivel, null)
                modeloC.atualizarDados().then((resposta=>{
                    return resp.json(resposta)
                })).catch((err=>{
                    return resp.json({message:err})
                }))
            }
        }
    }

    async DELETE(req, resp) {
        if (req.method == 'DELETE') {
            const modeloC = new Modcontas(null, null, null, null, req.params.id)
            modeloC.deletarDados().then((resposta=>{
                return resp.json(resposta)
            })).catch((err=>{
                return resp.json({message:err})
            }))
        }
    }

};