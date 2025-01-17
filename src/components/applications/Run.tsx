import React, { useState } from 'react';
import Window from '../os/Window';

interface RunProps {
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
    openApp: (appName: string) => void;
}

const Run: React.FC<RunProps> = ({ onClose, onInteract, onMinimize, openApp }) => {
    const [inputValue, setInputValue] = useState('');

    const handleRun = () => {
        if (inputValue.trim()) {
            openApp(inputValue.trim());
            onClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRun();
        }
    };

    return (
        <Window
            top={100}
            left={100}
            width={400}
            height={200}
            windowTitle="Run"
            windowBarIcon="runIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <p>Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={styles.input}
                />
                <div style={styles.buttons}>
                    <button onClick={handleRun} style={styles.button}>OK</button>
                    <button onClick={onClose} style={styles.button}>Cancel</button>
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        fontSize: '14px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '14px',
        cursor: 'pointer',
    },
};

export default Run;
