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

  const [started, setStarted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [finished, setFinished] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<number | undefined>(undefined);

  const textToType : string = props.textToType
  const textToFocus = useRef<any>(null)
  const [recordOfTimes, setRecordOfTimes] = useState<any[]>([])

  const handleKeyPress = (event: KeyboardEvent) => {
    if (finished === false) {
      setStartIfStarted()
      adjustNumCorrect(event)
      handleSetTime()
      setFinishedIfFinished(event)
    }
  }

  const adjustNumCorrect = (event: KeyboardEvent) => {
    if (numIncorrect > 0) {
      setNumIncorrect(numIncorrect+1)
    }
    else {
      if (textToType[numCorrect] === event.key) {
        setNumCorrect(numCorrect+1)
      }
      else {
        setNumIncorrect(numIncorrect+1)
      }
    }
    if (numCorrect > mostCorrect) {setMostCorrect(numCorrect)}
  }

  const secondsElapsed = () => {
    if (started === false) {
      return 0
    }
    else if (finished === false && startTime !== undefined) {
      return ((Date.now() - startTime)/1000)
    }
    else if (startTime !== undefined && endTime !== undefined) {
      return ((endTime - startTime)/1000)
    }
  }
  
  const setStartIfStarted = () => {
    if (started === false) {
      setStarted(true)
      setStartTime(Date.now())
    }
  }

  const setFinishedIfFinished = (event: KeyboardEvent) => {
    if (numCorrect === textToType.length-1 && numIncorrect === 0 && finished === false && event.key === textToType[numCorrect]) {
      setFinished(true)
      setEndTime(Date.now())
      setRecordOfTimes([...recordOfTimes, secondsElapsed(), 0, 0, 0, 0, 0, 0, 0])
    }
  }

  const handleSetTime = () => {
    if (recordOfTimes[mostCorrect] === undefined) {
      setRecordOfTimes([...recordOfTimes, secondsElapsed()])
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (finished === false) {
      if (event.key === "Backspace") {
        if (numIncorrect === 0) {
          setNumCorrect(Math.max(numCorrect - 1, 0))
        }
        else {
          setNumIncorrect(numIncorrect - 1)
        }
      }
    }
  }

  const resetState = () => {
    setNumCorrect(0)
    setNumIncorrect(0)
    setMostCorrect(0)
    setStartTime(undefined)
    setEndTime(undefined)
    setStarted(false)
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
          <RenderWPM numCorrect={numCorrect} secondsElapsed={secondsElapsed()} />
          <RenderSecondsElapsed secondsElapsed={secondsElapsed()}/>
        <RenderGameFinished finished={finished}/>
        <RenderDisplayStats finished={finished} stats={recordOfTimes} textToType={textToType} />
      </div>
      <button onClick={resetState}>Reset</button>
    </div>
  )

}

export default TypingPage;