import React, { useState, useEffect } from 'react';
import Window from '../os/Window';

interface SudokuProps {
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
}

const isValid = (board: number[][], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        if (board[startRow + Math.floor(x / 3)][startCol + (x % 3)] === num) {
            return false;
        }
    }
    return true;
};

const generateBoard = () => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    const solveBoard = (board: number[][]) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveBoard(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const removeNumbers = (board: number[][], count: number) => {
        while (count > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (board[row][col] !== 0) {
                board[row][col] = 0;
                count--;
            }
        }
    };

    solveBoard(board);
    removeNumbers(board, 40);
    return board;
};

const Sudoku: React.FC<SudokuProps> = ({ onClose, onInteract, onMinimize }) => {
    const [board, setBoard] = useState<number[][]>([]);
    const [time, setTime] = useState(0);
    const [hints, setHints] = useState(3);
    const [hintedCells, setHintedCells] = useState<{ row: number; col: number }[]>([]);
    const [userInputCells, setUserInputCells] = useState<{ row: number; col: number }[]>([]);
    const [wrongCells, setWrongCells] = useState<{ row: number; col: number }[]>([]);

    useEffect(() => {
        setBoard(generateBoard());
        const timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (row: number, col: number, value: string) => {
        const newBoard = board.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? parseInt(value) || 0 : cell))
        );
        setBoard(newBoard);
        setUserInputCells([...userInputCells, { row, col }]);

        if (parseInt(value) && !isValid(newBoard, row, col, parseInt(value))) {
            setWrongCells([...wrongCells, { row, col }]);
        } else {
            setWrongCells(wrongCells.filter(cell => cell.row !== row || cell.col !== col));
        }
    };

    const reshuffleBoard = () => {
        setBoard(generateBoard());
        setTime(0);
        setHints(3);
        setHintedCells([]);
        setUserInputCells([]);
        setWrongCells([]);
    };

    const useHint = () => {
        if (hints > 0) {
            const emptyCells = [];
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] === 0) {
                        emptyCells.push({ row: i, col: j });
                    }
                }
            }
            if (emptyCells.length > 0) {
                const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                const newBoard = [...board];
                newBoard[row][col] = Math.floor(Math.random() * 9) + 1;
                setBoard(newBoard);
                setHints(hints - 1);
                setHintedCells([...hintedCells, { row, col }]);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Window
            top={10}
            left={10}
            width={460}
            height={700}
            windowTitle="Sudoku"
            windowBarIcon="sudokuIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <h2 style={styles.title}>Sudoku</h2>
                <h3 style={styles.timer}>Time: {formatTime(time)}</h3>
                <div style={styles.board}>
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} style={styles.row}>
                            {row.map((cell, colIndex) => (
                                <input
                                    key={colIndex}
                                    type="text"
                                    value={cell === 0 ? '' : cell}
                                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                    style={{
                                        ...styles.cell,
                                        borderRight: (colIndex + 1) % 3 === 0 && colIndex !== 8 ? '2px solid #000' : '1px solid #ccc',
                                        borderBottom: (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? '2px solid #000' : '1px solid #ccc',
                                        marginRight: (colIndex + 1) % 3 === 0 && colIndex !== 8 ? '5px' : '0',
                                        marginBottom: (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? '5px' : '0',
                                        color: wrongCells.some(cell => cell.row === rowIndex && cell.col === colIndex) ? 'red' : hintedCells.some(cell => cell.row === rowIndex && cell.col === colIndex) ? 'blue' : userInputCells.some(cell => cell.row === rowIndex && cell.col === colIndex) ? 'gray' : 'black',
                                    }}
                                    maxLength={1}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div style={styles.footer}>
                    <button onClick={reshuffleBoard} style={styles.button}>Reshuffle</button>
                    <button onClick={useHint} style={styles.button} disabled={hints === 0}>Hint ({hints})</button>
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#f0f0f0',
        paddingTop: '20px',
        overflow: 'hidden',
    },
    title: {
        fontFamily: 'Press Start 2P, cursive',
        fontSize: '32px',
        marginBottom: '10px',
    },
    timer: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    board: {
        display: 'grid',
        gridTemplateRows: 'repeat(9, 1fr)',
        gap: '1px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden', // Hide scroll bar
    },
    row: {
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gap: '1px',
    },
    cell: {
        width: '40px',
        height: '40px',
        textAlign: 'center',
        fontSize: '20px',
        outline: 'none',
        backgroundColor: '#fff',
        color: '#000',
        fontFamily: 'Arial, sans-serif',
    },
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
        borderTop: '1px solid #ccc',
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        margin: '0 10px',
    },
};

export default Sudoku;
