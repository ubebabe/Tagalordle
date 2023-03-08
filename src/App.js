import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet } from './Words';
import { createContext, useState, useEffect } from 'react'; 
import GameOver from './components/GameOver';
// import translateText from './translate-nodejs/main-node';
import axios from 'axios';

export const AppContext = createContext();

function App() {

  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({
    gameOver: false, 
    guessedWord: false
  })
  //translation variables recieved from backend (translation)
  const [translation, setTranslation] = useState("");

  //automatically imports the set to anywhere in project
  useEffect(() => {
  
    //FETCH (not using) - calling backend
    //  fetch("http://localhost:8000/")
    //  .then((res) => res.json())
    //  .then((data) => setTranslation(data.translation));

     //set today's word from dataset
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);

      //send today's word to backend
      sendTodaysWord(words.todaysWord);
    })

    //get today's word tagalog translation
    getTranslation();

  }, [])

  //FUNCTIONS TO SET TODAY'S WORD (FRONT/BACK END CONNECTION)

  //SEND/POST today's word to backend to be translated
  const sendTodaysWord = async (inputtedWord) => {

    axios.post('http://localhost:8000/', 
    {
      englishWord: inputtedWord,
      tagalogWord: ""
    })
    .then((response) => {
      //this is not working lol
      //console.log(`response from backend: ${JSON.parse(response)}`);
    });


  };

  //GET translation from backend
  const getTranslation = async () => {
    axios.get('http://localhost:8000/')
     .then((response) => setTranslation(response.data.translation));
  };


  const onSelectLetter = (keyVal) => {
    //max letters in the wordle guess
    if(currAttempt.letterPos > 4) return;

    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos+1})
  }

  const onDelete = () => {
    //base case 
    if(currAttempt.letterPos === 0) return;

    const newBoard = [...board]
    //move board position back one
    newBoard[currAttempt.attempt][currAttempt.letterPos-1] = "";
    //update new board
    setBoard(newBoard)
    //update attempt
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos-1})

  }

  const onEnter = () => {
    //check if there's 5 letters
    if(currAttempt.letterPos !== 5) return;

    let currWord = "";
    for(let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i];
    }

    if(wordSet.has(currWord.toLowerCase())){

      //if 5 letters then move to next attempt and restart letter pos
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
  
    } else {
      alert("Word Not Found");
    } 

    if(currWord.toLowerCase() === correctWord){
      setGameOver({gameOver: true, guessedWord: true});
      console.log("DONE SON");
      return;
    }

    // console.log(`currWord:  ${currWord.toLowerCase()}`);
    // console.log(`correctWord:  ${correctWord}`);

    if(currAttempt.attempt === 5){
      setGameOver({gameOver: true, guessedWord: false});
    }

  };

  return (
    <div className="App">
      <nav> 
        <h1>
          {translation}
        </h1>
      </nav>

      <AppContext.Provider value={{
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt, 
        onDelete, 
        onEnter, 
        onSelectLetter,
        correctWord,
        setDisabledLetters,
        disabledLetters, 
        setGameOver,
        gameOver,
        setTranslation,
        translation,
        }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard /> }
        </div>
        
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
