import React, { useRef, useState, useEffect } from 'react';
import Window from '../os/Window';
import DesktopShortcut, { DesktopShortcutProps } from '../os/DesktopShortcut';

interface RecycleBinProps {
    contents: DesktopShortcutProps[];
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
    onAddItem: (item: DesktopShortcutProps) => void;
    onRemoveItem: (itemName: string) => void;
    onRename: (itemName: string, newName: string) => void;
    addWindow: (key: string, element: JSX.Element, zIndex?: number) => void;
    getHighestZIndex: () => number;
}

const GRID_SIZE = 100;

const RecycleBin: React.FC<RecycleBinProps> = ({
    contents = [],
    onClose,
    onInteract,
    onMinimize,
    onAddItem,
    onRemoveItem,
    onRename,
    addWindow,
    getHighestZIndex,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, targetId: '' });
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState('');
    const renameInputRef = useRef<HTMLInputElement>(null);
    const [positions, setPositions] = useState<{ [key: string]: { top: number; left: number } }>({});

    useEffect(() => {
        if (isRenaming && renameInputRef.current) {
            renameInputRef.current.focus();
            renameInputRef.current.select();
        }
    }, [isRenaming]);

    useEffect(() => {
        console.log(`Recycle Bin contents:`, contents);
    }, [contents]);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY, targetId: '' });
    };

    const handleItemContextMenu = (e: React.MouseEvent, itemName: string) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY, targetId: itemName });
    };

    const handleClick = () => {
        if (contextMenu.visible) {
            setContextMenu({ visible: false, x: 0, y: 0, targetId: '' });
        }
    };

    const handleRename = () => {
        setIsRenaming(true);
        setContextMenu({ visible: false, x: 0, y: 0, targetId: '' });
    };

    const handleRenameSubmit = () => {
        if (newName.trim()) {
            onRename(contextMenu.targetId, newName.trim());
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
            setNewName('');
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const key = e.dataTransfer.getData('text/plain');
        const item = JSON.parse(sessionStorage.getItem(key) || '{}');
        if (item.shortcutName) {
            onAddItem(item);
            sessionStorage.removeItem(key);

            const totalItems = contents.length;
            const column = Math.floor(totalItems / Math.floor((window.innerHeight - 100) / GRID_SIZE));
            const row = totalItems % Math.floor((window.innerHeight - 100) / GRID_SIZE);

            const position = {
                top: 20 + (row * GRID_SIZE),
                left: 20 + (column * GRID_SIZE)
            };

            setPositions(prev => ({
                ...prev,
                [item.shortcutName]: position
            }));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, key: string) => {
        e.dataTransfer.setData('text/plain', key);
    };

    const handleDropInsideFolder = (e: React.DragEvent<HTMLDivElement>, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        let top = e.clientY - rect.top;
        let left = e.clientX - rect.left;

        // Snap to grid
        top = Math.round(top / GRID_SIZE) * GRID_SIZE;
        left = Math.round(left / GRID_SIZE) * GRID_SIZE;

        // Check for collisions and adjust position if necessary
        const newPosition = { top, left };
        const collision = Object.values(positions).some(
            (pos) => pos.top === newPosition.top && pos.left === newPosition.left
        );

        if (collision) {
            newPosition.top += GRID_SIZE;
        }

        setPositions((prevPositions) => ({
            ...prevPositions,
            [key]: newPosition,
        }));
    };

    const handleOpenApp = (appKey: string, appComponent: JSX.Element) => {
        const highestZIndex = getHighestZIndex();
        addWindow(appKey, appComponent, highestZIndex + 1);
    };

    const handleDelete = (itemName: string) => {
        onRemoveItem(itemName);
    };

    const emptyRecycleBin = () => {
        contents.forEach(item => onRemoveItem(item.shortcutName));
    };

    return (
        <Window
            top={10}
            left={10}
            width={600}
            height={500}
            windowTitle="Recycle Bin"
            windowBarIcon={contents.length > 0 ? 'recycleBinFullIcon' : 'recycleBinIcon'}
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
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {Array.isArray(contents) && contents.map((item, index) => {
                    const position = positions[item.shortcutName] || {
                        top: Math.floor(index / Math.floor((window.innerHeight - 100) / GRID_SIZE)) * GRID_SIZE + 20,
                        left: (index % Math.floor((window.innerHeight - 100) / GRID_SIZE)) * GRID_SIZE + 20
                    };

                    return (
                        <div
                            key={`${item.shortcutName}-${index}`}
                            style={Object.assign({}, styles.shortcutContainer, position)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.shortcutName)}
                            onDrop={(e) => handleDropInsideFolder(e, item.shortcutName)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleItemContextMenu(e, item.shortcutName)}
                        >
                            <DesktopShortcut
                                icon={item.icon}
                                shortcutName={item.shortcutName}
                                onOpen={item.onOpen}
                                textColor="black"
                            />
                        </div>
                    );
                })}
                {contextMenu.visible && (
                    <div style={{
                        ...styles.contextMenu,
                        top: contextMenu.y,
                        left: contextMenu.x
                    }}>
                        {contextMenu.targetId ? (
                            <>
                                <div style={styles.contextMenuItem} onClick={handleRename}>
                                    Rename
                                </div>
                                <div style={styles.contextMenuItem} onClick={() => handleDelete(contextMenu.targetId!)}>
                                    Delete
                                </div>
                            </>
                        ) : (
                            <div style={styles.contextMenuItem} onClick={emptyRecycleBin}>
                                Empty Recycle Bin
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '10px',
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    shortcutContainer: {
        position: 'absolute',
        cursor: 'move',
    },
    contextMenu: {
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
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

export default RecycleBin;
