import { useState } from "react"
import ProdList from "./Content/Prod"
import Pagina from "./Pages/default.jsx"
import { Navibar } from "./Elementos/nav.jsx"
import { FormCad, FormLog, } from "./Content/Form"
import "./style/Style.css"


export function PagHome() {
    return (
        <div>
            <Navibar/>
            <Pagina title="" desc="Umbrella corporations, é focada na pesquisa de medicamentos para melhorar a qualidade da sua vida e a de seus entes queridos">
                <img src={require("./foto/UmbrMHlogo.png")} width={'100%'} height={"100%"} alt="Propaganda da umbrella com uma familia feliz"></img>
            </Pagina>
        </div>
    )
};

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

export function PagJobs() {
    return (
        <div>
            <Navibar/>
            <Pagina title="Vagas" desc="A umbrella sempre acolhe as mentes mais brilhantes para trabalhar com a gente, veja as vagas disponiveis"></Pagina>
        </div>
    )
};

export function PagCont() {
    return (
        <div>
            <Navibar/>
            <Pagina title="Contato" desc="Nossos contatos">

            </Pagina>
        </div>
    )
};

export function PagConnect() {
    const [ tipo, setTipo ] = useState("Login")

    if (tipo==="Login"){
    return (
        <div>
            <Navibar/>
            <Pagina title="faça Login" desc="Conecte-se na sua conta para aproveitar mais funções" par="Log" tipo={setTipo}>
                <h1>Login</h1>
                <FormLog/>
            </Pagina>
        </div>
    )} else{
        return (
            <div>
                <Navibar/>
                <Pagina title="Cadastre " desc="Crie sua conta para aproveitar mais funções" par="Cad" tipo={setTipo}>
                    <h1>Cadastro</h1>
                    <FormCad/>
                </Pagina>
            </div>
        )
    }
};

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
