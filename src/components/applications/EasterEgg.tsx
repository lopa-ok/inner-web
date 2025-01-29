import React, { useEffect, useState } from 'react';
import Window from '../os/Window';
import { useInterval } from 'usehooks-ts';
import { motion } from 'framer-motion';

const MESSAGES = [
    'Congratulations!',
    'You found the Easter Egg!',
    'Enjoy your day!',
    'Keep exploring!',
    'You are awesome!',
];

const ULTIMATE_MESSAGE = 'You have unlocked the Ultimate Easter Egg!';

const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1'];

const EasterEgg: React.FC<WindowAppProps> = ({ onInteract, onMinimize, onClose }) => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [time, setTime] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [ultimateEasterEgg, setUltimateEasterEgg] = useState(false);

    useInterval(() => {
        setTime(time + 1);
    }, 1000);

    useEffect(() => {
        if (time > 3) {
            setCurrentMessage((currentMessage + 1) % MESSAGES.length);
            setColorIndex((colorIndex + 1) % COLORS.length);
            setTime(0);
        }
    }, [time, currentMessage, colorIndex]);

    useEffect(() => {
        if (clickCount >= 20) {
            setUltimateEasterEgg(true);
        }
    }, [clickCount]);

    const nextMessage = () => {
        setTime(0);
        setCurrentMessage((currentMessage + 1) % MESSAGES.length);
        setColorIndex((colorIndex + 1) % COLORS.length);
        setClickCount(clickCount + 1);
    };

    return (
        <Window
            top={48}
            left={48}
            width={1100}
            height={800}
            windowTitle="Easter Egg"
            windowBarIcon="folderIcon"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div
                onMouseDown={nextMessage}
                style={{
                    ...styles.container,
                    backgroundColor: ultimateEasterEgg ? undefined : COLORS[colorIndex],
                    animation: ultimateEasterEgg ? 'flashColors 1s infinite' : undefined,
                }}
            >
                {ultimateEasterEgg ? (
                    <motion.div
                        animate={{ opacity: 1, y: -20 }}
                        transition={{ duration: 0.5 }}
                        key="ultimate-easter-egg"
                        style={styles.message}
                    >
                        <h1>{ULTIMATE_MESSAGE}</h1>
                    </motion.div>
                ) : (
                    <motion.div
                        animate={{ opacity: 1, y: -20 }}
                        transition={{ duration: 0.5 }}
                        key={`message-${MESSAGES[currentMessage]}`}
                        style={styles.message}
                    >
                        <h1>{MESSAGES[currentMessage]}</h1>
                    </motion.div>
                )}
                <p>Click to continue...</p>
                <div style={styles.timer}>
                    {Array.from(Array(time)).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            <p>.</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <style>
                {`
                    @keyframes flashColors {
                        0% { background-color: ${COLORS[0]}; }
                        20% { background-color: ${COLORS[1]}; }
                        40% { background-color: ${COLORS[2]}; }
                        60% { background-color: ${COLORS[3]}; }
                        80% { background-color: ${COLORS[4]}; }
                        100% { background-color: ${COLORS[0]}; }
                    }
                `}
            </style>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        height: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        textAlign: 'center',
    },
    message: {
        opacity: 0,
    },
    timer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
    },
};

export default EasterEgg;
