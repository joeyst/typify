import { KeyboardEvent, useState } from "react";

function GetText() {
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const textToType = "This is a piece of text that you're supposed to type."

  const setFirstTime = () => {
    if (startTime === 0) {
      setStartTime(Date.now())
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    setFirstTime ()
    if (numIncorrect === 0) {
      if (textToType[numCorrect] === event.key) {
        setNumCorrect(numCorrect + 1)
      }
      else {
        setNumIncorrect(numIncorrect + 1)
      }
    }
    else {
      setNumIncorrect(numIncorrect + 1)
    }
  }

  const handleBackspace = (event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      if (numIncorrect === 0) {
        setNumCorrect(Math.max(numCorrect - 1, 0))
      }
      else {
        setNumIncorrect(numIncorrect - 1)
      }
    }
  }

  const finishGame = (numCorrect: number, desiredText: string) => {
    if (desiredText.length === numCorrect) {
      if (endTime === 0) {
        setEndTime(Date.now())
      }
      return <p style={{fontSize: 25}}>Finished!</p>
    }
  }

  const getSecondsElapsed = () => {
    if (numCorrect === 0 || startTime === 0) {
      return 0
    }
    else if (endTime !== 0) {
      return ((endTime - startTime) / 1000)
    }
    else {
      return ((Date.now() - startTime) / 1000)
    }
  }

  const getWPM = () => {
    if (getSecondsElapsed() === 0) {
      return 0
    }
    else {
      return (getWordsCorrect() * 60 / getSecondsElapsed())
    }
  }

  const getWordsCorrect = () => {
    return (numCorrect / 5)
  }

  function comparedText(desiredText: String) {
    const textMatched = desiredText.slice(0, numCorrect)
    const textMismatched = desiredText.slice(numCorrect, numCorrect+numIncorrect)
    const textLeftUntouched = desiredText.slice(numCorrect+numIncorrect, desiredText.length)
  return <div style={{fontSize: 30}}><span style={{ background: '#62f088'}}>{textMatched}</span><span style={{ backgroundColor: '#f03a5e'}}>{textMismatched}</span><span>{textLeftUntouched}</span> </div>
  }

  return (
    <div tabIndex={1}
    onKeyPress={handleKeyPress} 
    onKeyDown={handleBackspace}
    style={{outline: 0}}
    >
      <p style={{fontSize: 30, textDecorationLine: 'underline'}}>Type</p>
      <p style={{fontSize: 40}}> {comparedText(textToType)} </p>
      <p style={{fontSize: 20}}>WPM: {getWPM()}</p>
      <p style={{fontSize: 15}}> Seconds elapsed: {getSecondsElapsed()}</p>
      {finishGame(numCorrect, textToType)}
      <p></p>
    </div>
  )

}

export default GetText;