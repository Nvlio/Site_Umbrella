import { useState } from "react"
import ProdList from "./Content/Prod"
import Pagina from "./Pages/default.jsx"
import { Navibar } from "./Elementos/nav.jsx"
import { FormCad, FormLog, } from "./Content/Form"
import "./style/Style.css"

//pag responsavel pelo inicio do site
export function PagHome() {
    return (
        <div>
            <Navibar/>
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
            <Navibar/>
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
            <Navibar/>
            <Pagina title="Sobre nós" desc="A nossa historia até agora">
                {/*Aqui vai ficar a pag com lista e edescrição dos criadores da umbrella*/}
            </Pagina>
        </div>
    )
};

//pag responsavel pelas vagas de emprego ainda não esta 100%
export function PagJobs() {
    return (
        <div>
            <Navibar/>
            <Pagina title="Vagas" desc="A umbrella sempre acolhe as mentes mais brilhantes para trabalhar com a gente, veja as vagas disponiveis"></Pagina>
        </div>
    )
};

//Pag responsavel pelo contato da empresa, ainda não esta  100%
export function PagCont() {
    return (
        <div>
            <Navibar/>
            <Pagina title="Contato" desc="Nossos contatos">

            </Pagina>
        </div>
    )
};

//pag responsavel por mostrar um formulario de login ou cadastro
export function PagConnect() {
    //com o state tipo posso modificar qual formulario sera mostrado para o usuario
    const [ tipo, setTipo ] = useState({funcao:"Login",logged:0})

    //se o tipo for login mostra a tela de login
    if (tipo.funcao==="Login"){
    return (
        <div>
            <Navibar/>
            {/*ofereco para a prop tipo a função setUser pois assim posso mudar a tela, par serve para a tela entender o que ela esta mostrando atualmente */}
            <Pagina title="Entrar na conta" desc="Conecte-se na sua conta para aproveitar mais funções" par="Log" tipo={setTipo}>
                <h2>Login</h2>
                <br/>
                <FormLog/>
            </Pagina>
        </div>
    )} 
    //se o tipo não for mostra a tela de cadastro
    else{
        return (
            <div>
                <Navibar/>
                <Pagina title="Criar conta" desc="Crie sua conta para aproveitar mais funções" par="Cad" tipo={setTipo}>
                    <h2>Cadastre</h2>
                    <br/>
                    <FormCad/>
                </Pagina>
            </div>
        )
    }
};

//pag 404 aparece quando após o ultimo / é um caminho que o site não possui
export function Pag404() {
    return (
        <div>
            <Navibar/>
            <Pagina class="linkurl" title="Infelizmente não encontramos essa pagina" desc="Clique aqui para retornar até a pagina inicial">
                <img src={require('./foto/Error404.png')} alt="erro404" />
                {/*Botão que faz ir para home*/}
            </Pagina>
        </div>
    )
};
