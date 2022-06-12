import React from 'react';

function RenderWPM(props: any): JSX.Element {
  const getWPM = () => {
    return (12 * props.numCorrect / props.secondsElapsed)
  }

  return <p style={{fontSize: 20}}>WPM: {getWPM()}</p>
}

export default RenderWPM;