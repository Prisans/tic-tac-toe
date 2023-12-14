import React, { useState } from "react";

import GameBoard from "./Components/Board/GameBoard";
import Player from "./Components/Player/Player";
import Log from "./Components/Log/Log";
import { WINNING_COMBINATIONS } from "./WinningCombination";
import GameOver from "./Components/GameOver/GameOver";

const gameListNumber = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName , setPlayerName] = useState({
    'X' : 'Player 1',
    'O' : 'Player 2'
  })

  const changeActivePlayer = (rowIndex, colIndex) => {

    setActivePlayer((currPlayer) => (currPlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      let currentTurn = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentTurn = "O";
      }
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentTurn },
        ...prevTurns,
      ];
      return updatedTurn;
    });

  };

  let gameBoard = [...gameListNumber.map(array=>[...array])];

  for(const turn of gameTurns){
    const {square,player} = turn
    const {row,col} = square
    gameBoard[row][col] = player
  }

  let winner;

  const hasDraw = gameTurns.length === 9 && !winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = playerName[firstSquareSymbol]
    }

  }

  const handleRestart = ()=>{
    setGameTurns([])
  }

  const handleChangePlayerName = (symbol,newName)=>{
    setPlayerName(prevName=>{
      return{
        ...prevName,
        [symbol] : newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            highlightedActive={activePlayer === "X"}
            onNameChange = {handleChangePlayerName}
            />
          <Player
            initialName="Player 2"
            symbol="O"
            highlightedActive={activePlayer === "O"}
            onNameChange = {handleChangePlayerName}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart = {handleRestart}/>}
        <GameBoard
          onSelectActivePlayer={changeActivePlayer}
          board = {gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
