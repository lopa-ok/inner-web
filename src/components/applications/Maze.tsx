import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';

const ROWS = 10;
const COLS = 10;
const CELL_SIZE = 40;

const Maze: React.FC<{ onInteract: () => void; onMinimize: () => void; onClose: () => void; }> = ({ onInteract, onMinimize, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [maze, setMaze] = useState<number[][]>([]);
    const [playerPosition, setPlayerPosition] = useState<{ row: number, col: number }>({ row: 0, col: 0 });
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const generateMaze = () => {
            const newMaze = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    if (Math.random() < 0.3 && !(row === 0 && col === 0) && !(row === ROWS - 1 && col === COLS - 1)) {
                        newMaze[row][col] = 1;
                    }
                }
            }
            return newMaze;
        };

        setMaze(generateMaze());
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const drawMaze = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    if (maze[row][col] === 1) {
                        ctx.fillStyle = '#000';
                        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
        };

        const drawPlayer = () => {
            ctx.fillStyle = '#FF202A';
            ctx.fillRect(playerPosition.col * CELL_SIZE, playerPosition.row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        };

        drawMaze();
        drawPlayer();
    }, [maze, playerPosition]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;
            let newRow = playerPosition.row;
            let newCol = playerPosition.col;

            if (e.key === 'ArrowUp') newRow--;
            if (e.key === 'ArrowDown') newRow++;
            if (e.key === 'ArrowLeft') newCol--;
            if (e.key === 'ArrowRight') newCol++;

            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && maze[newRow][newCol] === 0) {
                setPlayerPosition({ row: newRow, col: newCol });
                if (newRow === ROWS - 1 && newCol === COLS - 1) {
                    setGameOver(true);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [playerPosition, gameOver, maze]);

    const restartGame = () => {
        setMaze(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
        setPlayerPosition({ row: 0, col: 0 });
        setGameOver(false);
    };

    return (
        <Window
            top={10}
            left={10}
            width={COLS * CELL_SIZE + 20}
            height={ROWS * CELL_SIZE + 100}
            windowTitle="Maze"
            windowBarIcon="folderIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Maze</h2>
                    {gameOver && <p>You Win!</p>}
                </div>
                <canvas ref={canvasRef} width={COLS * CELL_SIZE} height={ROWS * CELL_SIZE} style={styles.canvas}></canvas>
                {gameOver && (
                    <div style={styles.gameOverContainer}>
                        <div style={styles.gameOverContent}>
                            <h2>Congratulations!</h2>
                            <p>You completed the maze.</p>
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

export default Maze;
