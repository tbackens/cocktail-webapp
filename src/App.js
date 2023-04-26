import './App.css';
import CocktailList from './components/CocktailList';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Cocktail from './components/Cocktail';
import QrCode from './components/QrCode';
import Settings from './components/Settings';
import Final from './components/Final';


function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<CocktailList/>}/>
        <Route path='/cocktails/mix' element={<Cocktail/>}/>
        <Route path='/qr' element={<QrCode/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/final' element={<Final/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
