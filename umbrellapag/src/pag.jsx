import Navibar from "./Elementos/nav.jsx"
import Pagina from "./Pages/default.jsx"

export function PagHome(){
    return(
        <div><Navibar/>
        <Pagina title="Home slaa" desc="Bem vindo a umbrella pharmaceutical group.">
            <h1>SalHome</h1>
        </Pagina>
        </div>
    )
};

export function PagProd(){
    return(
        <div><Navibar/><h1>slaProd</h1></div>
    )
};

export function PagAbout(){
    return(
        <div><Navibar/><h1>slaAbout</h1></div>
    )
};

export function PagJobs(){
    return(
        <div>
            <Navibar/>
            
        </div>
    )
};

export function PagCont(){
    return(
        <div><Navibar/><h1>slaContact</h1></div>
    )
};

export function Pag404(){
    return(
        <div><Navibar/><h1>sla404</h1></div>
    )
};
