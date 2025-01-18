import React, { useState, useEffect } from 'react';
import Colors from '../../constants/colors';

interface Cell {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
}

interface MinesweeperProps {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

const generateBoard = (rows: number, cols: number, mines: number): Cell[][] => {
    const board: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }))
    );

    let placedMines = 0;
    while (placedMines < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            placedMines++;
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!board[row][col].isMine) {
                let adjacentMines = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;
                        if (
                            newRow >= 0 &&
                            newRow < rows &&
                            newCol >= 0 &&
                            newCol < cols &&
                            board[newRow][newCol].isMine
                        ) {
                            adjacentMines++;
                        }
                    }
                }
                board[row][col].adjacentMines = adjacentMines;
            }
        }
    }

    return board;
};

const Minesweeper: React.FC<MinesweeperProps> = ({ onInteract, onMinimize, onClose }) => {
    const [board, setBoard] = useState<Cell[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        const newBoard = generateBoard(10, 10, 10);
        setBoard(newBoard);
    }, []);

    const revealCell = (row: number, col: number) => {
        if (gameOver || gameWon) return;

        const newBoard = [...board];
        const cell = newBoard[row][col];

        if (cell.isRevealed || cell.isFlagged) return;

        cell.isRevealed = true;

        if (cell.isMine) {
            setGameOver(true);
            return;
        }

        if (cell.adjacentMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (
                        newRow >= 0 &&
                        newRow < board.length &&
                        newCol >= 0 &&
                        newCol < board[0].length
                    ) {
                        revealCell(newRow, newCol);
                    }
                }
            }
        }

        setBoard(newBoard);

        if (newBoard.every(row => row.every(cell => cell.isRevealed || cell.isMine))) {
            setGameWon(true);
        }
    };

    const flagCell = (row: number, col: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (gameOver || gameWon) return;

        const newBoard = [...board];
        const cell = newBoard[row][col];

        if (cell.isRevealed) return;

        cell.isFlagged = !cell.isFlagged;
        setBoard(newBoard);
    };

    return (
        <div style={styles.container}>
            {gameOver && <div style={styles.message}>Game Over</div>}
            {gameWon && <div style={styles.message}>You Win!</div>}
            <div style={styles.board}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                style={Object.assign(
                                    {},
                                    styles.cell,
                                    cell.isRevealed && styles.revealedCell,
                                    cell.isFlagged && styles.flaggedCell
                                )}
                                onClick={() => revealCell(rowIndex, colIndex)}
                                onContextMenu={(e) => flagCell(rowIndex, colIndex, e)}
                            >
                                {cell.isRevealed && cell.isMine && '💣'}
                                {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && cell.adjacentMines}
                                {cell.isFlagged && !cell.isRevealed && '🚩'}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: Colors.lightGray,
    },
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 30px)',
        gridTemplateRows: 'repeat(10, 30px)',
        gap: '2px',
    },
    row: {
        display: 'flex',
    },
    cell: {
        width: 30,
        height: 30,
        backgroundColor: Colors.darkGray,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
    },
    revealedCell: {
        backgroundColor: Colors.lightGray,
    },
    flaggedCell: {
        backgroundColor: Colors.yellow,
    },
    message: {
        fontSize: 24,
        marginBottom: 16,
    },
};

// export default Minesweeper;
