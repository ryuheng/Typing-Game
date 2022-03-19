import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import {sentences} from "./paragraph.js"
import './App.css';

let timerID;
let sentenceIndex = 0;
let activeSentence = sentences[sentenceIndex];
let processed = activeSentence.split(" ");

let A = [];

processed.forEach(() => {
  A.push([]);
})


let B = [];

sentences.forEach((sentence, idxS) => {
  B.push([]);

  sentence.split(" ").forEach(() => {
    B[idxS].push([]);
  })
})

function setB(){
  B[sentenceIndex] = [];
  processed.forEach(word => {
    B[sentenceIndex].push([]);
  })
}

function Character(props){

  const {wordIndex, charIndex, charText} = props;
  const {userInput, userWordIndex: activeWordIndex} = useContext(Context);

  if(A[wordIndex][charIndex] === undefined){
    if(wordIndex === activeWordIndex && charIndex === userInput.length){
      return <span className="character"><span className="caret">|</span>{charText}</span>
    }
    return <span className="character">{charText}</span>
  }
  else if(A[wordIndex][charIndex] === true){
    return <span className="character correct">{charText}</span>
  }
  else if(A[wordIndex][charIndex] === false){
    return <span className="character wrong">{charText}</span>
  }
  else{
    return <span className="character">{charText}</span>
  }
}

function Extras(props){
  const extras = props.extras;
  return(
    extras.split("").map((extra, idx) => {
      return <span className="character wrong" key={idx} >{extra}</span>
    })
  )
}


function Word(props){

  const {_word: word, _idx: _wordIndex} = props;

  const {userInput, userWordIndex: activeWord} = useContext(Context);

  if(userInput.length > word.length && activeWord === _wordIndex){
    return(
      <div className="word">
        {word.split("").map((character, idx) => {
          return <Character
                  wordIndex = {_wordIndex}
                  charIndex = {idx}
                  charText = {character}
                  key = {idx}/>
        })}
        <Extras
          extras = {userInput.slice(word.length)}
        />
      </div>
    )
  }
  return(
    <div className="word">
      {word.split("").map((character, idx) => {
        return <Character
                wordIndex = {_wordIndex}
                charIndex = {idx}
                charText = {character}
                key = {idx}/>
      })}
    </div>
  )
}

function ActualText(){

  const timesActualTextRendered = useRef(0);
  useEffect(() => {
    timesActualTextRendered.current++;
  })

  return(
    <div className="actual-text">
      {processed.map((wordInProcessed, idxInProcessed) => {
        return <Word
                _word = {wordInProcessed}
                _idx = {idxInProcessed}
                key = {idxInProcessed}/>
      })}
    </div>
  )
}


function PreviewText(){

  return(
    <div className="preview-text">
      <p className="preview">{sentences[sentenceIndex+1]? sentences[sentenceIndex+1] : ""}</p>
      <p className="preview">{sentences[sentenceIndex+2]? sentences[sentenceIndex+2] : ""}</p>
      <p className="preview">{sentences[sentenceIndex+3]? sentences[sentenceIndex+3] : ""}</p>
    </div>
  )
}


function Test({ nextLineExists }){
  return(
    <div className="Test">
      <ActualText />
      <PreviewText />
    </div>
  )
}


function Timer({ timeElapsed }){

  return(
    <div className="Timer">{60 - timeElapsed}</div>
  )
}

function Result({ timeElapsed }){

  let correctChar = 0;
  B.forEach((sentenceA, idxS) => {
    sentenceA.forEach((wordA, idxW) => {
      wordA.forEach((char, idxC) => {
        if(char) correctChar++;
      })
    })
  })

    return(
      <div className="Result">
      <h1>Result:</h1>
      <h1>WPM: { (((correctChar/5) / timeElapsed) * 60).toFixed(2)}</h1>
      </div>
    )
}

function Instructions(){

  return(
    <div className = "Instructions">
      <p>Press <span className="keySwitch">space</span> after each word or line.</p>
      <br />
      <p>Press <span className="keySwitch">Esc</span> to restart.</p>
    </div>
  )
}

Instructions = React.memo(Instructions);

const Context = createContext();

function App() {

  const [userInput, setUserInput] = useState("");
  const [userWordIndex, setUserWordIndex] = useState(0);
  const [gameOngoing, setGameOngoing] = useState(true);
  const [startCountDown, setStartCountdown] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const inpField = useRef();

  const refresh = () => {
    clearInterval(timerID);
    sentenceIndex = 0;
    activeSentence = sentences[0];
    processed = activeSentence.split(" ");
    A = [];
    processed.forEach(() => {
      A.push([]);
    })
    setB();
    setUserInput("");
    setUserWordIndex(0);
    setGameOngoing(true);
    setStartCountdown(false);
    setTimeElapsed(0);
  }

  window.onkeydown = (e) => {
    if(gameOngoing){
      inpField.current.focus();
    }
    if(e.keyCode === 27 || e.keyCode === 38 || e.keyCode === 40){
      refresh();
      console.log("restart the test");
    }
  }

  const nextSentence = () => {
    sentenceIndex++;
    if(sentences[sentenceIndex]){
      activeSentence = sentences[sentenceIndex];
      processed = activeSentence.split(" ");
      A = [];
      processed.forEach(word => {
        A.push([]);
      })
      setB();
    }
    else{
      processed = [];
      clearInterval(timerID);
      setGameOngoing(false);
    }
    setUserWordIndex(0);
  }

  function processInput(userInput){
    setUserInput(userInput);

    //game starts when user typed the first character
    if(!startCountDown){
      setStartCountdown(true);
      timerID = setInterval(() => {
        setTimeElapsed(timeElapsed => timeElapsed + 1);
      }, 1000);
    }

    //user is done with word
    if(userInput.endsWith(" ") && userInput.trim().length === processed[userWordIndex].length){
      //word is correct
      if(userInput.trim() === processed[userWordIndex]){
        setUserInput("");
        if(processed[userWordIndex + 1]){
          setUserWordIndex(userWordIndex => userWordIndex + 1);
        }
        else{
          nextSentence();
        }
        return;
      }
    }

    //only check the current word hence set the array for current word to be empty
    A[userWordIndex] = [];
    B[sentenceIndex][userWordIndex] = [];

    const userInputChar = userInput.split("");

    userInputChar.forEach((char, idx) => {
      if(char === processed[userWordIndex].charAt(idx)){
        A[userWordIndex][idx] = true;
        B[sentenceIndex][userWordIndex][idx] = true;
      }
      else{
        A[userWordIndex][idx] = false;
        B[sentenceIndex][userWordIndex][idx] = false;
      }
    })
  }



  if(gameOngoing && timeElapsed < 60){
    return (
      <div className="App">
        <Instructions />
        <Timer
          timeElapsed = {timeElapsed}
        />
        <Context.Provider value={{userInput, userWordIndex}}>
        <Test />
        <input 
          type = "text"
          value = {userInput}
          onChange = {(e) => {
            processInput(e.target.value);
          }}
          maxLength={processed[userWordIndex]? processed[userWordIndex].length+5 : null}
          spellCheck = {false}
          ref = {inpField}
        />
        </Context.Provider>
      </div>
    );
  }

  else{
    clearInterval(timerID);
    window.onkeydown = (e) => {
      if(e.keyCode === 27 || e.keyCode === 38 || e.keyCode === 40){
        refresh();
        console.log("restart the test");
      }
    }
    return(
      <>
      <Instructions />
      <Result
        timeElapsed = {timeElapsed}
      />
      </>
    )
  }
}

export default App;