import './App.css';
import {PagHome,  Pag404, PagProd, PagAbout, PagJobs, PagCont } from './pag.jsx';
import { Route,BrowserRouter,Routes } from 'react-router-dom';

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
          <Route path="/*" element={<Pag404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
