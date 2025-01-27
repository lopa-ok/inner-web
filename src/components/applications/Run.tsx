import React, { useState } from 'react';
import Window from '../os/Window';

export interface RunProps extends WindowAppProps {
    openAppByName: (appName: string) => void;
}

const Run: React.FC<RunProps> = (props) => {
    const [input, setInput] = useState('');

    const handleRun = () => {
        props.openAppByName(input);
        props.onClose();
    };

    return (
        <Window
            top={100}
            left={100}
            width={400}
            height={220}
            windowTitle="Run"
            windowBarIcon="runIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <p style={styles.description}>Type the name of a program, folder, document, and Windows will open it for you.</p>
                <div style={styles.inputContainer}>
                    <label htmlFor="run-input" style={styles.label}>Open:</label>
                    <input
                        id="run-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.buttons}>
                    <button onClick={handleRun} style={styles.button}>OK</button>
                    <button onClick={props.onClose} style={styles.button}>Cancel</button>
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 40px)',
        justifyContent: 'space-between',
        backgroundColor: '#d3d3d3',
    },
    description: {
        marginBottom: 10,
        fontSize: 14,
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
        fontSize: 14,
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 14,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        padding: 6,
        marginLeft: 10,
        fontSize: 14,
        cursor: 'pointer',
    },
};

export default Run;
