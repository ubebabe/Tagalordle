import {useContext, useCallback, useEffect} from 'react'
import { AppContext } from '../App';
import Key from "./Key";

function Keyboard() {

  const {onEnter, onDelete, onSelectLetter, disabledLetters} = useContext(AppContext);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyBoard = useCallback((event) => {

    if(event.key === "Enter"){

      onEnter()

    } else if(event.key === "Backspace"){
      
      onDelete()

    }
    else {
      //loop thru every key array
      //event.key = user input; key = array
      keys1.forEach((key) => {
        if (event.key.toUpperCase() === key){
          onSelectLetter(key)
        }
      })
      keys2.forEach((key) => {
        if (event.key.toUpperCase() === key){
          onSelectLetter(key)
        }
      })
      keys3.forEach((key) => {
        if (event.key.toUpperCase() === key){
          onSelectLetter(key)
        }
      })
    }

  })

  //detect keyboard events irl
  useEffect(() => {
    
    document.addEventListener("keydown", handleKeyBoard);

    return () => {
      document.removeEventListener("keydown", handleKeyBoard);
    }

  }, [handleKeyBoard])

  return (

    //keyboard consisting of 3 lines
    //each line has certain keys

    <div className='keyboard' onKeyDown={handleKeyBoard}>

      <div className='line1'>
        {keys1.map((key) => {
          return <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} />
        })}
        </div>

      <div className='line2'> 
        {keys2.map((key) => {
            return <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
          })}
      </div>

      <div className='line3'> 

        {/* enter key @ beginning */}
        <Key keyVal={"ENTER"} bigKey/>

        {keys3.map((key) => {
            return <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
          })}

        {/* delete key @ end */}
        <Key keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard;