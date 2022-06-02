import React, { KeyboardEvent, useState, useRef, useEffect, MutableRefObject } from "react";
import RenderText from './TextRenderer';
import RenderWPM from './WPM';
import RenderSecondsElapsed from './SecondsElapsed';
import RenderType from './RenderType';
import RenderGameFinished from './RenderGameFinished';
import RenderDisplayStats from './RenderDisplayStats';

function TypingPage(props: any) {
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [mostCorrect, setMostCorrect] = useState(0);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [finished, setFinished] = useState(false);

  const textToType = props.textToType
  const textToFocus = useRef<any>(null)
  let arrOfDates: any[] = []
  const [recordOfTimes, setRecordOfTimes] = useState<any[]>([])

  const handleKeyPress = (event: KeyboardEvent) => {
    console.log(recordOfTimes.map( (e,i) => (i+1+"."+e ) ).join(' '));
    handleStartTime()
    handleEndTime()
    handleLetter(event)
    handleMaxCorrect()
    handleSetTime(event)
    if (numCorrect === textToType.length-1) {
      handleFinish(event)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    handleBackspace(event)
  }

  const handleStartTime = () => {
    if (startTime === 0) {
      setStartTime(Date.now())
    }
  }

  const handleEndTime = () => {
    if (endTime === 0 && numCorrect === textToType.length-1) {
      setEndTime(Date.now())
    }
  }

  const handleLetter = (event: KeyboardEvent) => {
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

  const handleMaxCorrect = () => {
    if (numCorrect > mostCorrect) {
      setMostCorrect(numCorrect)
    }
  }

  const handleSetTime = (event: KeyboardEvent) => {
    if (recordOfTimes[mostCorrect] === undefined) {
      setRecordOfTimes([...recordOfTimes, Date.now()])
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

  const handleFinish = (event: KeyboardEvent) => {
    setFinished(true)
  }

  const resetState = () => {
    setNumCorrect(0)
    setNumIncorrect(0)
    setStartTime(0)
    setEndTime(0)
    setFinished(false)
    setRecordOfTimes([])
    textToFocus.current.focus()
  }

  return (
    <div>
      <div tabIndex={1}
      onKeyPress={handleKeyPress} 
      onKeyDown={handleKeyDown}
      style={{outline: 0}}
      ref={textToFocus}>
        <RenderType />
        <RenderText numCorrect={numCorrect} numIncorrect={numIncorrect} desiredText={textToType} />
          <RenderWPM numCorrect={numCorrect} startTime={startTime} endTime={endTime} />
          <RenderSecondsElapsed startTime={startTime} endTime={endTime}/>
        <RenderGameFinished finished={finished}/>
        <RenderDisplayStats finished={finished} stats={recordOfTimes} textToType={textToType} />
      </div>
      <button onClick={resetState}>Reset</button>
    </div>
  )

}

export default TypingPage;