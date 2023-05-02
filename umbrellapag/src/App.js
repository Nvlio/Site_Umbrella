import './App.css';
import {PagHome,  Pag404, PagProd } from './pag.jsx';
import Navibar from './Elementos/nav.jsx';
import { Route,BrowserRouter,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navibar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PagHome/>}/>
          <Route path="/Prod" element={<PagProd/>}/>
          <Route path="/*" element={<Pag404/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
