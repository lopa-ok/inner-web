import React, { useRef, useState, useEffect } from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';

const GRID_SIZE = 100;

interface GamesFolderProps {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
    openWordleApp: () => void;
    openGamesText: () => void;
    openSudokuApp: () => void;
    openHangmanApp: () => void;
    openTicTacToeApp: () => void;
    open2048App: () => void;
    openWhackAMoleApp: () => void;
    openTetrisApp: () => void;
    openMazeApp: () => void;
    openPaintApp: () => void;
    openSnakeApp: () => void;
    openMemoryGameApp: () => void;
}

const GamesFolder: React.FC<GamesFolderProps> = ({
    onInteract,
    onMinimize,
    onClose,
    openWordleApp,
    openGamesText,
    openSudokuApp,
    openHangmanApp,
    openTicTacToeApp,
    open2048App,
    openWhackAMoleApp,
    openTetrisApp,
    openMazeApp,
    openPaintApp,
    openSnakeApp,
    openMemoryGameApp,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, targetId: '' });
    const [positions, setPositions] = useState<{ [key: string]: { top: number; left: number } }>({});

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY, targetId: '' });
    };

    const handleClick = () => {
        if (contextMenu.visible) {
            setContextMenu({ visible: false, x: 0, y: 0, targetId: '' });
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
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

    return (
        <Window
            top={10}
            left={10}
            width={600}
            height={500}
            windowTitle="Games"
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
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 20, left: 120 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'wordle')}
                    onDrop={(e) => handleDropInsideFolder(e, 'wordle')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="wordleIcon"
                        shortcutName="Wordle"
                        onOpen={openWordleApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 20, left: 20 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'gamesText')}
                    onDrop={(e) => handleDropInsideFolder(e, 'gamesText')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="textFileIcon"
                        shortcutName="Games Info"
                        onOpen={openGamesText}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 20, left: 220 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'Sudoku')}
                    onDrop={(e) => handleDropInsideFolder(e, 'Sudoku')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="sudokuIcon"
                        shortcutName="Sudoku"
                        onOpen={openSudokuApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 20, left: 320 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'Hangman')}
                    onDrop={(e) => handleDropInsideFolder(e, 'Hangman')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="hangmanIcon"
                        shortcutName="Hangman"
                        onOpen={openHangmanApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 20, left: 420 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'ticTacToe')}
                    onDrop={(e) => handleDropInsideFolder(e, 'ticTacToe')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="tictactoeIcon"
                        shortcutName="Tic Tac Toe"
                        onOpen={openTicTacToeApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 120, left: 20 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, '2048')}
                    onDrop={(e) => handleDropInsideFolder(e, '2048')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="twentyIcon"
                        shortcutName="2048"
                        onOpen={open2048App}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 120, left: 120 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'whackAMole')}
                    onDrop={(e) => handleDropInsideFolder(e, 'whackAMole')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="whackIcon"
                        shortcutName="Whack-A-Mole"
                        onOpen={openWhackAMoleApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 120, left: 220 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'tetris')}
                    onDrop={(e) => handleDropInsideFolder(e, 'tetris')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="tetrisIcon"
                        shortcutName="Tetris"
                        onOpen={openTetrisApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 120, left: 320 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'paint')}
                    onDrop={(e) => handleDropInsideFolder(e, 'paint')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="paintIcon"
                        shortcutName="Paint"
                        onOpen={openPaintApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 120, left: 420 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'snake')}
                    onDrop={(e) => handleDropInsideFolder(e, 'snake')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="snakeIcon"
                        shortcutName="Snake"
                        onOpen={openSnakeApp}
                        textColor="black"
                    /> 
                </div>
                {/*
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 120, left: 320 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'maze')}
                    onDrop={(e) => handleDropInsideFolder(e, 'maze')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="folderIcon"
                        shortcutName="Maze"
                        onOpen={openMazeApp}
                        textColor="black"
                    />
                </div>
                */}
                <div
                    style={Object.assign({}, styles.shortcutContainer, { top: 220, left: 20 })}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'memoryGame')}
                    onDrop={(e) => handleDropInsideFolder(e, 'memoryGame')}
                    onDragOver={handleDragOver}
                >
                    <DesktopShortcut
                        icon="memoryIcon"
                        shortcutName="Memory Game"
                        onOpen={openMemoryGameApp}
                        textColor="black"
                    />
                </div>
                {contextMenu.visible && (
                    <div style={{
                        ...styles.contextMenu,
                        top: contextMenu.y,
                        left: contextMenu.x
                    }}>
                        <div style={styles.contextMenuItem}>
                            Rename
                        </div>
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
};

export default GamesFolder;
