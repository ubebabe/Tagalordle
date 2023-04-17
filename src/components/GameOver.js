import React, { useContext } from 'react'
import { AppContext } from '../App'

function refreshPage() {
    window.location.reload(false);
  }

function GameOver() {

    const {gameOver, currAttempt, correctWord, currScore} = useContext(AppContext);

    console.log("in gameOver " + gameOver.currScore)

  return (
    <div className='gameOver'>
        {/* <h3>
            {gameOver.guessedWord ? "you got it right" : "you failed"}
        </h3> */}

        <h1> 
            Score: {gameOver.currScore || 1}
        </h1>

        <h1> 
            Correct: {correctWord}
        </h1>

        {gameOver.guessedWord && (<h3> You guessed in {currAttempt.attempt} attempts </h3>)}

        <button className="playAgain" onClick={refreshPage}>play again</button>
        </div>
  )
}

export default GameOver