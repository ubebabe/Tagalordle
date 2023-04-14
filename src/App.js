import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet } from './Words';
import { createContext, useState, useEffect } from 'react'; 
import GameOver from './components/GameOver';
import axios from 'axios';
import Pronunciation from './components/Pronunciation';

//for cookies? 
import { useCookies } from 'react-cookie';

export const AppContext = createContext();

function App() {

  //be wary of useStates
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({
    gameOver: false, 
    guessedWord: false,
    currScore: 0
  })
  //translation variables recieved from backend (translation)
  const [translation, setTranslation] = useState("");

  //cookies
  const [cookies, setCookie] = useCookies(["score"]);


  //automatically imports the set to anywhere in project
  useEffect(() => {

     //set today's word from dataset
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);

      //GET translation from backend
      const getTranslation = async () => {

        //destructuring !!!!!
        const {data} = await axios.get('http://localhost:8000/?englishWord=' + words.todaysWord)
        setTranslation(data.translation);
     };
      //send today's word to backend
      getTranslation();
    })
    
    console.log('i fire once');

  }, [])


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
    //callback useState !!!!
    setCurrAttempt(prev => ({...prev, letterPos: prev.letterPos-1}))

  }

  const onEnter = () => {
    //check if there's 5 letters
    if(currAttempt.letterPos !== 5) return;

    // let currWord = "";
    // for(let i = 0; i < 5; i++){
    //   //join 
    //   currWord += board.join([currAttempt.attempt][i]);
    // }
    //better way instead of for loop^
    const currWord = board[currAttempt.attempt].join("");

    if(wordSet.has(currWord.toLowerCase())){

      //if 5 letters then move to next attempt and restart letter pos
      //callback in useState !!!!
      setCurrAttempt(prev => ({attempt: prev.attempt + 1, letterPos: 0}))
  
    } else {
      alert("Word Not Found");
    } 

    if(currWord.toLowerCase() === correctWord){

      //increase cookie score
      setCookie("score", (parseInt(cookies.score)) + 1 || 1, { path: '/' });

      setGameOver({gameOver: true, guessedWord: true, currScore: (parseInt(cookies.score))});
      console.log("in app.js" + parseInt(cookies.score));
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

      <Pronunciation/>

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
        setTranslation,
        translation,
        setCookie,
        cookies
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
