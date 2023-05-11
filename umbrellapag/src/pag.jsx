import Navibar from "./Elementos/nav.jsx"
import Pagina from "./Pages/default.jsx"

export function PagHome(){
    return(
        <div><Navibar/>
        <Pagina title="" desc="Umbrella corporations, é focada na pesquisa de medicamentos para melhorar a qualidade da sua vida e a de seus entes queridos">
            <img src={require("./foto/UmbrMHlogo.png")}width={'100%'} height={"100%"} alt="Propaganda da umbrella com uma familia feliz"></img>
        </Pagina>
        </div>
    )
};

export function PagProd(){
    return(
        <div>
            <Navibar/>
            <Pagina title="Nossos produtos" desc="Aqui um catalogo com todos os produtos vendidos por nós para melhorar a qualidade e longevidade da sua vida">
                {/*aqui vai ser referenciado a pag que vai ter a lista de produtos*/}
            </Pagina>
        </div>
    )
};

export function PagAbout(){
    return(
        <div>
            <Navibar/>
            <Pagina title="Sobre nós" desc="A nossa historia até agora">
                {/*Aqui vai ficar a pag com lista e edescrição dos criadores da umbrella*/}
            </Pagina>
        </div>
    )
};

export function PagJobs(){
    return(
        <div>
            <Navibar/>
            <Pagina title="Vagas" desc="A umbrella sempre acolhe as mentes mais brilhantes para trabalhar com a gente, veja as vagas disponiveis"></Pagina>
        </div>
    )
};

export function PagCont(){
    return(
        <div>
            <Navibar/>
            <Pagina title="Contato" desc="Nossos contatos">
                
            </Pagina>    
        </div>
    )
};

export function Pag404(){
    return(
        <div>
            <Navibar/>
            <Pagina class="linkurl" title="Infelizmente não encontramos essa pagina" desc="Clique aqui para retornar até a pagina inicial">
                <img src={require('./foto/Error404.png')} alt="erro404"/>
                {/*Botão que faz ir para home*/}
            </Pagina>
        </div>
    )
};
