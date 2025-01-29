import React, { useRef, useState } from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';
import Credits from '../applications/Credits';
import GamesFolder from '../applications/GamesFolder';
import Wordle from '../applications/wordle';
import GamesText from '../applications/GamesText';
import Sudoku from '../applications/Sudoku';
import Hangman from '../applications/Hangman';
import TicTacToe from '../applications/TicTacToe';
import Game2048 from '../applications/Game2048';
import WhackAMole from '../applications/WhackAMole';
import Tetris from '../applications/Tetris';
import Maze from '../applications/Maze';
import PaintApp from '../applications/PaintApp';
import SnakeGame from '../applications/SnakeGame';
import MemoryGame from '../applications/MemoryGame';
import RockPaperScissors from '../applications/RockPaperScissors';

interface DocumentsProps {
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
    addWindow: (key: string, element: JSX.Element, zIndex?: number) => void;
    getHighestZIndex: () => number;
}

const GRID_SIZE = 100;

const Documents: React.FC<DocumentsProps> = ({
    onClose,
    onInteract,
    onMinimize,
    addWindow,
    getHighestZIndex,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<{ [key: string]: { top: number; left: number } }>({});

    const openCreditsApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'credits',
            <Credits
                onInteract={() => onWindowInteract('credits')}
                onMinimize={() => minimizeWindow('credits')}
                onClose={() => removeWindow('credits')}
                key="credits"
            />,
            highestZIndex + 1
        );
    };

    const openHangmanApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'hangman',
            <Hangman
                onInteract={() => onWindowInteract('hangman')}
                onMinimize={() => minimizeWindow('hangman')}
                onClose={() => removeWindow('hangman')}
                key="hangman"
            />
        );
    };

    const openGamesFolder = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'gamesFolder',
            <GamesFolder
                onInteract={() => onWindowInteract('gamesFolder')}
                onMinimize={() => minimizeWindow('gamesFolder')}
                onClose={() => removeWindow('gamesFolder')}
                openWordleApp={openWordleApp}
                openGamesText={openGamesText}
                openSudokuApp={openSudokuApp}
                openHangmanApp={openHangmanApp}
                openTicTacToeApp={openTicTacToeApp}
                open2048App={open2048App}
                openWhackAMoleApp={openWhackAMoleApp}
                openTetrisApp={openTetrisApp}
                openMazeApp={openMazeApp}
                openPaintApp={openPaintApp}
                openSnakeApp={openSnakeApp}
                openMemoryGameApp={openMemoryGameApp}
                openRockPaperScissorsApp={openRockPaperScissorsApp}
                key="gamesFolder"
            />,
            highestZIndex + 1
        );
    };

    const onWindowInteract = (key: string) => {
        // Implement the logic for window interaction
    };

    const minimizeWindow = (key: string) => {
        // Implement the logic for minimizing the window
    };

    const removeWindow = (key: string) => {
        // Implement the logic for removing the window
    };

    const openWordleApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'wordle',
            <Wordle
                onInteract={() => onWindowInteract('wordle')}
                onMinimize={() => minimizeWindow('wordle')}
                onClose={() => removeWindow('wordle')}
                key="wordle"
            />
        );
    };

    const openGamesText = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'gamesText',
            <GamesText
                fileName="Games Info"
                onInteract={() => onWindowInteract('gamesText')}
                onMinimize={() => minimizeWindow('gamesText')}
                onClose={() => removeWindow('gamesText')}
                key="gamesText"
            />
        );
    };
    const openSudokuApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'sudoku',
            <Sudoku
                onInteract={() => onWindowInteract('sudoku')}
                onMinimize={() => minimizeWindow('sudoku')}
                onClose={() => removeWindow('sudoku')}
                key="sudoku"
            />
        );
    };

    const openTicTacToeApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'ticTacToe',
            <TicTacToe
                onInteract={() => onWindowInteract('ticTacToe')}
                onMinimize={() => minimizeWindow('ticTacToe')}
                onClose={() => removeWindow('ticTacToe')}
                key="ticTacToe"
            />
        );
    };

    const open2048App = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            '2048',
            <Game2048
                onInteract={() => onWindowInteract('2048')}
                onMinimize={() => minimizeWindow('2048')}
                onClose={() => removeWindow('2048')}
                key="2048"
            />
        );
    };

    const openWhackAMoleApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'whackAMole',
            <WhackAMole
                onInteract={() => onWindowInteract('whackAMole')}
                onMinimize={() => minimizeWindow('whackAMole')}
                onClose={() => removeWindow('whackAMole')}
                key="whackAMole"
            />
        );
    };

    const openTetrisApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'tetris',
            <Tetris
                onInteract={() => onWindowInteract('tetris')}
                onMinimize={() => minimizeWindow('tetris')}
                onClose={() => removeWindow('tetris')}
                key="tetris"
            />
        );
    };

    const openMazeApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'maze',
            <Maze
                onInteract={() => onWindowInteract('maze')}
                onMinimize={() => minimizeWindow('maze')}
                onClose={() => removeWindow('maze')}
                key="maze"
            />
        );
    };

    const openPaintApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'paint',
            <PaintApp
                onInteract={() => onWindowInteract('paint')}
                onMinimize={() => minimizeWindow('paint')}
                onClose={() => removeWindow('paint')}
                key="paint"
            />
        );
    };

    const openSnakeApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'snake',
            <SnakeGame
                onInteract={() => onWindowInteract('snake')}
                onMinimize={() => minimizeWindow('snake')}
                onClose={() => removeWindow('snake')}
                key="snake"
            />
        );
    };

    const openMemoryGameApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'memoryGame',
            <MemoryGame
                onInteract={() => onWindowInteract('memoryGame')}
                onMinimize={() => minimizeWindow('memoryGame')}
                onClose={() => removeWindow('memoryGame')}
                key="memoryGame"
            />
        );
    };

    const openRockPaperScissorsApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'rockPaperScissors',
            <RockPaperScissors
                onInteract={() => onWindowInteract('rockPaperScissors')}
                onMinimize={() => minimizeWindow('rockPaperScissors')}
                onClose={() => removeWindow('rockPaperScissors')}
                key="rockPaperScissors"
            />
        );
    };

    return (
        <Window
            top={50}
            left={100}
            width={600}
            height={500}
            windowTitle="Documents"
            windowBarIcon="documentsIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div ref={contentRef} style={styles.container}>
                <div
                    style={styles.shortcutContainer}
                    onDoubleClick={openCreditsApp}
                >
                    <DesktopShortcut
                        icon="credits"
                        shortcutName="Credits"
                        onOpen={openCreditsApp}
                        textColor="black"
                    />
                </div>
                <div
                    style={{ ...styles.shortcutContainer, top: 20, left: 120 }}
                    onDoubleClick={openGamesFolder}
                >
                    <DesktopShortcut
                        icon="folderIcon"
                        shortcutName="Games Folder"
                        onOpen={openGamesFolder}
                        textColor="black"
                    />
                </div>
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
        top: 20,
        left: 20,
        cursor: 'pointer',
    },
};

export default Documents;
