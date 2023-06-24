import modImg from "../modelo/imgMod.js"
import path from 'path';


export default class imagectrl {
    async GET(req, resp) {
        console.log('Caneta azulll')
        return resp.json({ azul: 'retorna' })
    };

    GETNAME(req, resp) {
        if (req.method === 'GET') {
            const ans = req.params.name.split(/-/)
            let imagem
            if (ans[1] == 'func') {
                imagem = new modImg(null, ans[0], null)
            }
            else if (ans[1] == 'prod') {
                imagem = new modImg(null, null, ans[0])
            }

            imagem.pegardadosId().then((resposta) => {
                console.log(resposta['0'].nome)
                const filepath = path.join('D:', 'Portifolio', 'Site_Umbrella novo', 'fotos', resposta['0'].nome)
                return resp.sendFile(filepath)
            })
        }
    };

    POST(req, resp) {
        if (req.method=="POST" && req.is('application/json')){
            const body = req.body;
            const nome = body.imagem;
            const func = body.func;
            const prod = body.prod;

            if (nome){
                const foto = new modImg(nome,func,prod)
                foto.adicionarDados()
            }
        }
    };

    DELETE(req, resp) {
        console.log(req)
        return resp.json({ azul: 'embora' })
    };

};