import React, { useRef, useState, useEffect } from 'react';
import Window from '../os/Window';
import DesktopShortcut, { DesktopShortcutProps } from '../os/DesktopShortcut';

interface FolderProps {
    folderId: string;
    folderName: string;
    contents: DesktopShortcutProps[];
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
    onAddItem: (folderId: string, item: DesktopShortcutProps) => void;
    onRemoveItem: (folderId: string, itemName: string) => void;
    onRename: (folderId: string, newName: string) => void;
}

const GRID_SIZE = 100;

const Folder: React.FC<FolderProps> = ({
    folderId,
    folderName,
    contents = [],
    onClose,
    onInteract,
    onMinimize,
    onAddItem,
    onRemoveItem,
    onRename
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(folderName);
    const renameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isRenaming && renameInputRef.current) {
            renameInputRef.current.focus();
            renameInputRef.current.select();
        }
    }, [isRenaming]);

    useEffect(() => {
        console.log(`Folder ${folderId} mounted with contents:`, contents);
    }, []); // Log when folder mounts

    useEffect(() => {
        console.log(`Folder ${folderId} contents:`, contents);
    }, [folderId, contents]);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
        if (contextMenu.visible) {
            setContextMenu({ visible: false, x: 0, y: 0 });
        }
    };

    const handleRename = () => {
        setIsRenaming(true);
        setContextMenu({ visible: false, x: 0, y: 0 });
    };

    const handleRenameSubmit = () => {
        if (newName.trim()) {
            onRename(folderId, newName.trim());
            setIsRenaming(false);
        }
    };

    const handleRenameBlur = () => {
        handleRenameSubmit();
    };

    const handleRenameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRenameSubmit();
        } else if (e.key === 'Escape') {
            setIsRenaming(false);
            setNewName(folderName);
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
                    ref={renameInputRef}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleRenameBlur}
                    onKeyDown={handleRenameKeyDown}
                    style={styles.renameInput}
                />
            ) : folderName}
            windowBarIcon="folderIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div 
                ref={contentRef} 
                style={styles.container}
                onContextMenu={handleContextMenu}
                onClick={handleClick}
            >
                {Array.isArray(contents) && contents.map((item, index) => (
                    <div
                        key={`${item.shortcutName}-${index}`}
                        style={{
                            position: 'absolute',
                            top: Math.floor(index / 3) * GRID_SIZE + 20,
                            left: (index % 3) * GRID_SIZE + 20
                        }}
                    >
                        <DesktopShortcut
                            icon={item.icon}
                            shortcutName={item.shortcutName}
                            onOpen={item.onOpen}
                            textColor="black"
                        />
                    </div>
                ))}
                {contextMenu.visible && (
                    <div style={{
                        ...styles.contextMenu,
                        top: contextMenu.y,
                        left: contextMenu.x
                    }}>
                        <div style={styles.contextMenuItem} onClick={handleRename}>
                            Rename
                        </div>
                        <div style={styles.contextMenuItem}>
                            Paste
                        </div>
                        <div style={styles.contextMenuItem}>
                            New Folder
                        </div>
                    </div>
                )}
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        padding: '10px',
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    contextMenu: {
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
    },
    contextMenuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
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

export default Folder;