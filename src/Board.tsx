import { useState } from 'react';
import Square from './Square';
import calculateWinner from './Winner';

type SquareValue = 'x' | 'o' | null;
type BoardState = SquareValue[];

type BoardProps = {
  isNext: boolean;
  squares: BoardState;
  onPlay: (nextSquares: BoardState) => void;
};

function Board({ isNext, squares, onPlay }: BoardProps) {
  function handleClick(index: number) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[index] = isNext ? 'x' : 'o';
    onPlay(nextSquares);
  }

  const gameWinner = calculateWinner(squares);
  const status = gameWinner
    ? `Winner: ${gameWinner}`
    : squares.every(Boolean)
      ? 'Draw'
      : `Next player: ${isNext ? 'x' : 'o'}`;

  return (
    <>
      <p>{status}</p>
      <div className="board-row1">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row2">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row3">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState<BoardState[]>([
    Array<SquareValue>(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const isNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: BoardState) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_squares, move) => {
    const description = move === 0 ? 'Go to game start' : `Go to move #${move}`;

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} disabled={move === currentMove}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
