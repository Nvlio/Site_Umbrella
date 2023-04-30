import modObj from "../modelo/objMod.js"

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
            const fotoM = body.fotoM;


            if (nome, desc) {
                const prod = new modObj(nome, desc, fotoM, req.params.id)
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
            const fotoM = body.fotoM;
            const cod = body.cod;

            if (nome, desc, fotoM, cod) {
                const Prod = new modObj(nome, desc, fotoM, cod)
                Prod.adicionarDados().then((resposta) => {
                    return resp.json(resposta)
                })
            }
        }
    }

    async DEL(req, resp) {
        if (req.method == "DELETE") {
            const prod = new modObj(null, null, null, req.params.id)
            prod.excluirDados().then((resposta) => {
                return resp.json(resposta)
            })
        }
    }
}