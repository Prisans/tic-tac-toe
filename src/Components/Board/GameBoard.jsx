import React , {useState} from "react";



const GameBoard = ({onSelectActivePlayer , board}) => {

  

  // const [gameBoard , setGameBoard] = useState(gameListNumber)

  // const handleSelectButton = (rowIndex,colIndex)=>{
  //   setGameBoard((prevGameBoard) => {
  //     const newGameBoard = [...prevGameBoard.map(innerArray=>[...innerArray])]
  //     newGameBoard[rowIndex][colIndex] = playingPlayer;
  //     return newGameBoard
  //   })

  //   onSelectActivePlayer();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectActivePlayer(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
