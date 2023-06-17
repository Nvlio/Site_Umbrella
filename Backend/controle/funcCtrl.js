import modfunc from "../modelo/funcMod.js"

//classe que permite realizar metodos para cada requisição feita ao servidor
export default class funcCtrl {
    async GET(req, resp) {
        console.log('chamou')
        if (req.method == "GET") {
            const prod = new modfunc(null, null, null, null,null)
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
            const prod = new modfunc(req.params.nome, null, null, null,null)
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
            const nvl = body.nvl;


            if (nome, desc) {
                const prod = new modfunc(nome, desc, fotoM, req.params.id,nvl)
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
            const nvl = body.nvl;

            if (nome, desc, fotoM, cod) {
                const Prod = new modfunc(nome, desc, fotoM, cod,nvl)
                Prod.adicionarDados().then((resposta) => {
                    return resp.json(resposta)
                })
            }
        }
    }

    async DEL(req, resp) {
        if (req.method == "DELETE") {
            const prod = new modfunc(null, null, null, req.params.id,null)
            prod.excluirDados().then((resposta) => {
                return resp.json(resposta)
            })
        }
    }
}