import './App.css';
import TypingPage from './Text';
import React from 'react';
import { useState } from 'react';
import getRandomString from './JSONInteraction';

function App() {
  let desiredText: string = getRandomString()
  const [typingPage, setTypingPage] = useState(<TypingPage textToType={desiredText} />)

  return (
    <div>
    <div className="App" style={{display:'flex', flexDirection:'row'}}>{typingPage}</div>
    </div>
  );
}

export default App;
