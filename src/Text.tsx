import React, { KeyboardEvent, useState, useRef, useEffect, MutableRefObject } from "react";
import RenderText from './TextRenderer';
import RenderWPM from './WPM';
import RenderSecondsElapsed from './SecondsElapsed';
import RenderType from './RenderType';
import RenderGameFinished from './RenderGameFinished';
import RenderDisplayStats from './RenderDisplayStats';

function TypingPage(props: any) {
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [numIncorrect, setNumIncorrect] = useState<number>(0);
  const [mostCorrect, setMostCorrect] = useState(0);

  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [endTime, setEndTime] = useState<number | undefined>(undefined);
  const [finished, setFinished] = useState(false);

  const textToType : string = props.textToType
  const textToFocus = useRef<any>(null)
  const [recordOfTimes, setRecordOfTimes] = useState<any[]>([])

  const handleKeyPress = (event: KeyboardEvent) => {
    handleNumCorrect(event)
    setStartIfStarted()
    setFinishedIfFinished()
    handleSetTime()
  }

  const setFinishedIfFinished = () => {
    if (numCorrect === textToType.length && finished === false) {
      setFinished(true)
      setEndTime(Date.now())
    }
  }

  const setStartIfStarted = () => {
    if (startTime === undefined) {
      setStartTime(Date.now())
    }
  }

  const handleSetTime = () => {
    if (recordOfTimes[mostCorrect] === undefined) {
      setRecordOfTimes([...recordOfTimes, Date.now()])
    }
  }

  const handleNumCorrect = (event: KeyboardEvent) => {
    if (finished === false) {
      if (numIncorrect > 0) { 
        setNumIncorrect(numIncorrect+1)
      }
      else if (event.key == textToType[numCorrect]) {
        setNumCorrect(numCorrect+1)
      }
      else {
        setNumIncorrect(numIncorrect+1)
      }
    }
    if (numCorrect > mostCorrect) {
      setMostCorrect(numCorrect)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      if (numIncorrect === 0) {
        setNumCorrect(Math.max(numCorrect - 1, 0))
      }
      else {
        setNumIncorrect(numIncorrect - 1)
      }
    }
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