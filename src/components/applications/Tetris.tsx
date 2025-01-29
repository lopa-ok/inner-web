import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const TETROMINOS = [
    { shape: [[1, 1, 1, 1]], color: '#FF5733' }, // I
    { shape: [[1, 1], [1, 1]], color: '#33FF57' }, // O
    { shape: [[0, 1, 0], [1, 1, 1]], color: '#3357FF' }, // T
    { shape: [[1, 1, 0], [0, 1, 1]], color: '#FF33A1' }, // S
    { shape: [[0, 1, 1], [1, 1, 0]], color: '#FF8C33' }, // Z
    { shape: [[1, 0, 0], [1, 1, 1]], color: '#33FFF5' }, // J
    { shape: [[0, 0, 1], [1, 1, 1]], color: '#F5FF33' }, // L
];

const Tetris: React.FC<{ onInteract: () => void; onMinimize: () => void; onClose: () => void; }> = ({ onInteract, onMinimize, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    const [currentTetromino, setCurrentTetromino] = useState<{ shape: number[][], color: string }>({ shape: [], color: '' });
    const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const drawBoard = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    if (board[row][col]) {
                        ctx.fillStyle = board[row][col];
                        ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                }
            }
        };

        const drawTetromino = () => {
            if (!currentTetromino.shape.length) return;
            ctx.fillStyle = currentTetromino.color;
            currentTetromino.shape.forEach((row, rIdx) => {
                row.forEach((cell, cIdx) => {
                    if (cell) {
                        ctx.fillRect((currentPosition.col + cIdx) * BLOCK_SIZE, (currentPosition.row + rIdx) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        ctx.strokeRect((currentPosition.col + cIdx) * BLOCK_SIZE, (currentPosition.row + rIdx) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                });
            });
        };

        drawBoard();
        drawTetromino();
    }, [board, currentTetromino, currentPosition]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;
            if (e.key === 'ArrowLeft') {
                moveTetromino(-1, 0);
            } else if (e.key === 'ArrowRight') {
                moveTetromino(1, 0);
            } else if (e.key === 'ArrowDown') {
                moveTetromino(0, 1);
            } else if (e.key === 'ArrowUp') {
                rotateTetromino();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameOver, currentTetromino, currentPosition]);

    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            moveTetromino(0, 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [gameOver, currentTetromino, currentPosition]);

    const moveTetromino = (colOffset: number, rowOffset: number) => {
        const newPosition = { row: currentPosition.row + rowOffset, col: currentPosition.col + colOffset };
        if (!isValidMove(newPosition)) {
            if (rowOffset === 1) {
                placeTetromino();
                checkForCompletedRows();
                spawnTetromino();
            }
            return;
        }
        setCurrentPosition(newPosition);
    };

    const rotateTetromino = () => {
        const rotatedTetromino = currentTetromino.shape[0].map((_, idx) => currentTetromino.shape.map(row => row[idx]).reverse());
        if (isValidMove(currentPosition, rotatedTetromino)) {
            setCurrentTetromino({ ...currentTetromino, shape: rotatedTetromino });
        }
    };

    const isValidMove = (position: { row: number; col: number }, tetromino = currentTetromino.shape) => {
        return tetromino.every((row, rIdx) => {
            return row.every((cell, cIdx) => {
                if (!cell) return true;
                const newRow = position.row + rIdx;
                const newCol = position.col + cIdx;
                return newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && !board[newRow][newCol];
            });
        });
    };

    const placeTetromino = () => {
        const newBoard = board.map(row => row.slice());
        currentTetromino.shape.forEach((row, rIdx) => {
            row.forEach((cell, cIdx) => {
                if (cell) {
                    newBoard[currentPosition.row + rIdx][currentPosition.col + cIdx] = currentTetromino.color;
                }
            });
        });
        setBoard(newBoard);
        checkForCompletedRows(newBoard);
    };

    const checkForCompletedRows = (newBoard = board) => {
        const filteredBoard = newBoard.filter(row => row.some(cell => !cell));
        const completedRows = ROWS - filteredBoard.length;
        if (completedRows) {
            const scoreIncrement = getScoreIncrement(completedRows);
            setScore(score + scoreIncrement);
            setBoard([...Array(completedRows).fill(Array(COLS).fill(0)), ...filteredBoard]);
        }
    };

    const getScoreIncrement = (completedRows: number) => {
        switch (completedRows) {
            case 1:
                return 40;
            case 2:
                return 100;
            case 3:
                return 300;
            case 4:
                return 1200;
            default:
                return 0;
        }
    };

    const spawnTetromino = () => {
        const newTetromino = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
        setCurrentTetromino(newTetromino);
        setCurrentPosition({ row: 0, col: Math.floor(COLS / 2) - Math.floor(newTetromino.shape[0].length / 2) });
        if (!isValidMove({ row: 0, col: Math.floor(COLS / 2) - Math.floor(newTetromino.shape[0].length / 2) }, newTetromino.shape)) {
            setGameOver(true);
        }
    };

    const restartGame = () => {
        setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
        setCurrentTetromino({ shape: [], color: '' });
        setCurrentPosition({ row: 0, col: 0 });
        setGameOver(false);
        setScore(0);
        setTimeout(spawnTetromino, 0);
    };

    useEffect(() => {
        spawnTetromino();
    }, []);

    return (
        <Window
            top={10}
            left={10}
            width={400}
            height={800}
            windowTitle="Tetris"
            windowBarIcon="tetrisIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Tetris</h2>
                    <p>Score: {score}</p>
                </div>
                <canvas ref={canvasRef} width={COLS * BLOCK_SIZE} height={ROWS * BLOCK_SIZE} style={styles.canvas}></canvas>
                {gameOver && (
                    <div style={styles.gameOverContainer}>
                        <div style={styles.gameOverContent}>
                            <h2>Game Over</h2>
                            <p>Your score: {score}</p>
                            <div className="site-button" onMouseDown={restartGame} style={styles.restartButton}>
                                Restart Game
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#f4f4f4',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    header: {
        flexShrink: 1,
        paddingTop: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
    },
    canvas: {
        border: '2px solid #333',
        backgroundColor: '#fff',
    },
    gameOverContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    gameOverContent: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 20,
        border: '2px solid #333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    restartButton: {
        marginTop: 20,
    },
};

export default Tetris;
