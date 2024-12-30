import React, { useState, useEffect } from 'react';

interface MinesweeperProps {
    width: number;
    height: number;
}

const Minesweeper: React.FC<MinesweeperProps> = ({ width, height }) => {
    const [board, setBoard] = useState<number[][]>([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        initializeBoard();
    }, []);

    const initializeBoard = () => {
        const rows = 10;
        const cols = 10;
        const mines = 10;
        const newBoard = Array(rows)
            .fill(0)
            .map(() => Array(cols).fill(0));

        // Place mines
        for (let i = 0; i < mines; i++) {
            let row, col;
            do {
                row = Math.floor(Math.random() * rows);
                col = Math.floor(Math.random() * cols);
            } while (newBoard[row][col] === -1);
            newBoard[row][col] = -1;

            // Increment adjacent cells
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    if (
                        row + r >= 0 &&
                        row + r < rows &&
                        col + c >= 0 &&
                        col + c < cols &&
                        newBoard[row + r][col + c] !== -1
                    ) {
                        newBoard[row + r][col + c]++;
                    }
                }
            }
        }

        setBoard(newBoard);
    };

    const handleClick = (row: number, col: number) => {
        if (board[row][col] === -1) {
            setGameOver(true);
            alert('Game Over!');
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(10, 1fr)`, gap: '1px' }}>
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleClick(rowIndex, colIndex)}
                        style={{
                            width: width / 10 - 2,
                            height: height / 10 - 2,
                            backgroundColor: gameOver && cell === -1 ? 'red' : 'lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid black',
                            cursor: 'pointer',
                        }}
                    >
                        {gameOver && cell !== -1 ? cell : ''}
                    </div>
                ))
            )}
        </div>
    );
};

export default Minesweeper;