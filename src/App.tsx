import './App.css';
import TypingPage from './Text';
import React from 'react';
import { useState } from 'react';

let listOfTexts : string[]
listOfTexts = [
  "This is a piece of text that you're supposed to type.",
  "This is a second phrase that you may be asked to type."
]

function getRandom() {
    return listOfTexts[Math.floor(Math.random()*listOfTexts.length)]
}

function App() {
  let desiredText: string = getRandom()
  const [typingPage, setTypingPage] = useState(<TypingPage textToType={desiredText} />)

  return (
    <div>
    <div className="App" style={{display:'flex', flexDirection:'row'}}>{typingPage}</div>
    </div>
  );
}

export default App;
