import React, { useEffect, useState } from 'react';
import Window from '../os/Window';

export interface MemoryGameProps extends WindowAppProps {}

const emojis = ['😀', '😂', '😍', '😎', '😜', '🤩', '🥳', '😇', '🤓', '😡', '🤯', '😱'];

const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC<MemoryGameProps> = (props) => {
    const [cards, setCards] = useState(shuffleArray([...emojis, ...emojis]));
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (matchedCards.length === cards.length) {
            setGameOver(true);
        }
    }, [matchedCards, cards.length]);

    const handleCardClick = (index: number) => {
        if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
            return;
        }

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            if (cards[newFlippedCards[0]] === cards[newFlippedCards[1]]) {
                setMatchedCards([...matchedCards, ...newFlippedCards]);
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const restartGame = () => {
        setCards(shuffleArray([...emojis, ...emojis]));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setGameOver(false);
    };

    return (
        <Window
            top={50}
            left={50}
            width={500}
            height={800}
            windowTitle="Memory Game"
            windowBarIcon="folderIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Memory Game</h2>
                    <p>Match the pairs of emojis.</p>
                    <p>Moves: {moves}</p>
                </div>
                <div style={styles.board}>
                    {cards.map((emoji, index) => (
                        <div
                            key={index}
                            style={Object.assign(
                                {},
                                styles.card,
                                flippedCards.includes(index) || matchedCards.includes(index) ? styles.flippedCard : {}
                            )}
                            onClick={() => handleCardClick(index)}
                        >
                            {flippedCards.includes(index) || matchedCards.includes(index) ? emoji : '❓'}
                        </div>
                    ))}
                </div>
                {gameOver && (
                    <div style={styles.gameOverContainer}>
                        <div style={styles.gameOverContent}>
                            <h2>Game Over</h2>
                            <p>You matched all the pairs in {moves} moves!</p>
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

const styles: StyleSheetCSS = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
    },
    header: {
        flexShrink: 1,
        paddingTop: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: 10,
        marginTop: 16,
        marginBottom: 16,
    },
    card: {
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        cursor: 'pointer',
        border: '2px solid #333',
        fontSize: 32,
    },
    flippedCard: {
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

export default MemoryGame;
