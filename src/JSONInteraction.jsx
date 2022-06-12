import * as textObject from './listOfTexts.json';
import fs from 'fs';
let listOfTexts = textObject.texts

const getRandomString = () => {
  return listOfTexts[Math.floor(Math.random()*listOfTexts.length)].text
}

const addString = (str) => {
  listOfTexts.push({text: str})
  localStorage.setItem("listOfTexts", listOfTexts)
}

addString("h")

export default getRandomString;