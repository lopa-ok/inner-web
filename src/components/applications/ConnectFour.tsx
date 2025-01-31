import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';

interface Props {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

const ROWS = 6;
const COLS = 7;
const EMPTY = null;
const PLAYER = '#FF4500';
const AI = '#FFD700';

const ConnectFour: React.FC<Props> = ({ onInteract, onMinimize, onClose }) => {
    const [board, setBoard] = useState<(string | null)[][]>(
        Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY))
    );
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);

    const checkWinner = (board: (string | null)[][], player: string): boolean => {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (board[row][col] === player &&
                    board[row][col + 1] === player &&
                    board[row][col + 2] === player &&
                    board[row][col + 3] === player) {
                    return true;
                }
            }
        }

        for (let row = 0; row <= ROWS - 4; row++) {
            for (let col = 0; col < COLS; col++) {
                if (board[row][col] === player &&
                    board[row + 1][col] === player &&
                    board[row + 2][col] === player &&
                    board[row + 3][col] === player) {
                    return true;
                }
            }
        }

        for (let row = 3; row < ROWS; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (board[row][col] === player &&
                    board[row - 1][col + 1] === player &&
                    board[row - 2][col + 2] === player &&
                    board[row - 3][col + 3] === player) {
                    return true;
                }
            }
        }

        for (let row = 0; row <= ROWS - 4; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (board[row][col] === player &&
                    board[row + 1][col + 1] === player &&
                    board[row + 2][col + 2] === player &&
                    board[row + 3][col + 3] === player) {
                    return true;
                }
            }
        }

        return false;
    };

    const getValidMoves = (board: (string | null)[][]) => {
        const validMoves: number[] = [];
        for (let col = 0; col < COLS; col++) {
            if (board[0][col] === EMPTY) {
                validMoves.push(col);
            }
        }
        return validMoves;
    };

    const makeMove = (board: (string | null)[][], col: number, player: string) => {
        const newBoard = board.map(row => [...row]);
        for (let row = ROWS - 1; row >= 0; row--) {
            if (newBoard[row][col] === EMPTY) {
                newBoard[row][col] = player;
                break;
            }
        }
        return newBoard;
    };

    const evaluateBoard = (board: (string | null)[][]) => {
        if (checkWinner(board, AI)) return 1000;
        if (checkWinner(board, PLAYER)) return -1000;

        let score = 0;

        const lines = [
            ...board,
            ...Array(COLS).fill(null).map((_, col) => board.map(row => row[col])),
            ...Array(ROWS + COLS - 1).fill(null).map((_, i) => board.map((row, rowIndex) => board[rowIndex][i - rowIndex]).filter(cell => cell !== undefined)),
            ...Array(ROWS + COLS - 1).fill(null).map((_, i) => board.map((row, rowIndex) => board[rowIndex][i - (ROWS - 1 - rowIndex)]).filter(cell => cell !== undefined)),
        ];

        lines.forEach(line => {
            for (let i = 0; i <= line.length - 4; i++) {
                const segment = line.slice(i, i + 4);
                const aiCount = segment.filter(cell => cell === AI).length;
                const playerCount = segment.filter(cell => cell === PLAYER).length;

                if (aiCount > 0 && playerCount === 0) {
                    score += Math.pow(10, aiCount);
                } else if (playerCount > 0 && aiCount === 0) {
                    score -= Math.pow(10, playerCount);
                }
            }
        });

        return score;
    };

    const minimax = (board: (string | null)[][], depth: number, isMax: boolean, alpha: number, beta: number): [number, number] => {
        const score = evaluateBoard(board);
        if (Math.abs(score) === 1000 || depth === 0 || getValidMoves(board).length === 0) return [score, -1];

        const validMoves = getValidMoves(board);
        let bestMove = validMoves[0];

        if (isMax) {
            let bestScore = -Infinity;
            for (const col of validMoves) {
                const newBoard = makeMove(board, col, AI);
                const currentScore = minimax(newBoard, depth - 1, false, alpha, beta)[0];
                if (currentScore > bestScore) {
                    bestScore = currentScore;
                    bestMove = col;
                }
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break;
            }
            return [bestScore, bestMove];
        } else {
            let bestScore = Infinity;
            for (const col of validMoves) {
                const newBoard = makeMove(board, col, PLAYER);
                const currentScore = minimax(newBoard, depth - 1, true, alpha, beta)[0];
                if (currentScore < bestScore) {
                    bestScore = currentScore;
                    bestMove = col;
                }
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break;
            }
            return [bestScore, bestMove];
        }
    };

    const aiMove = () => {
        const result = minimax(board, 6, true, -Infinity, Infinity);
        const bestMove = result[1];

        if (bestMove !== -1) {
            const newBoard = makeMove(board, bestMove, AI);
            setBoard(newBoard);
            if (checkWinner(newBoard, AI)) {
                setGameOver(true);
                setWinner(AI);
                setAiScore(prev => prev + 1);
            }
            setIsPlayerTurn(true);
        }
    };

    useEffect(() => {
        if (!isPlayerTurn && !gameOver) {
            const timer = setTimeout(aiMove, 500);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn]);

    const handleColumnClick = (col: number) => {
        if (!isPlayerTurn || gameOver || board[0][col] !== EMPTY) return;

        const newBoard = makeMove(board, col, PLAYER);
        setBoard(newBoard);

        if (checkWinner(newBoard, PLAYER)) {
            setGameOver(true);
            setWinner(PLAYER);
            setPlayerScore(prev => prev + 1);
            return;
        }

        setIsPlayerTurn(false);
    };

    const resetGame = () => {
        setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY)));
        setIsPlayerTurn(true);
        setGameOver(false);
        setWinner(null);
    };

    const resetScores = () => {
        setPlayerScore(0);
        setAiScore(0);
    };

    return (
        <Window
            top={10}
            left={10}
            width={610}
            height={850}
            windowTitle="Connect Four"
            windowBarIcon="folderIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Connect Four</h2>
                </div>
                <div style={styles.scores}>
                    <p>Player: {playerScore}</p>
                    <p>AI: {aiScore}</p>
                </div>
                <div style={styles.board}>
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} style={styles.row}>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    style={styles.cell}
                                    onClick={() => handleColumnClick(colIndex)}
                                >
                                    <div style={{
                                        ...styles.piece,
                                        backgroundColor: cell || 'white'
                                    }} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={styles.turnText}>
                    <p>
                        {gameOver 
                            ? `Game Over! ${winner === PLAYER ? 'You won!' : 'AI won!'}`
                            : `${isPlayerTurn ? 'Your turn' : 'AI thinking...'}`}
                    </p>
                </div>
                <div className="site-button" onClick={resetGame} style={styles.resetButton}>
                    New Game
                </div>
                <div className="site-button" onClick={resetScores} style={styles.resetButton}>
                    Reset Scores
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    scores: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 20px',
        marginBottom: 20,
        color: '#333',
    },
    board: {
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gap: 5,
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
    },
    row: {
        display: 'contents',
    },
    cell: {
        width: 60,
        height: 60,
        padding: 5,
        cursor: 'pointer',
    },
    piece: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '2px solid #000',
    },
    turnText: {
        marginTop: 20,
        color: '#333',
    },
    resetButton: {
        marginTop: 20,
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
};

export default ConnectFour;