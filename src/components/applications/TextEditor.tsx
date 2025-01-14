import React, { useState, useEffect } from 'react';
import Window from '../os/Window';

interface TextEditorProps {
    fileName: string;
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ fileName, onClose, onInteract, onMinimize }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const savedContent = sessionStorage.getItem(fileName);
        if (savedContent) {
            setContent(savedContent);
        }
    }, [fileName]);

    const handleClose = () => {
        sessionStorage.setItem(fileName, content);
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
                onChange={(e) => setContent(e.target.value)}
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
    },
};

export default TextEditor;
