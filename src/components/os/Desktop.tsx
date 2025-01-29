import React, { useCallback, useEffect, useState } from 'react';
import Colors from '../../constants/colors';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import Doom from '../applications/Doom';
import OregonTrail from '../applications/OregonTrail';
import ShutdownSequence from './ShutdownSequence';
import ThisComputer from '../applications/ThisComputer';
import Wordle from '../applications/wordle';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import Scrabble from '../applications/Scrabble';
// import Minesweeper from '../applications/MinesweeperGame/Minesweeper';
import Credits from '../applications/Credits';
import InternetExplorer from '../applications/InternetExplorer';
import Folder from '../applications/folder';
import RecycleBin from '../applications/RecycleBin';
import { IconName } from '../../assets/icons';
import Settings from '../applications/Settings';
import Window from './Window';
import bg0 from '../../assets/bg/bg0.png';
import TextEditor from '../applications/TextEditor';
import MSN from '../applications/MSN';
import Run from '../applications/Run';
import Documents from '../applications/Documents';
import GamesFolder from '../applications/GamesFolder';
import GamesText from '../applications/GamesText';
import Sudoku from '../applications/Sudoku';
import Hangman from '../applications/Hangman';
import Game2048 from '../applications/Game2048';
import TicTacToe from '../applications/TicTacToe';
import WhackAMole from '../applications/WhackAMole';
import Tetris from '../applications/Tetris';
import Maze from '../applications/Maze';
import PaintApp from '../applications/PaintApp';
import SnakeGame from '../applications/SnakeGame';
import MemoryGame from '../applications/MemoryGame';
import MSDOS from '../applications/MSDOS';
import Calculator from '../applications/Calculator';
import Help from '../applications/Help';
import EasterEgg from '../applications/EasterEgg';
import RockPaperScissors from '../applications/RockPaperScissors';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const GRID_SIZE = 100;
const VERTICAL_SPACING = 104;
const HORIZONTAL_SPACING = 100;
const INITIAL_OFFSET = { top: 16, left: 6 };
const WINDOW_OFFSET = 30;
const TOOLBAR_HEIGHT = 32;

interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    type: 'desktop' | 'folder' | 'file';
    targetId?: string;
}

const EASTER_EGG_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let easterEggIndex = 0;

const Desktop: React.FC<DesktopProps> = (props) => {
    const [windows, setWindows] = useState<DesktopWindows>({});
    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);
    const [positions, setPositions] = useState<{ [key: string]: { top: number; left: number } }>({});
    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);
    const [folders, setFolders] = useState<{[key: string]: DesktopShortcutProps[]}>({});
    const [nextFolderId, setNextFolderId] = useState(1);
    const [nextFileId, setNextFileId] = useState(1);
    const [folderContents, setFolderContents] = useState<{ [key: string]: DesktopShortcutProps[] }>({});
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({ 
        visible: false, 
        x: 0, 
        y: 0, 
        type: 'desktop' 
    });
    const [background, setBackground] = useState<string | null>(null);
    const [theme, setTheme] = useState<string | null>(null);
    const [folderNames, setFolderNames] = useState<{[key: string]: string}>({});
    const [renamingFolder, setRenamingFolder] = useState<string | null>(null);
    const [recentApps, setRecentApps] = useState<string[]>([]);

    const EXCLUDED_RECENT_APPS = ['run', 'help', 'find', 'settings', 'documents'];

    const addRecentApp = (appName: string) => {
        if (!EXCLUDED_RECENT_APPS.includes(appName.toLowerCase())) {
            setRecentApps((prev) => {
                const updatedRecentApps = [appName, ...prev.filter((app) => app !== appName)];
                return updatedRecentApps.slice(0, 3);
            });
        }
    };

    // Initialize background from localStorage on component mount
    useEffect(() => {
        const savedBg = localStorage.getItem('background');
        const savedTheme = localStorage.getItem('theme');
        if (savedBg && savedTheme) {
            updateBackground(savedBg, savedTheme);
        } else {
            const defaultBg = bg0;
            const defaultTheme = '#098684';
            updateBackground(defaultBg, defaultTheme);
            localStorage.setItem('background', defaultBg);
            localStorage.setItem('theme', defaultTheme);
        }
    }, []);

    useEffect(() => {
        const bodyBG = document.getElementsByTagName('body')[0];
        bodyBG.style.transition = 'background-color 0.3s, background-image 0.3s';
        bodyBG.style.backgroundColor = '#c5c4c4';
        bodyBG.style.backgroundSize = 'cover';
        bodyBG.style.backgroundPosition = 'center';
        bodyBG.style.backgroundRepeat = 'no-repeat';
        bodyBG.style.height = '100vh';
        bodyBG.style.margin = '0';
    }, []);

    const updateBackground = useCallback((background: string, theme: string) => {
        console.log('Updating background:', { background, theme });
        setBackground(background);
        setTheme(theme);
        const bodyBG = document.getElementsByTagName('body')[0];
        bodyBG.style.transition = 'background-color 0.3s, background-image 0.3s';
        bodyBG.style.backgroundColor = theme;
        bodyBG.style.backgroundImage = `url(${background})`;
        bodyBG.style.backgroundSize = 'cover';
        bodyBG.style.backgroundPosition = 'center';
        bodyBG.style.backgroundRepeat = 'no-repeat';
        bodyBG.style.height = '100vh';
        bodyBG.style.margin = '0';
    }, []);

    const getHighestZIndex = useCallback((): number => {
        let highestZIndex = 0;
        Object.keys(windows).forEach((key) => {
            const window = windows[key];
            if (window) {
                if (window.zIndex > highestZIndex)
                    highestZIndex = window.zIndex;
            }
        });
        return highestZIndex;
    }, [windows]);

    const openCreditsApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'credits',
            <Credits
                onInteract={() => onWindowInteract('credits')}
                onMinimize={() => minimizeWindow('credits')}
                onClose={() => removeWindow('credits')}
                key="credits"
            />
        );
        addRecentApp('Credits');
    };

    const openMSNApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'msn',
            <MSN
                onInteract={() => onWindowInteract('msn')}
                onMinimize={() => minimizeWindow('msn')}
                onClose={() => removeWindow('msn')}
                key="msn"
            />
        );
        addRecentApp('MSN');
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
        addRecentApp('Wordle');
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
        addRecentApp('Games Info');
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
        addRecentApp('Tic Tac Toe');
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
        addRecentApp('Whack-A-Mole');
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
        addRecentApp('2048');
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
        addRecentApp('Tetris');
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
        addRecentApp('Maze');
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
                openSudokuApp={() => {
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
                    addRecentApp('Sudoku');
                }}
                openHangmanApp={() => {
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
                    addRecentApp('Hangman');
                }}
                openTicTacToeApp={openTicTacToeApp}
                open2048App={open2048App}
                openWhackAMoleApp={openWhackAMoleApp}
                openTetrisApp={openTetrisApp}
                openMazeApp={openMazeApp}
                openPaintApp={() => {
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
                    addRecentApp('Paint');
                }}
                openSnakeApp={() => {
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
                    addRecentApp('Snake');
                }}
                openMemoryGameApp={() => {
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
                    addRecentApp('Memory Game');
                }}
                openRockPaperScissorsApp={openRockPaperScissorsApp}
                key="gamesFolder"
            />,
            highestZIndex + 1
        );
        addRecentApp('Games Folder');
    };

    const openMSDOSApp = () => {
        const highestZIndex = getHighestZIndex();
        addWindow(
            'msdos',
            <MSDOS
                onInteract={() => onWindowInteract('msdos')}
                onMinimize={() => minimizeWindow('msdos')}
                onClose={() => removeWindow('msdos')}
                key="msdos"
            />
        );
        addRecentApp('MS-DOS');
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
        addRecentApp('Rock Paper Scissors');
    };

    const APPLICATIONS: {
        [key in string]: {
            key: string;
            name: string;
            shortcutIcon: IconName;
            component: React.FC<ExtendedWindowAppProps<any>>;
        };
    } = {
        // Removed the folder entry from apps since i made it seperate
        showcase: {
            key: 'showcase',
            name: 'Showcase',
            shortcutIcon: 'showcaseIcon',
            component: ShowcaseExplorer,
        },
        wordle: {
            key: 'wordle',
            name: 'Wordle',
            shortcutIcon: 'wordleIcon',
            component: Wordle,
        },
        trail: {
            key: 'trail',
            name: 'The Oregon Trail',
            shortcutIcon: 'trailIcon',
            component: OregonTrail,
        },
        doom: {
            key: 'doom',
            name: 'Doom',
            shortcutIcon: 'doomIcon',
            component: Doom,
        },
        scrabble: {
            key: 'scrabble',
            name: 'Scrabble',
            shortcutIcon: 'scrabbleIcon',
            component: Scrabble,
        },
        // chess: {
        //     key: 'chess',
        //     name: 'Chess',
        //     shortcutIcon: 'chessIcon',
        //     component: Settings,
        // },
        internetExplorer: {
            key: 'internetExplorer',
            name: 'Google Chrome',
            shortcutIcon: 'InternetExplorerIcon',
            component: InternetExplorer,
        },
        credits: {
            key: 'credits',
            name: 'Credits',
            shortcutIcon: 'credits',
            component: Credits,
        },
        settings: {
            key: 'settings',
            name: 'Settings',
            shortcutIcon: 'setting',
            component: Settings,
        },
        gamesFolder: {
            key: 'gamesFolder',
            name: 'Games Folder',
            shortcutIcon: 'folderIcon',
            component: (props: ExtendedWindowAppProps<any>) => (
                <GamesFolder
                    onInteract={props.onInteract}
                    onMinimize={props.onMinimize}
                    onClose={props.onClose}
                    openWordleApp={openWordleApp}
                    openGamesText={openGamesText}
                    openSudokuApp={() => {
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
                        addRecentApp('Sudoku');
                    }}
                    openHangmanApp={() => {
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
                        addRecentApp('Hangman');
                    }}
                    openTicTacToeApp={openTicTacToeApp}
                    open2048App={open2048App}
                    openWhackAMoleApp={openWhackAMoleApp}
                    openTetrisApp={openTetrisApp}
                    openMazeApp={openMazeApp}
                    openPaintApp={() => {
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
                        addRecentApp('Paint');
                    }}
                    openSnakeApp={() => {
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
                        addRecentApp('Snake');
                    }}
                    openMemoryGameApp={() => {
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
                        addRecentApp('Memory Game');
                    }}
                    openRockPaperScissorsApp={openRockPaperScissorsApp}
                />
            ),
        },
        gamesText: {
            key: 'gamesText',
            name: 'Games Info',
            shortcutIcon: 'textFileIcon',
            component: GamesText,
        },
        sudoku: {
            key: 'sudoku',
            name: 'Sudoku',
            shortcutIcon: 'sudokuIcon',
            component: Sudoku,
        },
        hangman: {
            key: 'hangman',
            name: 'Hangman',
            shortcutIcon: 'hangmanIcon',
            component: Hangman,
        },
        game2048: {
            key: 'game2048',
            name: '2048',
            shortcutIcon: 'twentyIcon',
            component: Game2048,
        },
        ticTacToe: {
            key: 'ticTacToe',
            name: 'Tic Tac Toe',
            shortcutIcon: 'tictactoeIcon',
            component: TicTacToe,
        },
        whackAMole: {
            key: 'whackAMole',
            name: 'Whack-A-Mole',
            shortcutIcon: 'whackIcon',
            component: WhackAMole,
        },
        tetris: {
            key: 'tetris',
            name: 'Tetris',
            shortcutIcon: 'tetrisIcon',
            component: Tetris,
        },
        maze: {
            key: 'maze',
            name: 'Maze',
            shortcutIcon: 'folderIcon',
            component: Maze,
        },
        paint: {
            key: 'paint',
            name: 'Paint',
            shortcutIcon: 'paintIcon',
            component: PaintApp,
        },
        snake: {
            key: 'snake',
            name: 'Snake',
            shortcutIcon: 'snakeIcon',
            component: SnakeGame,
        },
        memoryGame: {
            key: 'memoryGame',
            name: 'Memory Game',
            shortcutIcon: 'memoryIcon',
            component: MemoryGame,
        },
        msdos: {
            key: 'msdos',
            name: 'MS-DOS',
            shortcutIcon: 'dosIcon',
            component: MSDOS,
        },
        calculator: {
            key: 'calculator',
            name: 'Calculator',
            shortcutIcon: 'calculatorIcon',
            component: Calculator,
        },
        run: {
            key: 'run',
            name: 'Run',
            shortcutIcon: 'runIcon',
            component: (props: ExtendedWindowAppProps<any>) => (
                <Run
                    onInteract={props.onInteract}
                    onMinimize={props.onMinimize}
                    onClose={props.onClose}
                    openAppByName={openAppByName}
                />
            ),
        },
        msn: {
            key: 'msn',
            name: 'MSN',
            shortcutIcon: 'msnIcon',
            component: MSN,
        },
        // minesweeper: {
        //     key: 'minesweeper',
        //     name: 'Minesweeper',
        //     shortcutIcon: 'setting',
        //     component: (props: ExtendedWindowAppProps<any>) => (
        //         <Window
        //             closeWindow={props.onClose}
        //             minimizeWindow={props.onMinimize}
        //             onInteract={props.onInteract}
        //             width={400}
        //             height={400}
        //             top={100}
        //             left={100}
        //             windowTitle="Minesweeper"
        //             windowBarIcon="setting"
        //         >
        //             <Minesweeper
        //                 onInteract={props.onInteract}
        //                 onMinimize={props.onMinimize}
        //                 onClose={props.onClose}
        //             />
        //         </Window>
        //     ),
        // },
        help: {
            key: 'help',
            name: 'Help',
            shortcutIcon: 'helpIcon',
            component: Help,
        },
        easterEgg: {
            key: 'easterEgg',
            name: 'Easter Egg',
            shortcutIcon: 'folderIcon',
            component: EasterEgg,
        },
        rockPaperScissors: {
            key: 'rockPaperScissors',
            name: 'Rock Paper Scissors',
            shortcutIcon: 'rockPaperScissorsIcon',
            component: RockPaperScissors,
        },
    };

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    useEffect(() => {
        const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key) => {
            const app = APPLICATIONS[key];
            
            //Why didnt i do this from the start :P

            if (
                key !== 'credits' &&
                key !== 'settings' &&
                key !== 'folder' &&
                key !== 'msn' &&
                key !== 'gamesFolder' &&
                key !== 'gamesText' &&
                key !== 'wordle' &&
                key !== 'sudoku' &&
                key !== 'hangman' &&
                key !== 'game2048' &&
                key !== 'ticTacToe' &&
                key !== 'tetris' &&
                key !== 'whackAMole' &&
                key !== 'maze' &&
                key !== 'paint' &&
                key !== 'snake' &&
                key !== 'memoryGame' &&
                key !== 'msdos' &&
                key !== 'calculator' &&
                key !== 'run' &&
                key !== 'help' &&
                key !== 'easterEgg' &&
                key !== 'rockPaperScissors'
            ) {
                newShortcuts.push({
                    shortcutName: app.name,
                    icon: app.shortcutIcon,
                    onOpen: () => {
                        addWindow(
                            app.key,
                            <app.component
                                onInteract={() => onWindowInteract(app.key)}
                                onMinimize={() => minimizeWindow(app.key)}
                                onClose={() => removeWindow(app.key)}
                                key={app.key}
                            />
                        );
                    },
                });
            }
        });

        initializeDocumentsFolder();
        initializeRecycleBin();

        newShortcuts.forEach((shortcut, index) => {
            const column = Math.floor(index / Math.floor((window.innerHeight - TOOLBAR_HEIGHT) / VERTICAL_SPACING));
            const row = index % Math.floor((window.innerHeight - TOOLBAR_HEIGHT) / VERTICAL_SPACING);
            const position = {
                top: Math.round((INITIAL_OFFSET.top + (row * VERTICAL_SPACING)) / GRID_SIZE) * GRID_SIZE,
                left: Math.round((INITIAL_OFFSET.left + (column * HORIZONTAL_SPACING)) / GRID_SIZE) * GRID_SIZE
            };
            setPositions(prev => ({
                ...prev,
                [shortcut.shortcutName]: position
            }));
            if (shortcut.shortcutName === 'Showcase') {
                shortcut.onOpen();
            }
        });

        setShortcuts(prevShortcuts => [...prevShortcuts, ...newShortcuts]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const snapToGrid = () => {
            setPositions((prevPositions) => {
                const newPositions = { ...prevPositions };
                Object.keys(newPositions).forEach((key) => {
                    newPositions[key].top = Math.round(newPositions[key].top / GRID_SIZE) * GRID_SIZE;
                    newPositions[key].left = Math.round(newPositions[key].left / GRID_SIZE) * GRID_SIZE;
                });
                return newPositions;
            });
        };

        snapToGrid();
    }, []);

    useEffect(() => {

        const savedShortcuts = sessionStorage.getItem('shortcuts');
        const savedFolders = sessionStorage.getItem('folders');
        const savedPositions = sessionStorage.getItem('positions');
        const savedFolderNames = sessionStorage.getItem('folderNames');
        const savedNextFolderId = sessionStorage.getItem('nextFolderId');
        const savedNextFileId = sessionStorage.getItem('nextFileId');
        const savedWindows = sessionStorage.getItem('windows');
    
        if (savedShortcuts) {
            const parsedShortcuts = JSON.parse(savedShortcuts);
            parsedShortcuts.forEach((shortcut: DesktopShortcutProps) => {
                shortcut.onOpen = () => {
                    const app = APPLICATIONS[shortcut.shortcutName.toLowerCase()];
                    if (app) {
                        addWindow(
                            app.key,
                            <app.component
                                onInteract={() => onWindowInteract(app.key)}
                                onMinimize={() => minimizeWindow(app.key)}
                                onClose={() => removeWindow(app.key)}
                                key={app.key}
                            />
                        );
                    }
                };
            });
            setShortcuts(parsedShortcuts);
        }
        if (savedFolders) {
            setFolders(JSON.parse(savedFolders));
        }
        if (savedPositions) {
            setPositions(JSON.parse(savedPositions));
        }
        if (savedFolderNames) {
            setFolderNames(JSON.parse(savedFolderNames));
        }
        if (savedNextFolderId) {
            setNextFolderId(JSON.parse(savedNextFolderId));
        }
        if (savedNextFileId) {
            setNextFileId(JSON.parse(savedNextFileId));
        }
        if (savedWindows) {
            setWindows(JSON.parse(savedWindows));
        }
    }, []);
    
    useEffect(() => {

        sessionStorage.setItem('shortcuts', JSON.stringify(shortcuts));
        sessionStorage.setItem('folders', JSON.stringify(folders));
        sessionStorage.setItem('positions', JSON.stringify(positions));
        sessionStorage.setItem('folderNames', JSON.stringify(folderNames));
        sessionStorage.setItem('nextFolderId', JSON.stringify(nextFolderId));
        sessionStorage.setItem('nextFileId', JSON.stringify(nextFileId));
        sessionStorage.setItem('windows', JSON.stringify(windows));
    }, [shortcuts, folders, positions, folderNames, nextFolderId, nextFileId, windows]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === EASTER_EGG_SEQUENCE[easterEggIndex]) {
            easterEggIndex++;
            if (easterEggIndex === EASTER_EGG_SEQUENCE.length) {
                alert('Easter Egg Activated!');
                easterEggIndex = 0;
            }
        } else {
            easterEggIndex = 0;
        }
    };

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const removeWindow = useCallback((key: string) => {
        // Absolute hack and a half
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const toggleMinimize = useCallback(
        (key: string) => {
            const newWindows = { ...windows };
            const highestIndex = getHighestZIndex();
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key].zIndex = getHighestZIndex() + 1;
            setWindows(newWindows);
        },
        [windows, getHighestZIndex]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                const highestZIndex = getHighestZIndex();
                newWindows[key].zIndex = highestZIndex + 1;
                return newWindows;
            });
        },
        [getHighestZIndex]
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element, zIndex?: number) => {
            const highestZIndex = getHighestZIndex();
            const existingWindows = Object.keys(windows).length;
            const top = INITIAL_OFFSET.top + (existingWindows * WINDOW_OFFSET);
            const left = INITIAL_OFFSET.left + (existingWindows * WINDOW_OFFSET);

            // Always set new windows to highest z-index + 1
            const newZIndex = Math.max(zIndex || 0, highestZIndex + 1);

            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: newZIndex,
                    minimized: false,
                    component: React.cloneElement(element, { updateBackground }),
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                    top: top % window.innerHeight,
                    left: left % window.innerWidth,
                },
            }));
            onWindowInteract(key);
        },
        [getHighestZIndex, updateBackground, windows]
    );

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, key: string) => {
        e.dataTransfer.setData('text/plain', key);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const key = e.dataTransfer.getData('text/plain');
        const rect = e.currentTarget.getBoundingClientRect();
        let top = e.clientY - rect.top;
        let left = e.clientX - rect.left;

        // Snap to grid
        top = Math.round(top / GRID_SIZE) * GRID_SIZE;
        left = Math.round(left / GRID_SIZE) * GRID_SIZE;

        if (top > window.innerHeight - TOOLBAR_HEIGHT - GRID_SIZE) {
            top = window.innerHeight - TOOLBAR_HEIGHT - GRID_SIZE;
        }

        // Check for collisions and adjust position if necessary
        const newPosition = { top, left };
        let collision = Object.values(positions).some(
            (pos) => pos.top === newPosition.top && pos.left === newPosition.left
        );

        while (collision) {
            newPosition.top += GRID_SIZE;
            if (newPosition.top > window.innerHeight - TOOLBAR_HEIGHT - GRID_SIZE) {
                newPosition.top = INITIAL_OFFSET.top;
                newPosition.left += GRID_SIZE;
            }
            collision = Object.values(positions).some(
                (pos) => pos.top === newPosition.top && pos.left === newPosition.left
            );
        }

        setPositions((prevPositions) => ({
            ...prevPositions,
            [key]: newPosition,
        }));

        //moving items from folders to desktop
        const item = Object.values(folders).flat().find(shortcut => shortcut.shortcutName === key);
        if (item) {
            setShortcuts(prev => [...prev, item]);
            Object.keys(folders).forEach(folderId => {
                setFolders(prev => ({
                    ...prev,
                    [folderId]: prev[folderId].filter(shortcut => shortcut.shortcutName !== key)
                }));
            });
        }
    };

    const handleDropOnFolder = (e: React.DragEvent<HTMLDivElement>, folderId: string) => {
        const key = e.dataTransfer.getData('text/plain');
        const item = shortcuts.find(shortcut => shortcut.shortcutName === key);
        if (item) {
            setShortcuts(prev => prev.filter(shortcut => shortcut.shortcutName !== key));
            addItemToFolder(folderId, item);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const createNewFolder = () => {
        const newFolderId = `folder-${nextFolderId}`;
        const defaultName = `New Folder ${nextFolderId}`;
        
        setFolders(prev => ({
            ...prev,
            [newFolderId]: []
        }));

        setFolderNames(prev => ({
            ...prev,
            [newFolderId]: defaultName
        }));

        // Set initial position for the new folder
        const totalItems = shortcuts.length + Object.keys(folders).length;
        const column = Math.floor(totalItems / Math.floor((window.innerHeight - TOOLBAR_HEIGHT) / VERTICAL_SPACING));
        const row = totalItems % Math.floor((window.innerHeight - TOOLBAR_HEIGHT) / VERTICAL_SPACING);

        const position = {
            top: INITIAL_OFFSET.top + (row * VERTICAL_SPACING),
            left: INITIAL_OFFSET.left + (column * HORIZONTAL_SPACING)
        };

        setPositions(prev => ({
            ...prev,
            [newFolderId]: position
        }));
        
        setNextFolderId(prev => prev + 1);
        setContextMenu({ visible: false, x: 0, y: 0, type: 'desktop' });
    };

    const openFolder = (folderId: string, folderName: string) => {
        const highestZIndex = getHighestZIndex();

        const folderWindow = (
            <Folder
                key={folderId}
                folderId={folderId}
                folderName={folderNames[folderId] || folderName}
                contents={folders[folderId] || []}
                onInteract={() => onWindowInteract(folderId)}
                onMinimize={() => minimizeWindow(folderId)}
                onClose={() => removeWindow(folderId)}
                onAddItem={addItemToFolder}
                onRemoveItem={removeItemFromFolder}
                onRename={handleFolderRename}
                addWindow={addWindow}
                getHighestZIndex={getHighestZIndex}
                bringToFront={() => bringToFront(folderId)}
            />
        );

        setWindows(prev => ({
            ...prev,
            [folderId]: {
                zIndex: highestZIndex + 1,
                minimized: false,
                component: folderWindow,
                name: folderNames[folderId] || folderName,
                icon: 'folderIcon'
            }
        }));
    };

    const bringToFront = (key: string) => {
        setWindows(prevWindows => {
            const newWindows = { ...prevWindows };
            const highestZIndex = getHighestZIndex();
            newWindows[key].zIndex = highestZIndex + 1;
            return newWindows;
        });
    };

    const addItemToFolder = (folderId: string, item: DesktopShortcutProps) => {
        setFolders(prev => ({
            ...prev,
            [folderId]: [...(prev[folderId] || []), item]
        }));
    };

    const removeItemFromFolder = (folderId: string, itemName: string) => {
        setFolders(prev => ({
            [folderId]: prev[folderId].filter(item => item.shortcutName !== itemName)
        }));
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY, type: 'desktop' });
    };

    const handleFolderContextMenu = (e: React.MouseEvent<HTMLDivElement>, folderId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ 
            visible: true, 
            x: e.clientX, 
            y: e.clientY, 
            type: 'folder',
            targetId: folderId 
        });
    };

    const handleFileContextMenu = (e: React.MouseEvent<HTMLDivElement>, fileName: string) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ 
            visible: true, 
            x: e.clientX, 
            y: e.clientY, 
            type: 'file',
            targetId: fileName 
        });
    };

    const handleClick = () => {
        if (contextMenu.visible) {
            setContextMenu({ visible: false, x: 0, y: 0, type: 'desktop' });
        }
    };

    const handleFolderRename = (folderId: string, newName: string) => {
        setFolderNames(prev => ({
            ...prev,
            [folderId]: newName
        }));
    };

    const handleRename = () => {
        if (contextMenu.targetId) {
            setRenamingFolder(contextMenu.targetId);
            setContextMenu(prev => ({ ...prev, visible: false }));
        }
    };

    const createNewTextFile = () => {
        const newFileId = `textfile-${nextFileId}`;
        const defaultName = `New Text File ${nextFileId}.txt`;

        const newTextFileShortcut: DesktopShortcutProps = {
            shortcutName: defaultName,
            icon: 'textFileIcon',
            onOpen: () => openTextFile(newFileId, defaultName)
        };

        setShortcuts(prev => [...prev, newTextFileShortcut]);

        // Set initial position for the new text file
        const totalItems = shortcuts.length + Object.keys(folders).length;
        const column = Math.floor(totalItems / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING));
        const row = totalItems % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING);

        const position = {
            top: INITIAL_OFFSET.top + (row * VERTICAL_SPACING),
            left: INITIAL_OFFSET.left + (column * HORIZONTAL_SPACING)
        };

        setPositions(prev => ({
            ...prev,
            [newFileId]: position
        }));

        setNextFileId(prev => prev + 1);
        setContextMenu({ visible: false, x: 0, y: 0, type: 'desktop' });
    };

    const openTextFile = (fileId: string, fileName: string) => {
        const highestZIndex = getHighestZIndex();

        const textEditorWindow = (
            <TextEditor
                key={fileId}
                fileName={fileName}
                onInteract={() => onWindowInteract(fileId)}
                onMinimize={() => minimizeWindow(fileId)}
                onClose={() => removeWindow(fileId)}
                onRename={(newName) => handleTextFileRename(fileId, newName)}
                isRenaming={renamingFolder === fileId}
            />
        );

        setWindows(prev => ({
            ...prev,
            [fileId]: {
                zIndex: highestZIndex + 1,
                minimized: false,
                component: textEditorWindow,
                name: fileName,
                icon: 'textFileIcon'
            }
        }));
    };

    const handleTextFileRename = (fileId: string, newName: string) => {
        setShortcuts(prevShortcuts => prevShortcuts.map(shortcut => {
            if (shortcut.shortcutName === fileId) {
                return { ...shortcut, shortcutName: newName };
            }
            return shortcut;
        }));
        setWindows(prevWindows => {
            const newWindows = { ...prevWindows };
            if (newWindows[fileId]) {
                newWindows[fileId].name = newName;
            }
            return newWindows;
        });
        setRenamingFolder(null);
    };

    const deleteFolder = (folderId: string) => {
        const folderContents = folders[folderId];
        if (folderContents) {
            folderContents.forEach(item => addItemToFolder("Recycle Bin", item));
        }
        addItemToFolder("Recycle Bin", {
            shortcutName: folderNames[folderId] || `New Folder ${folderId.split('-')[1]}`,
            icon: "folderIcon",
            onOpen: openRecycleBin
        });
        setFolders(prev => {
            const newFolders = { ...prev };
            delete newFolders[folderId];
            return newFolders;
        });
        setFolderNames(prev => {
            const newFolderNames = { ...prev };
            delete newFolderNames[folderId];
            return newFolderNames;
        });
        setWindows(prev => {
            const newWindows = { ...prev };
            delete newWindows[folderId];
            return newWindows;
        });
        sessionStorage.removeItem(folderId);
    };

    const deleteFile = (fileName: string) => {
        const file = shortcuts.find(shortcut => shortcut.shortcutName === fileName);
        if (file) {
            addItemToFolder("Recycle Bin", file);
        }
        setShortcuts(prev => prev.filter(shortcut => shortcut.shortcutName !== fileName));
        setWindows(prev => {
            const newWindows = { ...prev };
            delete newWindows[fileName];
            return newWindows;
        });
        sessionStorage.removeItem(fileName); // Remove from session storage
    };

    const initializeDocumentsFolder = () => {
        const documentsShortcut: DesktopShortcutProps = {
            shortcutName: "Documents",
            icon: "documentsIcon",
            onOpen: openDocuments
        };

        setShortcuts(prevShortcuts => {
            const existingDocumentsShortcut = prevShortcuts.find(shortcut => shortcut.shortcutName === "Documents");
            if (!existingDocumentsShortcut) {
                return [...prevShortcuts, documentsShortcut];
            }
            return prevShortcuts;
        });

        const totalItems = shortcuts.length + Object.keys(folders).length;
        const column = Math.floor(totalItems / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING));
        const row = totalItems % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING);

        const position = {
            top: Math.round((INITIAL_OFFSET.top + (row * VERTICAL_SPACING)) / GRID_SIZE) * GRID_SIZE,
            left: Math.round((INITIAL_OFFSET.left + (column * HORIZONTAL_SPACING)) / GRID_SIZE) * GRID_SIZE
        };

        setPositions(prev => ({
            ...prev,
            "Documents": position
        }));
    };

    const openDocuments = () => {
        const highestZIndex = getHighestZIndex();

        const docWindow = (
            <Documents
                onInteract={() => onWindowInteract("Documents")}
                onMinimize={() => minimizeWindow("Documents")}
                onClose={() => removeWindow("Documents")}
                addWindow={addWindow}
                getHighestZIndex={getHighestZIndex}
            />
        );

        setWindows(prev => ({
            ...prev,
            "Documents": {
                zIndex: highestZIndex + 1,
                minimized: false,
                component: docWindow,
                name: "Documents",
                icon: 'documentsIcon'
            }
        }));
    };

    const openAppByName = (appName: string) => {
        const appKey = Object.keys(APPLICATIONS).find(
            (key) => APPLICATIONS[key].name.toLowerCase() === appName.toLowerCase()
        );
        if (appKey) {
            const app = APPLICATIONS[appKey];
            addWindow(
                app.key,
                <app.component
                    onInteract={() => onWindowInteract(app.key)}
                    onMinimize={() => minimizeWindow(app.key)}
                    onClose={() => removeWindow(app.key)}
                    key={app.key}
                />
            );
            addRecentApp(app.name);
        } else {
            alert(`Application "${appName}" not found.`);
        }
    };

    const initializeRecycleBin = () => {
        const recycleBinShortcut: DesktopShortcutProps = {
            shortcutName: "Recycle Bin",
            icon: "recycleBinIcon",
            onOpen: openRecycleBin
        };

        setShortcuts(prevShortcuts => {
            const existingRecycleBinShortcut = prevShortcuts.find(shortcut => shortcut.shortcutName === "Recycle Bin");
            if (!existingRecycleBinShortcut) {
                return [...prevShortcuts, recycleBinShortcut];
            }
            return prevShortcuts;
        });

        setFolders(prev => ({
            ...prev,
            "Recycle Bin": []
        }));

        const totalItems = shortcuts.length + Object.keys(folders).length;
        const column = Math.floor(totalItems / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING));
        const row = totalItems % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING);

        const position = {
            top: Math.round((INITIAL_OFFSET.top + (row * VERTICAL_SPACING)) / GRID_SIZE) * GRID_SIZE,
            left: Math.round((INITIAL_OFFSET.left + (column * HORIZONTAL_SPACING)) / GRID_SIZE) * GRID_SIZE
        };

        setPositions(prev => ({
            ...prev,
            "Recycle Bin": position
        }));
    };

    const openRecycleBin = () => {
        const highestZIndex = getHighestZIndex();

        const recycleBinWindow = (
            <RecycleBin
                contents={folders["Recycle Bin"] || []}
                onInteract={() => onWindowInteract("Recycle Bin")}
                onMinimize={() => minimizeWindow("Recycle Bin")}
                onClose={() => removeWindow("Recycle Bin")}
                onAddItem={(item) => addItemToFolder("Recycle Bin", item)}
                onRemoveItem={(itemName) => removeItemFromFolder("Recycle Bin", itemName)}
                onRename={(itemName, newName) => handleTextFileRename(itemName, newName)}
                addWindow={addWindow}
                getHighestZIndex={getHighestZIndex}
            />
        );

        setWindows(prev => ({
            ...prev,
            "Recycle Bin": {
                zIndex: highestZIndex + 1,
                minimized: false,
                component: recycleBinWindow,
                name: "Recycle Bin",
                icon: folders["Recycle Bin"] && folders["Recycle Bin"].length > 0 ? 'recycleBinFullIcon' : 'recycleBinIcon'
            }
        }));
    };

    const emptyRecycleBin = () => {
        setFolders(prev => ({
            ...prev,
            "Recycle Bin": []
        }));
    };

    const arrangeIcons = () => {
        const newPositions: { [key: string]: { top: number; left: number } } = {};
        const totalItems = shortcuts.length + Object.keys(folders).length;
        let index = 0;
    
        const isPositionOccupied = (top: number, left: number) => {
            return Object.values(newPositions).some(
                (pos) => pos.top === top && pos.left === left
            );
        };
    
        const getNextAvailablePosition = (startTop: number, startLeft: number) => {
            let top = startTop;
            let left = startLeft;
            while (isPositionOccupied(top, left)) {
                top += VERTICAL_SPACING;
                if (top >= window.innerHeight - VERTICAL_SPACING) {
                    top = INITIAL_OFFSET.top;
                    left += HORIZONTAL_SPACING;
                }
            }
            return { top, left };
        };
    
        shortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName !== "Documents" && shortcut.shortcutName !== "Recycle Bin") {
                const column = Math.floor(index / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING));
                const row = index % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING);
                const initialPosition = {
                    top: INITIAL_OFFSET.top + (row * VERTICAL_SPACING),
                    left: INITIAL_OFFSET.left + (column * HORIZONTAL_SPACING)
                };
                const position = getNextAvailablePosition(initialPosition.top, initialPosition.left);
                newPositions[shortcut.shortcutName] = position;
                index++;
            }
        });
    
        Object.keys(folders).forEach((folderId) => {
            const column = Math.floor(index / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING));
            const row = index % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING);
            const initialPosition = {
                top: INITIAL_OFFSET.top + (row * VERTICAL_SPACING),
                left: INITIAL_OFFSET.left + (column * HORIZONTAL_SPACING)
            };
            const position = getNextAvailablePosition(initialPosition.top, initialPosition.left);
            newPositions[folderId] = position;
            index++;
        });
    
        newPositions["Documents"] = getNextAvailablePosition(
            window.innerHeight - VERTICAL_SPACING - 50,
            INITIAL_OFFSET.left
        );
    
        newPositions["Recycle Bin"] = getNextAvailablePosition(
            window.innerHeight - VERTICAL_SPACING - 50,
            INITIAL_OFFSET.left + HORIZONTAL_SPACING
        );
    
        setPositions(newPositions);
    };

    useEffect(() => {
        arrangeIcons();
    }, [shortcuts, folders]);

    return !shutdown ? (
        <div style={styles.desktop} onDrop={handleDrop} onDragOver={handleDragOver} onContextMenu={handleContextMenu} onClick={handleClick}>
            {/* For each window in windows, loop over and render  */}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return <div key={`win-${key}`}></div>;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        {React.cloneElement(element, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut, i) => {
                    const position = positions[shortcut.shortcutName] || {
                        top: INITIAL_OFFSET.top + (i % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING)) * VERTICAL_SPACING,
                        left: INITIAL_OFFSET.left + Math.floor((i / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING))) * HORIZONTAL_SPACING
                    };
                    
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, position)}
                            key={shortcut.shortcutName}
                            draggable
                            onDragStart={(e) => handleDragStart(e, shortcut.shortcutName)}
                            onContextMenu={(e) => handleFileContextMenu(e, shortcut.shortcutName)}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                                isRenaming={renamingFolder === shortcut.shortcutName}
                                onRename={(newName) => handleTextFileRename(shortcut.shortcutName, newName)}
                            />
                        </div>
                    );
                })}
                {Object.keys(folders).map((folderId) => {
                    if (folderId === "Recycle Bin") return null;
                    const folder = folders[folderId];
                    const folderName = folderNames[folderId] || `New Folder ${folderId.split('-')[1]}`;
                    const position = positions[folderId] || {
                        top: INITIAL_OFFSET.top + ((shortcuts.length + parseInt(folderId.split('-')[1]) - 1) % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING)) * VERTICAL_SPACING,
                        left: INITIAL_OFFSET.left + Math.floor((shortcuts.length + parseInt(folderId.split('-')[1]) - 1) / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING)) * HORIZONTAL_SPACING
                    };
                    
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, position)}
                            key={folderId}
                            draggable
                            onDragStart={(e) => handleDragStart(e, folderId)}
                            onContextMenu={(e) => handleFolderContextMenu(e, folderId)}
                            onDrop={(e) => handleDropOnFolder(e, folderId)}
                            onDragOver={handleDragOver}
                        >
                            <DesktopShortcut
                                icon="folderIcon"
                                shortcutName={folderName}
                                onOpen={() => openFolder(folderId, folderName)}
                                isRenaming={renamingFolder === folderId}
                                onRename={(newName) => {
                                    handleFolderRename(folderId, newName);
                                    setRenamingFolder(null);
                                }}
                            />
                        </div>
                    );
                })}
                <div
                    style={Object.assign({}, styles.shortcutContainer, positions["Recycle Bin"])}
                    key="Recycle Bin"
                    draggable
                    onDragStart={(e) => handleDragStart(e, "Recycle Bin")}
                    onContextMenu={(e) => handleFileContextMenu(e, "Recycle Bin")}
                >
                    <DesktopShortcut
                        icon={folders["Recycle Bin"] && folders["Recycle Bin"].length > 0 ? 'recycleBinFullIcon' : 'recycleBinIcon'}
                        shortcutName="Recycle Bin"
                        onOpen={openRecycleBin}
                        isRenaming={renamingFolder === "Recycle Bin"}
                        onRename={(newName) => handleTextFileRename("Recycle Bin", newName)}
                    />
                </div>
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
                addWindow={addWindow}
                updateBackground={updateBackground}
                removeWindow={removeWindow}
                openAppByName={openAppByName}
                openDocuments={openDocuments}
            />
            {contextMenu.visible && (
                <div style={{ ...styles.contextMenu, top: contextMenu.y, left: contextMenu.x }}>
                    {contextMenu.type === 'desktop' ? (
                        <>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={createNewFolder}>
                                New Folder
                            </div>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={createNewTextFile}>
                                New Text File
                            </div>
                        </>
                    ) : contextMenu.type === 'folder' ? (
                        <>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={handleRename}>
                                Rename
                            </div>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={() => deleteFolder(contextMenu.targetId!)}>
                                Delete
                            </div>
                        </>
                    ) : contextMenu.type === 'file' ? (
                        <>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={handleRename}>
                                Rename
                            </div>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={() => deleteFile(contextMenu.targetId!)}>
                                Delete
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={handleRename}>
                                Rename
                            </div>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={() => deleteFile(contextMenu.targetId!)}>
                                Delete
                            </div>
                            <div className="context-menu-item" style={styles.contextMenuItem} onClick={emptyRecycleBin}>
                                Empty Recycle Bin
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        position: 'relative',
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
    },
    shortcutContainer: {
        position: 'absolute',
        cursor: 'move',
    },
    shortcuts: {
        position: 'absolute',
        top: 16,
        left: 6,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
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

export default Desktop;