import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion, useAnimation } from 'framer-motion';

const TicTacToe: React.FC<{ onInteract: () => void; onMinimize: () => void; onClose: () => void; }> = ({ onInteract, onMinimize, onClose }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const controls = useAnimation();

    const handleClick = (index: number) => {
        if (board[index] || calculateWinner(board)) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const calculateWinner = (squares: string[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = board.every(cell => cell !== null) && !winner;
    const status = winner ? `Winner : ${winner}` : isDraw ? 'Draw' : `Next player : ${isXNext ? 'X' : 'O'}`;

    const restart = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    useEffect(() => {
        if (isDraw) {
            setTimeout(restart, 2000);
        }
    }, [isDraw]);

    return (
        <Window
            top={10}
            left={10}
            width={422}
            height={700}
            windowTitle="Tic Tac Toe"
            windowBarIcon="tictactoeIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Tic Tac Toe</h2>
                    <p>{status}</p>
                </div>
                <motion.div
                    animate={controls}
                    style={styles.board}
                >
                    {board.map((value, index) => (
                        <div key={index} style={styles.cell} onClick={() => handleClick(index)}>
                            <span style={value === 'X' ? styles.x : styles.o}>{value}</span>
                        </div>
                    ))}
                </motion.div>
                <div className="site-button" onMouseDown={restart} style={styles.restartButton}>
                    Restart Game
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
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: 10,
        marginTop: 16,
        marginBottom: 16,
    },
    cell: {
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        backgroundColor: '#e0e0e0',
        cursor: 'pointer',
        border: '2px solid #333',
    },
    x: {
        color: '#ff6347',
    },
    o: {
        color: '#4682b4',
    },
    restartButton: {
        marginTop: 20,
    },
};

export default TicTacToe;
