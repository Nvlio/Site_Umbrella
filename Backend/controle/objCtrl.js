import modObj from "../modelo/objMod.js"
import imagectrl from "./ImgCtrl.js"

//classe que permite realizar metodos para cada requisição feita ao servidor
export default class objectCtrl {
    async GET(req, resp) {
        if (req.method == "GET") {
            const prod = new modObj(null, null, null, null)
            prod.pegarDados().then((resposta) => {
                console.log(resposta)
                return resp.json(resposta)
            })
        } else {
            return resp.json({ status: false })
        }
    };

    async GETID(req, resp) {
        if (req.method = "GET") {
            const prod = new modObj(req.params.nome, null, null, null)
            prod.pegardadosNome().then((resposta) => {
                console.log(resposta)
                return resp.json(resposta)
            })
        } else {
            return resp.json({ status: false })
        }
    }

    async PUT(req, resp) {
        if (req.method == "PUT" && req.is("application/json")) {
            const body = req.body;
            const nome = body.nome;
            const desc = body.desc;
            const valor = body.valor;


            if (nome, desc) {
                const prod = new modObj(nome, desc, req.params.id, valor)
                prod.atualizaDados().then((resposta) => {
                    return resp.json(resposta)
                })
            }
            else { return resp.json({ status: false, message: "dados incompletos" }) }
        }
        else {
            return resp.json({ status: false, message: "metodo não permitido" })
        }
    }

    async POST(req, resp) {
        if (req.method == "POST" && req.is("application/json")) {
            const body = req.body;
            const nome = body.nome;
            const desc = body.desc;
            const cod = body.cod;
            const valor = body.dif;

            if (nome, desc, fotoM, cod) {
                const Prod = new modObj(nome, desc ,cod, valor)
                Prod.adicionarDados().then((resposta) => {
                    return resp.json(resposta)
                })
            }
        }
    }

    async DEL(req, resp) {
        if (req.method == "DELETE") {
            const prod = new modObj(null, null, req.params.id, null)
            prod.excluirDados().then((resposta) => {
                return resp.json(resposta)
            })
        }
    }
}