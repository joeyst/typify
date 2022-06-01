import { KeyboardEvent, useState } from "react";

function GetText() {
  const [typed, setTyped] = useState("");

  const textToType = "abcde"

  const handleKeyPress = (event: KeyboardEvent) => {
    setTyped(typed + event.key)
  }

  const handleBackspace = (event: KeyboardEvent) => {
    if (typed !== "" && event.key === "Backspace") {
      setTyped(typed.slice(0,-1))
      console.log(event.keyCode)
    }
  }

  function getNumMatched(desiredText: String, actualText: String): number {
    let numMatched = 0
    for (let i = 0; i < desiredText.length; i++) {
      if (desiredText[i] === actualText[i]) {
        numMatched += 1
      }
      else {
        return numMatched
      }
    }
    return numMatched
  }

  function getNumIncorrect(desiredText: String, actualText: String) {
    return (actualText.length - getNumMatched(desiredText, actualText))
  }

  function comparedText(desiredText: String, actualText: String) {
    const numMatched = getNumMatched(desiredText, actualText)
    const numIncorrect = getNumIncorrect(desiredText, actualText)
    const textMatched = actualText.slice(0, Math.max(0, numMatched))
    const textMismatched = actualText.slice(Math.max(numMatched), Math.max(numMatched)+numIncorrect)
  return <div style={{fontSize: 30}}> <span style={{ background: '#0fff00' }}>{textMatched}</span><span style={{ backgroundColor: '#f06060'}}>{textMismatched}</span> </div>
  }

  return (
    <div tabIndex={1}
    onKeyPress={handleKeyPress} 
    onKeyDown={handleBackspace}
    style={{outline: 0}}
    >
      <p> Type: {textToType} </p>
      {comparedText(textToType, typed)}
    </div>
  )

}

export default GetText;