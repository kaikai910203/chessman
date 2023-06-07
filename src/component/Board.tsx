import { useState } from "react";
import "./Board.css";
import Piece from "./Piece";

const maxHigh = 2
const initialSquare_Beginner = [
  ["", "", "", "i", "a", "m", "", "", ""],
  ["", "n", "", "", "g", "", "", "n", ""],
  ["s", "", "c", "w", "s", "w", "c", "", "s"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["S", "", "C", "W", "S", "W", "C", "", "S"],
  ["", "N", "", "", "G", "", "", "N", ""],
  ["", "", "", "M", "A", "I", "", "", ""],
];
const initialSquare_normal = Array(9).fill(Array(9).fill(""))
export default function Board() {
  const [square, setSquare] = useState(initialSquare_Beginner);
  const [selectedPiece, setSelectedPiece] = useState<{ row: number, col: number } | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<number[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState('w');
  const [canEatOrStack, setCanEatOrStack] = useState<{ row: number, col: number } | null>(null);
  // 依照難度初始化
  const init_Difficulty = (difficulty: string) => {
    if (difficulty === "Beginner") {
      setSquare(initialSquare_Beginner)
    } else if (difficulty === "easy") {

    } else if (difficulty === "normal") {
      setSquare(initialSquare_normal)
    } else {

    }
  }
  // 取得此處存格所有棋子
  const getPiece = (row: number, col: number) => {
    return square[row][col]
  }
  // 取得棋子高度
  const getHigh = (piece: string) => {
    return piece.length
  }
  // 取得最上方棋子
  const getTopPiece = (piece: string) => {
    return piece.slice(-1)
  }
  // 取毒下方所有棋子
  const getUnderPiece = (piece: string) => {
    return piece.slice(0, -1)
  }
  // 棋子點擊事件
  const handlePieceClick = (row: number, col: number) => {
    const topPiece = getTopPiece(getPiece(row, col))
    if (topPiece === "") return;

    if (currentPlayer === 'w' && topPiece.toUpperCase() !== topPiece) return;

    if (currentPlayer === 'b' && topPiece.toLowerCase() !== topPiece) return;

    highlightCells(row, col);
    setSelectedPiece({ row, col });
  };
  // 處存格點擊事件
  const handleCellClick = (row: number, col: number) => {
    setCanEatOrStack(null)
    if (!selectedPiece) return;
    if (isMoveLegal(selectedPiece.row, selectedPiece.col, row, col) && !isBlock(selectedPiece.row, selectedPiece.col, row, col)) {
      const targetCell = getPiece(row, col);
      if (targetCell !== "") {
        if ((currentPlayer === 'w' && getTopPiece(targetCell).toUpperCase() !== getTopPiece(targetCell)) || (currentPlayer === 'b' && getTopPiece(targetCell).toLowerCase() !== getTopPiece(targetCell))) {
          if (targetCell.length === maxHigh || targetCell.toUpperCase() === 'A') {
            handleEatClick(row, col)
          } else {
            setCanEatOrStack({ row, col })
          }
        } else {

          if (targetCell.length !== maxHigh && targetCell.toUpperCase() !== 'A' && getPiece(selectedPiece.row, selectedPiece.col) !== "A") {

            handleStackClick(row, col)
          }
          setSelectedPiece(null);
          setHighlightedCells([]);
        }
      } else {
        const newSquare = [...square];
        newSquare[row][col] = getTopPiece(getPiece(selectedPiece.row, selectedPiece.col));
        newSquare[selectedPiece.row][selectedPiece.col] = getUnderPiece(newSquare[selectedPiece.row][selectedPiece.col]);
        setSquare(newSquare);
        setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
        setSelectedPiece(null);
        setHighlightedCells([]);
      }
    } else {
      setSelectedPiece(null);
      setHighlightedCells([]);
    }

  };
  // 堆疊
  const handleStackClick = (row: number, col: number) => {
    if (selectedPiece === null) return
    const newSquare = [...square];
    newSquare[row][col] += getTopPiece(getPiece(selectedPiece.row, selectedPiece.col));
    newSquare[selectedPiece.row][selectedPiece.col] = getUnderPiece(newSquare[selectedPiece.row][selectedPiece.col]);
    setSquare(newSquare);
    setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');

    setSelectedPiece(null);
    setHighlightedCells([]);
    setCanEatOrStack(null)
  }
  // 吃
  const handleEatClick = (row: number, col: number) => {
    if (selectedPiece === null) return
    const newSquare = [...square];
    newSquare[row][col] = getTopPiece(getPiece(selectedPiece.row, selectedPiece.col));
    newSquare[selectedPiece.row][selectedPiece.col] = getUnderPiece(newSquare[selectedPiece.row][selectedPiece.col]);
    setSquare(newSquare);
    setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');

    setSelectedPiece(null);
    setHighlightedCells([]);
    setCanEatOrStack(null)
  }
  // 按鈕選擇
  const handleButtonClick = (action: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (action === "Eat" && canEatOrStack !== null) {
      handleEatClick(canEatOrStack.row, canEatOrStack.col);
    } else if (action === "Stack" && canEatOrStack !== null) {
      handleStackClick(canEatOrStack.row, canEatOrStack.col);
    }
  };
  // 高量提示
  const highlightCells = (row: number, col: number) => {
    const cells: number[][] = [];
    const checkedCells = new Set<string>();

    for (let i = 0; i < square.length; i++) {
      for (let j = 0; j < square[i].length; j++) {
        const cellKey = `${i}-${j}`;
        if (checkedCells.has(cellKey)) continue;

        if (isMoveLegal(row, col, i, j) && !isBlock(row, col, i, j) && square[i][j] !== "A") {
          cells.push([i, j]);
        }

        checkedCells.add(cellKey);
      }
    }

    setHighlightedCells(cells);
  };
  // 阻擋判斷
  const isBlock = (Row: number, Col: number, toRow: number, toCol: number): boolean => {
    const dx = Math.sign(toRow - Row);
    const dy = Math.sign(toCol - Col);
    let x = Row + dx;
    let y = Col + dy;

    while (x !== toRow || y !== toCol) {
      if (square[x][y] !== "") return true;
      x += dx;
      y += dy;
    }

    return false;
  }
  // 反轉
  const toCoord = (piece: string, to: number) => {
    const isWhite = piece === piece.toUpperCase();
    const toCoord: Record<number, number> = isWhite
      ? { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 }
      : { 0: 8, 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0 };
    return toCoord[to];
  }
  // 移動判定
  const isMoveLegal = (Row: number, Col: number, toRow: number, toCol: number): boolean => {
    if (Row === toRow && Col === toCol) return false;
    const topPiece = getTopPiece(getPiece(Row, Col))
    const high = getHigh(getPiece(Row, Col))
    const x = Math.abs(toCoord(topPiece, toRow) - toCoord(topPiece, Row));
    const y = Math.abs(toCoord(topPiece, toCol) - toCoord(topPiece, Col));

    switch (topPiece.toUpperCase()) {
      case "A":
        return (x <= high && y === 0) || (y <= high && x === 0) || (x === y && x <= high);
      case "I":
        return x === y || (x <= high && y === 0) || (x === 0 && y <= high);
      case "M":
        return (x !== 0 && y === 0) || (y !== 0 && x === 0) || (x <= high && y <= high && x === y);
      case "G":
        return (
          toCoord(topPiece, Row) - toCoord(topPiece, toRow) <= high + 1 &&
          y === 0 &&
          toCoord(topPiece, Row) - toCoord(topPiece, toRow) >= 0 - high
        ) || (y <= high && toCoord(topPiece, Row) - toCoord(topPiece, toRow) <= high && toCoord(topPiece, Row) - toCoord(topPiece, toRow) > 0 && x === y);
      case "N":
        return x === y && x !== 0;
      case "S":
        return x <= high && y === 0;
      case "C":
        return (
          y === 0 &&
          toCoord(topPiece, Row) - toCoord(topPiece, toRow) <= high &&
          toCoord(topPiece, Row) - toCoord(topPiece, toRow) > 0
        ) || (y <= high && x === 0) || (y <= high && toCoord(topPiece, toRow) - toCoord(topPiece, Row) <= high && toCoord(topPiece, toRow) - toCoord(topPiece, Row) > 0 && x === y);
      case "W":
        return (
          toCoord(topPiece, Row) - toCoord(topPiece, toRow) <= high &&
          y === 0 &&
          toCoord(topPiece, Row) - toCoord(topPiece, toRow) >= 0 - high
        ) || (y <= high && toCoord(topPiece, Row) - toCoord(topPiece, toRow) <= high && toCoord(topPiece, Row) - toCoord(topPiece, toRow) > 0 && x === y);
    }

    return false;
  }
  return (
    <div className="contain">
      <div className="board">
        {square.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                className={`cell${highlightedCells.some(([x, y]) => x === rowIndex && y === colIndex) ? "highlighted" : ""}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}>
                {cell && <Piece piece={getTopPiece(cell)} onClick={() => handlePieceClick(rowIndex, colIndex)} />}
                {canEatOrStack && canEatOrStack.col === colIndex && canEatOrStack.row === rowIndex && (<div className="button_contain">
                  <div className="button-wrapper">
                    <button onClick={(event) => handleButtonClick('Eat', event)}>Eat</button>
                    <button onClick={(event) => handleButtonClick('Stack', event)}>Stack</button>
                  </div>
                </div>)}
              </div>
            ))}
          </div>
        ))}


      </div>
    </div>
  );
}