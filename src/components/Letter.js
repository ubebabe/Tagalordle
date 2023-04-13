import {useContext, useEffect} from 'react'
import { AppContext } from '../App';

function Letter({letterPos, attemptVal}) {
  const {
    board, 
    correctWord, 
    currAttempt, 
    setDisabledLetters} = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  //booleans
  //check if letter or answer ma tches w answer in the cell
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  //letterState = determines the color of the board
  const letterState = 
  currAttempt.attempt > attemptVal && 
  (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {

    if((letter !== "" && !correct && !almost)){

      // this is an array that holds all letters that are disabled
      // from prev attempts and now
      setDisabledLetters((prev) => [...prev, letter]);
    }

  }, [currAttempt.attempt]);

    return (
    <div className="letter" id ={letterState}>
      {letter}
      </div>
  )
}

export default Letter;