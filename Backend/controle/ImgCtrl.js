import modImg from "../modelo/imgMod.js"
import path from 'path';
import toBASE64 from "../Funcões/Base64.js";
import fs from 'fs'


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
                if (resposta['0'].nome == undefined) {
                    return resp.json({ resposta: 'nenhuma foto encontrada' })
                }
                console.log(resposta['0'].nome)
                const filepath = path.join('D:', 'Portifolio', 'Site_Umbrella novo', 'fotos', resposta['0'].nome)
                resp.json({ id: resposta['0'].cod, img: toBASE64(filepath), type: resposta['0'].nome.split('.')[1] })
            })
            return
        }
    };

    //testar no fim de semana
    POST(req, resp) {
        if (req.method == "POST") {
            const body = req.body;
            let nome = body.nome;
            let img = body.imagem;
            let func = body.func;
            let prod = body.prod;
            if (typeof nome=='object'){
                nome = nome[nome.length-1]
                img = img[img.length-1]
                func = func[func.length-1]
                prod=prod[prod.length-1]
            }else{
                console.log(nome)
            }
            

            const filepath = path.join('D:', 'Portifolio', 'Site_Umbrella novo', 'fotos')
            console.log(img)
            const B64 = img.replace(/^data:image\/\w+;base64,/, '')
            const decode = Buffer.from(B64, 'base64')

            fs.writeFile(path.join(filepath, nome), decode, 'binary', (err) => {
                if (err) {
                    resp.status(500).json({ 'message': 'erro' })
                    return
                }
                console.log("salvei amegans")
                resp.json({ 'message': "salva" })
            })


                if (nome) {
                const foto = new modImg(nome, func, prod)
                foto.adicionarDados()
            }
        }
    };

    DELETE(req, resp) {
        if (req.method == 'DELETE') {
            let foto;
            const ans = req.params.name.split(/-/)
            if (ans[1] == 'func') {
                foto = new modImg(null, ans[0], null, null)

            } else if (ans[1] == 'prod') {
                foto = new modImg(null, null, ans[0], null)
            } else {
                foto = new modImg(null, null, null, ans[0])
            }
            foto.excluirDados()
        }
    };

};