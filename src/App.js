import './App.css';
import CocktailList from './components/CocktailList';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Cocktail from './components/Cocktail';
import QrCode from './components/QrCode';
import Settings from './components/Settings';
import Final from './components/Final';
import Mix from './components/Mix';
import ManualMix from './components/ManualMix';
import CocktailSettings from './components/CocktailSettings';
import Cleaning from './components/Cleaning';




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
        <Route path='/mix' element={<Mix/>} />
        <Route path='/manual' element={<ManualMix/>} />
        <Route path='/drinksettings' element={<CocktailSettings/>} />
        <Route path='/clean' element={<Cleaning/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
