import './App.css';
import {PagHome,  Pag404, PagProd, Atualizar, PagAbout, PagJobs, PagCont, Prod, PagConnect } from './pag.jsx';
import { Route,BrowserRouter,Routes } from 'react-router-dom';

/*principal*/

//basico
//colocar sistema de cookie.                                                                        -desconhecido
//salvar no cookies a conta do user.                                                                -desconhecido
//adicionar função para compra de produtos.                                                                -facil
//adicionar uma pagina que pega os dados especificos doitem e mostra só eles                        -acho que sei
//salvar no cookie lista de compras.                                                                -desconhecido 
//adicionar uma pagina para usuarios acima do nivel 4 que permite analisar vendas                          -facil
//modificar o site para atender ao nivel de hierarquia                                                    -rapido 
//(onde pessoas de x nivel não podem fazer coisas de x+1 nivel)

//completo
//adicionar outras paginas ao usuario entrar em uma conta de nivel acima de 2                       -acho que sei
//adicionar pagina de  critauras                                                                           -facil
//adicionar pagina de virus                                                                                -facil
//adicionar pagna com locais de interesse                                                                  -facil
//adicionar alo como um forum                                                                       -acho que sei

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PagHome/>}/>
          <Route path="/Prod" element={<PagProd/>}/>
          <Route path="/About" element={<PagAbout/>}/>
          <Route path="/Jobs" element={<PagJobs/>}/>
          <Route path="/Contact" element={<PagCont/>}/>
          <Route path="/LogCad" element={<PagConnect/>}/>
          <Route path="/Update" element={<Atualizar/>}/>
          <Route path="/Produto/:Id" element={<Prod/>}/>
          <Route path="/*" element={<Pag404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
