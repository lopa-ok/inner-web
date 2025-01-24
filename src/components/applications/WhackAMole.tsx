import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion, useAnimation } from 'framer-motion';
import moleGif from '../../assets/gifs/mole.gif';

const MOLE_COUNT = 16;
const GAME_DURATION = 30000;

const WhackAMole: React.FC<{ onInteract: () => void; onMinimize: () => void; onClose: () => void; }> = ({ onInteract, onMinimize, onClose }) => {
    const [moles, setMoles] = useState(Array(MOLE_COUNT).fill(false));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
    const [moleTimers, setMoleTimers] = useState<number[]>(Array(MOLE_COUNT).fill(0));

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                setGameOver(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    useEffect(() => {
        if (!gameOver) {
            const moleInterval = setInterval(() => {
                const newMoles = moles.slice();
                const newMoleTimers = moleTimers.slice();
                const randomIndices = Array.from({ length: 3 }, () => Math.floor(Math.random() * MOLE_COUNT)); // Spawn multiple moles
                randomIndices.forEach(index => {
                    newMoles[index] = !newMoles[index];
                    newMoleTimers[index] = newMoles[index] ? Date.now() : 0;
                });
                setMoles(newMoles);
                setMoleTimers(newMoleTimers);
            }, 800);

            return () => clearInterval(moleInterval);
        }
    }, [moles, moleTimers, gameOver]);

    const handleMoleClick = (index: number) => {
        if (moles[index]) {
            setScore(score + 1);
            const newMoles = moles.slice();
            newMoles[index] = false;
            setMoles(newMoles);
        }
    };

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        setTimeLeft(GAME_DURATION / 1000);
        setMoles(Array(MOLE_COUNT).fill(false));
        setMoleTimers(Array(MOLE_COUNT).fill(0));
    };

    return (
        <Window
            top={10}
            left={10}
            width={570}
            height={800}
            windowTitle="Whack-A-Mole"
            windowBarIcon="whackIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Whack-A-Mole</h2>
                    <p>Score: {score}</p>
                    <p>Time Left: {timeLeft}s</p>
                </div>
                <div style={styles.board}>
                    {moles.map((isMoleVisible, index) => (
                        <div
                            key={index}
                            style={Object.assign({}, styles.cell, isMoleVisible && styles.mole)}
                            onClick={() => handleMoleClick(index)}
                        >
                            {isMoleVisible && (
                                <img
                                    src={moleGif}
                                    alt="Mole"
                                    style={styles.moleImage}
                                    onAnimationEnd={() => {
                                        const newMoles = moles.slice();
                                        newMoles[index] = false;
                                        setMoles(newMoles);
                                    }}
                                    onLoad={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.style.animation = 'none';
                                        void img.offsetHeight;
                                        img.style.animation = '';
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
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
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // Adjust grid for more boxes
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
        backgroundColor: '#e0e0e0',
        cursor: 'pointer',
        border: '2px solid #333',
        position: 'relative',
    },
    mole: {
        backgroundColor: '#ffffffff',
    },
    moleImage: {
        width: '80%',
        height: '80%',
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

export default WhackAMole;
