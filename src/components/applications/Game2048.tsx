import React, { useState, useEffect } from 'react';
import Window from '../os/Window';

interface WindowProps {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

const SIZE = 4;

const getInitialGrid = () => {
    const grid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
    addRandomTile(grid);
    addRandomTile(grid);
    return grid;
};

const addRandomTile = (grid: number[][]) => {
    const emptyTiles = [];
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (grid[i][j] === 0) {
                emptyTiles.push({ x: i, y: j });
            }
        }
    }
    if (emptyTiles.length > 0) {
        const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
};

const moveLeft = (grid: number[][]) => {
    let moved = false;
    for (let i = 0; i < SIZE; i++) {
        let row = grid[i].filter(val => val);
        let newRow = [];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === row[j + 1]) {
                newRow.push(row[j] * 2);
                j++;
                moved = true;
            } else {
                newRow.push(row[j]);
            }
        }
        while (newRow.length < SIZE) {
            newRow.push(0);
        }
        if (newRow.join('') !== grid[i].join('')) {
            moved = true;
        }
        grid[i] = newRow;
    }
    return moved;
};

const rotateGrid = (grid: number[][]) => {
    const newGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            newGrid[j][SIZE - 1 - i] = grid[i][j];
        }
    }
    return newGrid;
};

const getTileColor = (value: number) => {
    switch (value) {
        case 2:
            return '#eee4da';
        case 4:
            return '#ede0c8';
        case 8:
            return '#f2b179';
        case 16:
            return '#f59563';
        case 32:
            return '#f67c5f';
        case 64:
            return '#f65e3b';
        case 128:
            return '#edcf72';
        case 256:
            return '#edcc61';
        case 512:
            return '#edc850';
        case 1024:
            return '#edc53f';
        case 2048:
            return '#edc22e';
        default:
            return '#cdc1b4';
    }
};

const Game2048: React.FC<WindowProps> = ({ onInteract, onMinimize, onClose }) => {
    const [grid, setGrid] = useState(getInitialGrid);
    const [gameOver, setGameOver] = useState(false);
    const [movingTiles, setMovingTiles] = useState<{ [key: string]: boolean }>({});

    const handleKeyDown = (event: KeyboardEvent) => {
        if (gameOver) return;

        let moved = false;
        let newGrid = [...grid];
        const newMovingTiles: { [key: string]: boolean } = {};

        switch (event.key) {
            case 'ArrowLeft':
                moved = moveLeft(newGrid);
                break;
            case 'ArrowRight':
                newGrid = rotateGrid(rotateGrid(newGrid));
                moved = moveLeft(newGrid);
                newGrid = rotateGrid(rotateGrid(newGrid));
                break;
            case 'ArrowUp':
                newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
                moved = moveLeft(newGrid);
                newGrid = rotateGrid(newGrid);
                break;
            case 'ArrowDown':
                newGrid = rotateGrid(newGrid);
                moved = moveLeft(newGrid);
                newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
                break;
            default:
                break;
        }

        if (moved) {
            addRandomTile(newGrid);
            setGrid(newGrid);
            setMovingTiles(newMovingTiles);
            if (!canMove(newGrid)) {
                setGameOver(true);
            }
        }
    };

    const canMove = (grid: number[][]) => {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (grid[i][j] === 0) return true;
                if (i < SIZE - 1 && grid[i][j] === grid[i + 1][j]) return true;
                if (j < SIZE - 1 && grid[i][j] === grid[i][j + 1]) return true;
            }
        }
        return false;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [grid, gameOver]);

    const restartGame = () => {
        setGrid(getInitialGrid());
        setGameOver(false);
    };

    return (
        <Window
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            closeWindow={onClose}
            windowTitle="2048"
            width={500}
            height={600}
            top={50}
            left={50}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>2048</h2>
                    <p>Join the numbers and get to the 2048 tile!</p>
                </div>
                {gameOver && (
                    <div style={styles.gameOverOverlay}>
                        <h2>Game Over</h2>
                        <button onClick={restartGame}>Restart</button>
                    </div>
                )}
                <div style={styles.gridContainer}>
                    <div style={styles.grid}>
                        {grid.map((row, rowIndex) => (
                            <div key={rowIndex} style={styles.row}>
                                {row.map((cell, cellIndex) => (
                                    <div key={cellIndex} style={styles.cell}>
                                        {cell !== 0 && (
                                            <div
                                                style={{
                                                    ...styles.tile,
                                                    backgroundColor: getTileColor(cell),
                                                    transition: movingTiles[`${rowIndex}-${cellIndex}`] ? 'transform 0.2s' : 'none',
                                                }}
                                            >
                                                {cell}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#faf8ef',
        padding: 10,
        boxSizing: 'border-box',
        fontFamily: 'Courier New, monospace',
    },
    header: {
        flexShrink: 1,
        paddingTop: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        backgroundColor: '#bbada0',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        maxWidth: 400,
        height: '100%',
        maxHeight: 400,
        boxSizing: 'border-box',
        border: '2px solid #000',
    },
    row: {
        display: 'flex',
        width: '100%',
        gap: 10,
    },
    cell: {
        width: '100%',
        height: 80,
        backgroundColor: '#cdc1b4',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #000',
    },
    tile: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eee4da',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        border: '2px solid #000',
    },
    gameOverOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        zIndex: 10,
        fontFamily: 'Courier New, monospace',
    },
};

export default Game2048;
