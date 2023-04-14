import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {

    const {gameOver, currAttempt, correctWord, currScore} = useContext(AppContext);

    console.log("in gameOver " + gameOver.currScore)

  return (
    <div className='gameOver'>
        <h3>
            {gameOver.guessedWord ? "you got it right" : "you failed"}
        </h3>

        <h1> 
            Score: {gameOver.currScore}
        </h1>

        <h1> 
            Correct: {correctWord}
        </h1>

        {gameOver.guessedWord && (<h3> You guessed in {currAttempt.attempt} attempts </h3>)}
        </div>
  )
}

export default GameOver