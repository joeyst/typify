import React from 'react';

function RenderWPM(props: any): JSX.Element {
  const getWPM = (numCorrect: number, secondsElapsed: number) => {
    return (12 * numCorrect / secondsElapsed)
  }

  const getSecondsElapsed = (startTime: any, endTime: any) => {
    if (startTime === 0) {
      return 0
    }
    else if (endTime === 0) {
      return ((Date.now() - startTime) / 1000)
    }
    else {
      return ((endTime - startTime) / 1000)
    }
  }

  let wpm = getWPM(props.numCorrect, getSecondsElapsed(props.startTime, props.endTime))
  return <p style={{fontSize: 20}}>WPM: {wpm}</p>
}

export default RenderWPM;