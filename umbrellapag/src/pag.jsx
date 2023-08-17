import { useState, useContext, useEffect } from "react"
import ProdList from "./Content/Prod"
import FunList from "./Content/Func"
import VagaList from "./Content/vaga"
import Edicao from "./Content/Editar"
import Pagina from "./Pages/default.jsx"
import { Navibar } from "./Elementos/nav.jsx"
import { FormCad, FormLog, } from "./Content/Form"
import { Contexto } from "./Contextualizacao"
import "./style/Style.css"
import { useParams } from "react-router-dom"

//pag responsavel pelo inicio do site
export function PagHome() {
    return (
        <div>
            <Navibar />
            <Pagina class="" title="" desc="Umbrella corporations, é focada na pesquisa de medicamentos para melhorar a qualidade da sua vida e a de seus entes queridos">

                <img src={require("./foto/UmbrMHlogo.png")} width={'100%'} height={"100%"} alt="Propaganda da umbrella com uma familia feliz"></img>
            </Pagina>
        </div>
    )
};

//pag responsavel por mostrar todos os produtos da empresa, foco agora que cheguei em um break de cadastro e formulario

export function PagProd() {
    return (
        <div>
            <Navibar />
            <Pagina title="Nossos produtos" desc="Aqui um catalogo com todos os produtos vendidos por nós para melhorar a qualidade e longevidade da sua vida">
                <ProdList></ProdList>
            </Pagina>
        </div>
    )
};

//Pag responsavel por descrever a historia da empresa, ainda não esta 100%
export function PagAbout() {
    return (
        <div>
            <Navibar />
            <Pagina title="Sobre nós" desc="A nossa historia até agora">
                <FunList></FunList>
            </Pagina>
        </div>
    )
};

//pag responsavel pelas vagas de emprego ainda não esta 100%
export function PagJobs() {
    return (
        <div>
            <Navibar />
            <Pagina title="Vagas" desc="A umbrella sempre acolhe as mentes mais brilhantes para trabalhar com a gente, veja as vagas disponiveis">
                <VagaList></VagaList>
            </Pagina>
        </div>
    )
};

//Pag responsavel pelo contato da empresa, ainda não esta  100%
export function PagCont() {
    return (
        <div>
            <Navibar />
            <Pagina title="Contato" desc="Nossos contatos">

            </Pagina>
        </div>
    )
};

//pag responsavel por mostrar um formulario de login ou cadastro
export function PagConnect() {
    //com o state tipo posso modificar qual formulario sera mostrado para o usuario
    const [tipo, setTipo] = useState({ funcao: "Login", logged: 0 })

    //se o tipo for login mostra a tela de login
    if (tipo.funcao === "Login") {
        return (
            <div>
                <Navibar />
                {/*ofereco para a prop tipo a função setUser pois assim posso mudar a tela, par serve para a tela entender o que ela esta mostrando atualmente */}
                <Pagina title="Entrar na conta" desc="Conecte-se na sua conta para aproveitar mais funções" par="Log" tipo={setTipo}>
                    <h2>Login</h2>
                    <br />
                    <FormLog />
                </Pagina>
            </div>
        )
    }
    //se o tipo não for mostra a tela de cadastro
    else {
        return (
            <div>
                <Navibar />
                <Pagina title="Criar conta" desc="Crie sua conta para aproveitar mais funções" par="Cad" tipo={setTipo}>
                    <h2>Cadastre</h2>
                    <br />
                    <FormCad />
                </Pagina>
            </div>
        )
    }
};

export function Atualizar() {
    const { user } = useContext(Contexto)
    const [estado, setEstado] = useState('')

    function HandleEstado(valor) {
        setEstado(valor)
    }



    return (
        <div>
            {user.nome === "" ? <Pag404 /> :
                <div>
                    <Navibar />

                    <Pagina title="Adicionar" desc="Adicione um produto,funcionario ou vaga de emprego nos servidores">
                        <button onClick={() => HandleEstado('Item')}>Item</button>
                        <button onClick={() => HandleEstado('Funcionario')}>funcionario</button>
                        <button onClick={() => HandleEstado('Vagas')}>vagas</button>
                        <Edicao estado={estado} />
                    </Pagina>
                </div>

            }
        </div>
    )
}


export function Prod() {


    const { Id } = useParams()
    const { item } = useContext(Contexto)
    const [foto,setFoto] = useState()
    
    console.log(item['img'])

    function toBlob(file, tipo) {
        const byteC = atob(file)
        const byteN = new Uint8Array(byteC.length)
        for (let i = 0; i < byteC.length; i++) {
            byteN[i] = byteC.charCodeAt(i);
        }
        const byteA = new Uint8Array(byteN)
        const blob = new Blob([byteA], { type: `image/${tipo}` })

        console.log('retorno',blob)
        return blob
    }

    useEffect(() => {
        fetch(`http://www.localhost:2023/imagem/${Id}-prod`, { method: 'GET' }).then((resp=>{
            return resp.json()
        })).then((respo=>{
            const x = toBlob(respo['img'],respo['type'])
            const xurl = URL.createObjectURL(x)
            setFoto(xurl)
        }
            ))
            
    }, [])

    
    //se vira com a imagem seu merda
    return (
        <div>
            <Navibar />
            <Pagina title={`${item.nome}:${Id}`} desc={item.desc}>
                <img src={foto} alt="imagem_exemplo" />
            </Pagina>
        </div>
    )
}

//pag 404 aparece quando após o ultimo / é um caminho que o site não possui
export function Pag404() {
    return (
        <div>
            <Navibar />
            <Pagina class="linkurl" title="Infelizmente não encontramos essa pagina" desc="Clique aqui para retornar até a pagina inicial">
                <img src={require('./foto/Error404.png')} alt="erro404" />
                {/*Botão que faz ir para home*/}
            </Pagina>
        </div>
    )
};
