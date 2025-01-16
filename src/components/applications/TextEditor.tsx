import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';

interface TextEditorProps {
    fileName: string;
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
    onRename: (newName: string) => void;
    isRenaming: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ fileName, onClose, onInteract, onMinimize, onRename, isRenaming }) => {
    const [content, setContent] = useState('');
    const [editingName, setEditingName] = useState(fileName);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedContent = sessionStorage.getItem(fileName);
        if (savedContent) {
            setContent(savedContent);
        }
    }, [fileName]);

    useEffect(() => {
        if (isRenaming && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isRenaming]);

    const handleClose = () => {
        sessionStorage.setItem(fileName, content);
        onClose();
    };

    const handleRenameSubmit = () => {
        if (editingName.trim() && onRename) {
            onRename(editingName.trim());
        }
    };

    const handleRenameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRenameSubmit();
        } else if (e.key === 'Escape') {
            setEditingName(fileName);
            onRename(fileName);
        }
    };

    return (
        <Window
            top={10}
            left={10}
            width={600}
            height={500}
            windowTitle={isRenaming ? (
                <input
                    ref={inputRef}
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={handleRenameSubmit}
                    onKeyDown={handleRenameKeyDown}
                    style={styles.renameInput}
                />
            ) : fileName}
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
    renameInput: {
        background: 'white',
        border: '1px solid #000080',
        padding: '2px 4px',
        fontFamily: 'MSSerif',
        fontSize: '14px',
        width: '150px',
    },
};

export default TextEditor;
