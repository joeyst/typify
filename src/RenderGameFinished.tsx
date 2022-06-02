import React from 'react';

function RenderGameFinished(props: any) {
  if (props.finished) {
    return <p style={{fontSize: 25}}>Finished!</p>
  }
  else {
    return <p></p>
  }
}

export default RenderGameFinished;