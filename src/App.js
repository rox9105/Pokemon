import { Route } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import MainPageContainer from './mainPage/MainPageContainer';
import PokemonContainer from './mainPage/pokemon/PokemonContainer';

const App = () => {
  return (
    <div className='app-wrapper' >
      <Header />
      <div className='app-wrapper-content'>
        <Route exact path='/' render={ () => <MainPageContainer /> } />
        <Route path='/pokemon' render={ () => <PokemonContainer /> } />
      </div>
    </div>
  );
}

export default App;
