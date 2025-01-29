import React, { useState } from 'react';
import Window from '../os/Window';

interface WindowProps {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

const choices = ['Rock', 'Paper', 'Scissors'] as const;
type Choice = typeof choices[number];

const emojis: { [key in Choice]: string } = {
    Rock: '✊',
    Paper: '✋',
    Scissors: '✌️',
};

const getResult = (playerChoice: Choice, computerChoice: Choice) => {
    if (playerChoice === computerChoice) return 'Draw';
    if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        return 'You Win';
    }
    return 'You Lose';
};

const RockPaperScissorsContent: React.FC = () => {
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const handleChoice = (choice: Choice) => {
        if (result) return;
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setPlayerChoice(choice);
        setComputerChoice(randomChoice);
        setResult(getResult(choice, randomChoice));
        setTimeout(resetGame, 2000);
    };

    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Rock Paper Scissors</h2>
                <p style={styles.subtitle}>{result ? `Result: ${result}` : 'Make your choice!'}</p>
            </div>
            <div style={styles.gameArea}>
                <div style={styles.choices}>
                    {choices.map((choice) => (
                        <div key={choice} style={styles.cell}>
                            <span style={styles.choice}>{computerChoice === choice ? emojis[choice] : '❓'}</span>
                        </div>
                    ))}
                </div>
                <div style={styles.vs}>VS</div>
                <div style={styles.choices}>
                    {choices.map((choice) => (
                        <div key={choice} style={styles.cell} onClick={() => handleChoice(choice)}>
                            <span style={styles.choice}>{emojis[choice]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RockPaperScissors: React.FC<WindowProps> = ({ onInteract, onMinimize, onClose }) => {
    return (
        <Window
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            closeWindow={onClose}
            windowTitle="Rock Paper Scissors"
            windowBarIcon="rockPaperScissorsIcon"
            width={422}
            height={700}
            top={10}
            left={10}
            resizable={false}
        >
            <RockPaperScissorsContent />
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
        paddingTop: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 8,
        marginBottom: 8,
    },
    gameArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
    },
    choices: {
        display: 'flex',
        gap: 10,
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
    choice: {
        fontSize: 36,
    },
    vs: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    result: {
        marginTop: 20,
    },
    restartButton: {
        padding: 10,
        fontSize: 16,
        cursor: 'pointer',
    },
};

export default RockPaperScissors;
