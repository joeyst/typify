import React from 'react';

const textMatched = (text: String, numCorrect: number) => {
  return text.slice(0, numCorrect)
}

const textMismatched = (text: String, numCorrect: number, numIncorrect: number) => {
  return text.slice(numCorrect, numCorrect+numIncorrect)
}

const textUntouched = (text: String, numCorrect: number, numIncorrect: number) => {
  return text.slice(numCorrect+numIncorrect, text.length)
}

function RenderText(props: any): JSX.Element {
    const matched = textMatched(props.desiredText, props.numCorrect)
    const mismatched = textMismatched(props.desiredText, props.numCorrect, props.numIncorrect)
    const leftUntouched = textUntouched(props.desiredText, props.numCorrect, props.numIncorrect)
  return <div style={{fontSize: 30}}><span style={{ background: '#62f088'}}>{matched}</span><span style={{ backgroundColor: '#f03a5e'}}>{mismatched}</span><span>{leftUntouched}</span> </div>
}

export default RenderText;