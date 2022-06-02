import React from 'react';

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

function RenderSecondsElapsed(props: any) {
  return <p style={{fontSize: 15}}>Seconds elapsed: {getSecondsElapsed(props.startTime, props.endTime)}</p>
}

export default RenderSecondsElapsed;