import React from 'react';

function RenderSecondsElapsed(props: any) {
  return <p style={{fontSize: 15}}>Seconds elapsed: {props.secondsElapsed}</p>
}

export default RenderSecondsElapsed;