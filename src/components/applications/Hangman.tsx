import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { getRandomWord } from '../hangman/words';
import { Easing } from '../general/Animation';
import Window from '../os/Window';


interface WindowProps {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

interface LetterButtonProps {
    letter: string;
    onClick: (letter: string) => void;
    disabled: boolean;
    isCorrect: boolean;
    isWrong: boolean;
}

const LetterButton: React.FC<LetterButtonProps> = ({
    letter,
    onClick,
    disabled,
    isCorrect,
    isWrong,
}) => (
    <div
        className="site-button"
        style={Object.assign(
            {},
            styles.letterBox,
            isCorrect && { backgroundColor: 'lightgreen' },
            isWrong && { backgroundColor: 'gray' },
            disabled && { opacity: 0.6 }
        )}
        onClick={() => !disabled && onClick(letter)}
    >
        <p>{letter}</p>
    </div>
);

const HiddenLetter: React.FC<{ letter: string; revealed: boolean }> = ({
    letter,
    revealed,
}) => (
    <div
        className="button-border"
        style={styles.guessLetterBox}
    >
        <h3><b>{revealed ? letter : '_'}</b></h3>
    </div>
);


const TOP_ROW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const MIDDLE_ROW = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const BOTTOM_ROW = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const ROWS = [TOP_ROW, MIDDLE_ROW, BOTTOM_ROW];

// const HangmanDrawing: React.FC<{ mistakes: number }> = ({ mistakes }) => {
//     return (
//         <div style={styles.hangmanDrawing}>
//             {/* Base */}
//             <div style={styles.gallowsBase} />
            
//             {/* Vertical pole */}
//             <div style={styles.gallowsPole} />
            
//             {/* Top beam */}
//             <div style={styles.gallowsTop} />
            
//             {/* Rope */}
//             <div style={styles.rope} />
            
//             {/* Head */}
//             {mistakes >= 1 && <div style={styles.head} />}
            
//             {/* Body */}
//             {mistakes >= 2 && <div style={styles.body} />}
            
//             {/* Left arm */}
//             {mistakes >= 3 && <div style={Object.assign({}, styles.arm, styles.leftArm)} />}
            
//             {/* Right arm */}
//             {mistakes >= 4 && <div style={Object.assign({}, styles.arm, styles.rightArm)} />}
            
//             {/* Left leg */}
//             {mistakes >= 5 && <div style={Object.assign({}, styles.leg, styles.leftLeg)} />}
            
//             {/* Right leg */}
//             {mistakes >= 6 && <div style={Object.assign({}, styles.leg, styles.rightLeg)} />}
//         </div>
//     );
// };

const HangmanContent: React.FC = () => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        setWord(getRandomWord());
    }, []);

    const handleGuess = (letter: string) => {
        if (guessedLetters.includes(letter)) return;
        
        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);
        
        if (!word.includes(letter)) {
            setWrongGuesses([...wrongGuesses, letter]);
        }

        const isWon = word.split('').every(char => newGuessedLetters.includes(char));
        if (isWon) {
            setWon(true);
            setGameOver(true);
        }

        if (wrongGuesses.length >= 5) {
            setGameOver(true);
        }
    };

    const restart = () => {
        setWord(getRandomWord());
        setGuessedLetters([]);
        setWrongGuesses([]);
        setGameOver(false);
        setWon(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Hangman</h2>
                <p>Guess the hidden word. You can make 6 mistakes.</p>
            </div>
            <motion.div
                variants={gameOverAnimations}
                animate={gameOver ? 'show' : 'hidden'}
                initial={false}
                style={Object.assign({}, styles.gameOverContainer, gameOver && { zIndex: 1000 })}
            >
                <h2>{won ? 'You win!' : 'Game Over'}</h2>
                <p>The word was "{word}".</p>
                <br />
                <div className="site-button" onClick={restart}>
                    Restart Game
                </div>
            </motion.div>
            <motion.div
                variants={gameAnimations}
                animate={!gameOver ? 'show' : 'hidden'}
                initial={false}
                style={styles.gameContainer}
            >
                <div style={styles.playArea}>
                    {/* <HangmanDrawing mistakes={wrongGuesses.length} /> */}
                    <div style={styles.wordContainer}>
                        {word.split('').map((letter, index) => (
                            <HiddenLetter
                                key={index}
                                letter={letter}
                                revealed={guessedLetters.includes(letter)}
                            />
                        ))}
                    </div>
                    <p style={styles.mistakes}>
                        Mistakes: {wrongGuesses.length}/6
                    </p>
                </div>
                <div style={styles.keyboardContainer}>
                    {ROWS.map((row, i) => (
                        <div style={styles.keyboardRow} key={`row-${i}`}>
                            {row.map((letter) => (
                                <LetterButton
                                    key={letter}
                                    letter={letter}
                                    onClick={handleGuess}
                                    disabled={guessedLetters.includes(letter) || gameOver}
                                    isCorrect={word.includes(letter) && guessedLetters.includes(letter)}
                                    isWrong={wrongGuesses.includes(letter)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const Hangman: React.FC<WindowProps> = ({ onInteract, onMinimize, onClose }) => {
    return (
        <Window
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            closeWindow={onClose}        
            windowTitle="Hangman"
            width={800}
            height={800}
            top={50}
            left={50}
        >
            <HangmanContent />
        </Window>
    );
};

const gameAnimations = {
    hidden: {
        opacity: 0,
        y: -12,
        transition: { duration: 0.5 },
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5,
        },
    },
};

const gameOverAnimations = {
    hidden: {
        opacity: 0,
        y: 32,
        transition: { duration: 0.5 },
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.4,
            duration: 0.5,
            ease: Easing.expOut,
        },
    },
};

const styles: StyleSheetCSS = {
    container: {
        flex: 1,
        flexDirection: 'column',
        
    },
    gameContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    gameOverContainer: {
        zIndex: -1000,
        textAlign: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        flexShrink: 1,
        paddingTop: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardContainer: {
        flexShrink: 1,
        paddingBottom: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboard: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 600,
        gap: 4,
    },
    keyboardRow: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 8,
        gap: 8,
    },
    playArea: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    letterBox: {
        padding: 12,
        paddingTop: 16,
        minWidth: 42,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16,
        margin: 4,
    },
    guessLetterBox: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        backgroundColor: 'white',
    },
    mistakes: {
        marginTop: 20,
        fontSize: 18,
    },
    hangmanDrawing: {
        position: 'relative',
        height: 210,
        width: 150,
        marginBottom: 20,
    },
    gallowsBase: {
        height: 10,
        width: 100,
        background: 'black',
        position: 'absolute',
        bottom: 0,
        left: 25,
    },
    gallowsPole: {
        height: 200,
        width: 10,
        background: 'black',
        position: 'absolute',
        bottom: 0,
        left: 35,
    },
    gallowsTop: {
        height: 10,
        width: 80,
        background: 'black',
        position: 'absolute',
        top: 0,
        right: 35,
    },
    rope: {
        height: 30,
        width: 4,
        background: 'black',
        position: 'absolute',
        top: 0,
        right: 35,
    },
    head: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: '4px solid black',
        position: 'absolute',
        top: 30,
        right: 22,
    },
    body: {
        width: 4,
        height: 60,
        background: 'black',
        position: 'absolute',
        top: 65,
        right: 35,
    },
    arm: {
        width: 40,
        height: 4,
        background: 'black',
        position: 'absolute',
        top: 80,
        right: 35,
    },
    leftArm: {
        transform: 'rotate(30deg)',
        transformOrigin: 'right bottom',
    },
    rightArm: {
        transform: 'rotate(-30deg)',
        transformOrigin: 'left bottom',
    },
    leg: {
        width: 40,
        height: 4,
        background: 'black',
        position: 'absolute',
        top: 125,
        right: 35,
    },
    leftLeg: {
        transform: 'rotate(30deg)',
        transformOrigin: 'right top',
    },
    rightLeg: {
        transform: 'rotate(-30deg)',
        transformOrigin: 'left top',
    },
};

export default Hangman;