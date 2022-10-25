import './App.css';
import Figure from './components/Figure';
import Header from './components/Header';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import { useEffect, useState } from 'react';
import {showNotification as show} from './helpers/helpers'; 
import { words } from './data';
import Hint from './components/Hint'

let randomWord = words[Math.floor(Math.random()*words.length)]
let selectedWord = randomWord.word;
let selectedHint = randomWord.hint;

function App() {

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key;

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters  => [...currentLetters, letter]);

          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters  => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown' , handleKeydown);

    return () => window.removeEventListener('keydown' , handleKeydown);

  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random()*words.length);
    selectedWord = words[random].word;
    selectedHint = words[random].hint;
  }

  return (
    <>
      <Header/> 
      <Hint selectedHint={selectedHint}/>
      <div className='game-container'>
        
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} selectedHint={selectedHint}/>
      </div>
        <Popup wrongLetters={wrongLetters} correctLetters={correctLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
        <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
