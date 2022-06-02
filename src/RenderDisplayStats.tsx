import React from 'react';
import { useState} from 'react';

function RenderDisplayStats(props: any) {
  const [firstIndexOfSlowest, setFirstIndexOfSlowest] = useState(-1)

  const normalizeTime = (arrOfDates: number[]) => {
    let arrOfTimes : number[] = []
    let firstDate = arrOfDates[0]
    for (let i = 0; i < arrOfDates.length; i++) {
      arrOfTimes.push(arrOfDates[i] - firstDate)
    }
    return (arrOfDates.map(val => ((val - arrOfDates[0])/1000)))
  }

  const getFiveLetterAverage = (arrOfTimes: number[]) => {
    if (arrOfTimes.length < 5) {
      return []
    }
    else {
      let arrOfAverages : number[] = []
      for (let i = 0; i < arrOfTimes.length-5; i++) {
        arrOfAverages = [...arrOfAverages, (arrOfTimes.slice(i, i+5)).reduce((partialSum, a) => partialSum + a, 0)]
      }
      return arrOfAverages
    }
  }

  const findDifference = (arrOfTimes: number[]) => {
    let arrOfDifferences : number[] = []
    for (let i = 0; i < arrOfTimes.length-1; i++) {
      arrOfDifferences.push(arrOfTimes[i+1] - arrOfTimes[i])
    }
    return arrOfDifferences
  }

  const calculatedAvg = (arrOfDates: number[]) => {
    let normalizedTimes = normalizeTime(arrOfDates)
    let differencesInTime = findDifference(normalizedTimes)
    return getFiveLetterAverage(differencesInTime)
  }

  const getSlowestIndex = (arrOfDates: number[]) => {
    let avgTimes = calculatedAvg(arrOfDates)
    let indexOfSlowest = -1
    let slowestTime = -Infinity
    for (let i = 0; i < avgTimes.length; i++) {
      if (avgTimes[i] > slowestTime) {
        slowestTime = avgTimes[i]
        indexOfSlowest = i
      }
    }
    return indexOfSlowest
  }

  const getSlowestChars = (arrOfDates: number[]) => {
    return ((props.textToType).slice(getSlowestIndex(arrOfDates), getSlowestIndex(arrOfDates)+5))
  }

  const getSlowestTime = (arrOfDates: number[]) => {
    return (calculatedAvg(arrOfDates)[getSlowestIndex(arrOfDates)])
  }
  
  if (props.finished === false) {
    return <p></p>
  }
  else {
    return <p>Slowest five chars: "{getSlowestChars(props.stats)}", {getSlowestTime(props.stats)} seconds</p>
  }
}

export default RenderDisplayStats;