import logo from './logo.svg';
import './App.css';
import Hangman from './components/HangmanUI';
import { HomePage } from './page/home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HangmanLevelEasy from './Levels/Easy';
import HangmanLevelModerate from './Levels/Moderate';
import HangmanLevelDifficulty from './Levels/Difficult';

function App() {
  return (
    <>
      <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/levelEasy' element={<HangmanLevelEasy/>}/>
      <Route path='/levelModerate' element={<HangmanLevelModerate/>}/>
      <Route path='/levelDifficulty' element={<HangmanLevelDifficulty/>}/>
      </Routes>
      </Router>
    </>
   
  );
}

export default App;
