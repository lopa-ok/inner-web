import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';

interface GamesTextProps {
    fileName: string;
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
}

const GamesText: React.FC<GamesTextProps> = ({ fileName, onClose, onInteract, onMinimize }) => {
    const [content] = useState('This folder contains games that are not as retro but were still worth including.');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        onClose();
    };

    return (
        <Window
            top={10}
            left={10}
            width={600}
            height={500}
            windowTitle={fileName}
            windowBarIcon="textFileIcon"
            windowBarColor="#757579"
            closeWindow={handleClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <textarea
                style={styles.textArea}
                value={content}
                readOnly
            />
        </Window>
    );
};

const styles: StyleSheetCSS = {
    textArea: {
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '14px',
        backgroundColor: '#f0f0f0',
    },
};

export default GamesText;
