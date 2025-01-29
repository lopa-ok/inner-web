import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import Settings from '../applications/Settings'; 
import Run from '../applications/Run';
import textFileIcon from '../../assets/icons/textFileIcon.png';
import Help from '../applications/Help';
import { IconName } from '../../assets/icons';
import RockPaperScissors from '../applications/RockPaperScissors';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    addWindow: (key: string, element: JSX.Element, zIndex?: number) => void;
    updateBackground: (background: string, theme: string) => void;
    removeWindow: (key: string) => void;
    shutdown: () => void;
    openAppByName: (appName: string) => void;
    openDocuments: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    shutdown,
    addWindow,
    updateBackground,
    removeWindow,
    openAppByName,
    openDocuments,
}) => {
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + mins + ' ' + amPm;
        return strTime;
    };

    const [startWindowOpen, setStartWindowOpen] = useState(false);
    const lastClickInside = useRef(false);

    const [lastActive, setLastActive] = useState('');

    useEffect(() => {
        let max = 0;
        let k = '';
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
                k = key;
            }
        });
        setLastActive(k);
    }, [windows]);

    const [time, setTime] = useState(getTime());

    const updateTime = () => {
        setTime(getTime());
        setTimeout(() => {
            updateTime();
        }, 5000);
    };

    useEffect(() => {
        updateTime();
    });

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setStartWindowOpen(true);
        } else {
            setStartWindowOpen(false);
            setSettingsSubMenuOpen(false);
            setDocumentsSubMenuOpen(false);
            setProgramsSubMenuOpen(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onStartWindowClicked = () => {
        setStartWindowOpen(true);
        lastClickInside.current = true;
    };

    const toggleStartWindow = () => {
        if (!startWindowOpen) {
            lastClickInside.current = true;
        } else {
            lastClickInside.current = false;
        }
    };

    const closeStartMenu = () => {
        setStartWindowOpen(false);
        setSettingsSubMenuOpen(false);
        setDocumentsSubMenuOpen(false);
        setProgramsSubMenuOpen(false);
    };

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

    const openAppByNameWithRecent = (appName: string) => {
        if (appName.toLowerCase() === 'easter egg') {
            openAppByName('Easter Egg');
        } else {
            openAppByName(appName);
            if (!Object.keys(windows).some(key => windows[key].name.toLowerCase() === appName.toLowerCase())) {
                addRecentApp(appName);
            }
        }
    };

    const openSettingsApp = () => {
        const highestZIndex = Math.max(...Object.values(windows).map(w => w.zIndex), 0);
        addWindow(
            'settings',
            <Settings
                onInteract={() => toggleMinimize('settings')}
                onMinimize={() => toggleMinimize('settings')}
                onClose={() => removeWindow('settings')}
                updateBackground={updateBackground} 
            />,
            highestZIndex + 1
        );
        addRecentApp('Settings');
        closeStartMenu();
    };

    const openRunApp = () => {
        const highestZIndex = Math.max(...Object.values(windows).map(w => w.zIndex), 0);
        addWindow(
            'run',
            <Run
                onInteract={() => toggleMinimize('run')}
                onMinimize={() => toggleMinimize('run')}
                onClose={() => removeWindow('run')}
                openAppByName={openAppByNameWithRecent}
            />,
            highestZIndex + 1
        );
        closeStartMenu();
    };

    const openHelpApp = () => {
        const highestZIndex = Math.max(...Object.values(windows).map(w => w.zIndex), 0);
        addWindow(
            'help',
            <Help
                onInteract={() => toggleMinimize('help')}
                onMinimize={() => toggleMinimize('help')}
                onClose={() => removeWindow('help')}
            />,
            highestZIndex + 1
        );
        addRecentApp('Help');
        closeStartMenu();
    };

    const openFindApp = () => {
        alert("Find is not available yet.");
        closeStartMenu();
    };

    const openDocumentsApp = () => {
        openDocuments();
        addRecentApp('Documents');
        closeStartMenu();
    };

    const openMSDOSApp = () => {
        openAppByNameWithRecent("MS-DOS");
        closeStartMenu();
    };

    const openCalculatorApp = () => {
        openAppByNameWithRecent("Calculator");
        closeStartMenu();
    };

    const handleShutdown = () => {
        shutdown();
        closeStartMenu();
    };

    const [settingsSubMenuOpen, setSettingsSubMenuOpen] = useState(false);
    const [documentsSubMenuOpen, setDocumentsSubMenuOpen] = useState(false);
    const [programsSubMenuOpen, setProgramsSubMenuOpen] = useState(false);
    const [isSettingsArrowHovered, setIsSettingsArrowHovered] = useState(false);
    const [isDocumentsArrowHovered, setIsDocumentsArrowHovered] = useState(false);
    const [isProgramsArrowHovered, setIsProgramsArrowHovered] = useState(false);

    const handleMouseEnterDocuments = () => {
        setDocumentsSubMenuOpen(true);
        setIsDocumentsArrowHovered(true);
    };

    const handleMouseLeaveDocuments = () => {
        setDocumentsSubMenuOpen(false);
        setIsDocumentsArrowHovered(false);
    };

    const handleMouseEnterSettings = () => {
        setSettingsSubMenuOpen(true);
        setIsSettingsArrowHovered(true);
    };

    const handleMouseLeaveSettings = () => {
        setSettingsSubMenuOpen(false);
        setIsSettingsArrowHovered(false);
    };

    const handleMouseEnterPrograms = () => {
        setProgramsSubMenuOpen(true);
        setIsProgramsArrowHovered(true);
    };

    const handleMouseLeavePrograms = () => {
        setProgramsSubMenuOpen(false);
        setIsProgramsArrowHovered(false);
    };

    const toggleSettingsSubMenu = () => {
        setSettingsSubMenuOpen(!settingsSubMenuOpen);
    };

    const toggleDocumentsSubMenu = () => {
        setDocumentsSubMenuOpen(!documentsSubMenuOpen);
    };

    const openGamesFolder = () => {
        openAppByNameWithRecent("Games Folder");
        closeStartMenu();
    };

    const openShowcaseApp = () => {
        openAppByNameWithRecent("Showcase");
        closeStartMenu();
    };

    const openWordleApp = () => {
        openAppByNameWithRecent("Wordle");
        closeStartMenu();
    };

    const openSudokuApp = () => {
        openAppByNameWithRecent("Sudoku");
        closeStartMenu();
    };

    const openHangmanApp = () => {
        openAppByNameWithRecent("Hangman");
        closeStartMenu();
    };

    const openTicTacToeApp = () => {
        openAppByNameWithRecent("Tic Tac Toe");
        closeStartMenu();
    };

    const open2048App = () => {
        openAppByNameWithRecent("2048");
        closeStartMenu();
    };

    const openWhackAMoleApp = () => {
        openAppByNameWithRecent("Whack-A-Mole");
        closeStartMenu();
    };

    const openTetrisApp = () => {
        openAppByNameWithRecent("Tetris");
        closeStartMenu();
    };

    const openPaintApp = () => {
        openAppByNameWithRecent("Paint");
        closeStartMenu();
    };

    const openSnakeApp = () => {
        openAppByNameWithRecent("Snake");
        closeStartMenu();
    };

    const openMemoryGameApp = () => {
        openAppByNameWithRecent("Memory Game");
        closeStartMenu();
    };

    const openGoogleChrome = () => {
        openAppByNameWithRecent("Google Chrome");
        closeStartMenu();
    };

    const openDoomApp = () => {
        openAppByNameWithRecent("Doom");
        closeStartMenu();
    };

    const openTrailApp = () => {
        openAppByNameWithRecent("The Oregon Trail");
        closeStartMenu();
    };

    const openScrabbleApp = () => {
        openAppByNameWithRecent("Scrabble");
        closeStartMenu();
    };

    const openRockPaperScissorsApp = () => {
        const highestZIndex = Math.max(...Object.values(windows).map(w => w.zIndex), 0);
        addWindow(
            'rockPaperScissors',
            <RockPaperScissors
                onInteract={() => toggleMinimize('rockPaperScissors')}
                onMinimize={() => toggleMinimize('rockPaperScissors')}
                onClose={() => removeWindow('rockPaperScissors')}
            />,
            highestZIndex + 1
        );
        closeStartMenu();
    };

    const [gamesSubMenuOpen, setGamesSubMenuOpen] = useState(false);
    const [isGamesArrowHovered, setIsGamesArrowHovered] = useState(false);

    const handleMouseEnterGames = () => {
        setGamesSubMenuOpen(true);
        setIsGamesArrowHovered(true);
    };

    const handleMouseLeaveGames = () => {
        setGamesSubMenuOpen(false);
        setIsGamesArrowHovered(false);
    };

    const handleGamesFolderClick = (e: React.MouseEvent) => {
        if (!gamesSubMenuOpen) {
            openGamesFolder();
        }
        e.stopPropagation();
    };

    const appIconMapping: { [key: string]: IconName } = {
        "settings": "setting",
        "run": "runIcon",
        "help": "helpIcon",
        "documents": "documentsIcon",
        "ms-dos": "dosIcon",
        "calculator": "calculatorIcon",
        "google chrome": "InternetExplorerIcon",
        "wordle": "wordleIcon",
        "sudoku": "sudokuIcon",
        "hangman": "hangmanIcon",
        "tic tac toe": "tictactoeIcon",
        "2048": "twentyIcon",
        "whack-a-mole": "whackIcon",
        "tetris": "tetrisIcon",
        "paint": "paintIcon",
        "snake": "snakeIcon",
        "memory game": "memoryIcon",
        "doom": "doomIcon",
        "the oregon trail": "trailIcon",
        "scrabble": "scrabbleIcon"
    };

    const [recentFolders, setRecentFolders] = useState<string[]>([]);

    const addRecentFolder = (folderName: string) => {
        setRecentFolders((prev) => {
            const updatedRecentFolders = [folderName, ...prev.filter((folder) => folder !== folderName)];
            return updatedRecentFolders.slice(0, 3);
        });
    };

    return (
        <div style={styles.toolbarOuter}>
            {startWindowOpen && (
                <div
                    onMouseDown={onStartWindowClicked}
                    style={styles.startWindow}
                >
                    <div style={styles.startWindowInner}>
                        <div style={styles.verticalStartContainer}>
                            <p style={styles.verticalText}>LopaOS</p>
                        </div>
                        <div style={styles.startWindowContent}>
                            {recentApps.length > 0 && (
                                <>
                                    <div style={styles.startMenuSpace} />
                                    <div style={styles.startMenuSectionTitle}>Recent</div>
                                    {recentApps.map((app) => (
                                        <div
                                            key={app}
                                            className="start-menu-option"
                                            style={styles.startMenuOption}
                                            onMouseDown={() => openAppByNameWithRecent(app)}
                                        >
                                            <Icon
                                                style={styles.startMenuIcon}
                                                icon={appIconMapping[app.toLowerCase()]}
                                            />
                                            <p style={styles.startMenuText}>{app}</p>
                                        </div>
                                    ))}
                                    <div style={styles.startMenuLine} />
                                </>
                            )}
                            <div style={styles.startMenuSpace} />
                            <div
                                className="start-menu-option"
                                style={Object.assign(
                                    {},
                                    styles.startMenuOption,
                                    (programsSubMenuOpen || isProgramsArrowHovered) && styles.hoveredOption
                                )}
                                onMouseEnter={handleMouseEnterPrograms}
                                onMouseLeave={handleMouseLeavePrograms}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="programIcon"
                                />
                                <p style={Object.assign(
                                    {},
                                    styles.startMenuText,
                                    (programsSubMenuOpen || isProgramsArrowHovered) && styles.hoveredText
                                )}>
                                    <u>P</u>rograms
                                </p>
                                <Icon
                                    style={styles.subMenuArrow}
                                    icon={isProgramsArrowHovered || programsSubMenuOpen ? "arrowRightInvertedIcon" : "arrowRightIcon"}
                                />
                                {programsSubMenuOpen && (
                                    <div style={Object.assign({}, styles.subMenu, { top: 'auto', left: '100%' })}>
                                        <div
                                            className="start-menu-option"
                                            style={Object.assign(
                                                {},
                                                styles.subMenuOption,
                                                (gamesSubMenuOpen || isGamesArrowHovered) && styles.hoveredOption
                                            )}
                                            onMouseEnter={handleMouseEnterGames}
                                            onMouseLeave={handleMouseLeaveGames}
                                            onMouseDown={handleGamesFolderClick}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="folderIcon"
                                            />
                                            <p style={Object.assign(
                                                {},
                                                styles.startMenuText,
                                                (gamesSubMenuOpen || isGamesArrowHovered) && styles.hoveredText
                                            )}>
                                                Games
                                            </p>
                                            <Icon
                                                style={styles.subMenuArrow}
                                                icon={isGamesArrowHovered || gamesSubMenuOpen ? "arrowRightInvertedIcon" : "arrowRightIcon"}
                                            />
                                            {gamesSubMenuOpen && (
                                                <div style={Object.assign({}, styles.subMenu, { top: 'auto', left: '100%' })}>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openWordleApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="wordleIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Wordle
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openSudokuApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="sudokuIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Sudoku
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openHangmanApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="hangmanIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Hangman
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openTicTacToeApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="tictactoeIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Tic Tac Toe
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={open2048App}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="twentyIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            2048
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openWhackAMoleApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="whackIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Whack-A-Mole
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openTetrisApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="tetrisIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Tetris
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openPaintApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="paintIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Paint
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openSnakeApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="snakeIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Snake
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openMemoryGameApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="memoryIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Memory Game
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="start-menu-option"
                                                        style={styles.subMenuOption}
                                                        onMouseDown={openRockPaperScissorsApp}
                                                    >
                                                        <Icon
                                                            style={styles.subMenuIcon}
                                                            icon="rockPaperScissorsIcon"
                                                        />
                                                        <p style={styles.startMenuText}>
                                                            Rock Paper Scissors
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openGoogleChrome}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="InternetExplorerIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                Google Chrome
                                            </p>
                                        </div>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openMSDOSApp}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="dosIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                MS-DOS
                                            </p>
                                        </div>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openCalculatorApp}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="calculatorIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                Calculator
                                            </p>
                                        </div>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openDoomApp}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="doomIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                Doom
                                            </p>
                                        </div>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openTrailApp}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="trailIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                The Oregon Trail
                                            </p>
                                        </div>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openScrabbleApp}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="scrabbleIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                Scrabble
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                className="start-menu-option"
                                style={Object.assign(
                                    {},
                                    styles.startMenuOption,
                                    (documentsSubMenuOpen || isDocumentsArrowHovered) && styles.hoveredOption
                                )}
                                onMouseEnter={handleMouseEnterDocuments}
                                onMouseLeave={handleMouseLeaveDocuments}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="documentsIcon"
                                />
                                <p style={Object.assign(
                                    {},
                                    styles.startMenuText,
                                    (documentsSubMenuOpen || isDocumentsArrowHovered) && styles.hoveredText
                                )}>
                                    <u>D</u>ocuments
                                </p>
                                <Icon
                                    style={styles.subMenuArrow}
                                    icon={isDocumentsArrowHovered || documentsSubMenuOpen ? "arrowRightInvertedIcon" : "arrowRightIcon"}
                                />
                                {documentsSubMenuOpen && (
                                    <div style={Object.assign({}, styles.subMenu, { top: 'auto', left: '100%' })}>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openDocumentsApp}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="documentsIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                Open Documents
                                            </p>
                                        </div>
                                        {recentFolders.map((folder) => (
                                            <div
                                                key={folder}
                                                className="start-menu-option"
                                                style={styles.subMenuOption}
                                                onMouseDown={() => openAppByNameWithRecent(folder)}
                                            >
                                                <Icon
                                                    style={styles.subMenuIcon}
                                                    icon="folderIcon"
                                                />
                                                <p style={styles.startMenuText}>
                                                    {folder}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div
                                className="start-menu-option"
                                style={Object.assign(
                                    {},
                                    styles.startMenuOption,
                                    (settingsSubMenuOpen || isSettingsArrowHovered) && styles.hoveredOption
                                )}
                                onMouseEnter={handleMouseEnterSettings}
                                onMouseLeave={handleMouseLeaveSettings}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="setting"
                                />
                                <p style={Object.assign(
                                    {},
                                    styles.startMenuText,
                                    (settingsSubMenuOpen || isSettingsArrowHovered) && styles.hoveredText
                                )}>
                                    Se<u>t</u>tings
                                </p>
                                <Icon
                                    style={styles.subMenuArrow}
                                    icon={isSettingsArrowHovered || settingsSubMenuOpen ? "arrowRightInvertedIcon" : "arrowRightIcon"}
                                />
                                {settingsSubMenuOpen && (
                                    <div style={Object.assign({}, styles.subMenu, { top: 'auto', left: '100%' })}>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={openSettingsApp}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="genSettingsIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                General Settings
                                            </p>
                                        </div>
                                        <div
                                            className="start-menu-option"
                                            style={styles.subMenuOption}
                                            onMouseDown={() => alert("Network Settings are not available yet.")}
                                        >
                                            <Icon
                                                style={styles.subMenuIcon}
                                                icon="lanIcon"
                                            />
                                            <p style={styles.startMenuText}>
                                                Network Settings
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={openFindApp}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="findIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>F</u>ind...
                                </p>
                            </div>
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={openHelpApp}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="helpIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>H</u>elp
                                </p>
                            </div>
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={openRunApp}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="runIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>R</u>un...
                                </p>
                            </div>
                            <div style={styles.startMenuLine} />
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={handleShutdown}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="computerBig"
                                />
                                <p style={styles.startMenuText}>
                                    Sh<u>u</u>t down...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div style={styles.toolbarInner}>
                <div style={styles.toolbar}>
                    <div
                        style={Object.assign(
                            {},
                            styles.startContainerOuter,
                            startWindowOpen && styles.activeTabOuter
                        )}
                        onMouseDown={toggleStartWindow}
                    >
                        <div
                            style={Object.assign(
                                {},
                                styles.startContainer,
                                startWindowOpen && styles.activeTabInner
                            )}
                        >
                            <Icon
                                size={18}
                                icon="windowsStartIcon"
                                style={styles.startIcon}
                            />
                            <p className="toolbar-text ">Start</p>
                        </div>
                    </div>
                    <div style={styles.toolbarTabsContainer}>
                        {Object.keys(windows).map((key) => {
                            return (
                                <div
                                    key={key}
                                    style={Object.assign(
                                        {},
                                        styles.tabContainerOuter,
                                        lastActive === key &&
                                            !windows[key].minimized &&
                                            styles.activeTabOuter
                                    )}
                                    onMouseDown={() => toggleMinimize(key)}
                                >
                                    <div
                                        style={Object.assign(
                                            {},
                                            styles.tabContainer,
                                            lastActive === key &&
                                                !windows[key].minimized &&
                                                styles.activeTabInner
                                        )}
                                    >
                                        <Icon
                                            size={18}
                                            icon={windows[key].icon}
                                            style={styles.tabIcon}
                                        />
                                        <p style={styles.tabText}>
                                            {windows[key].name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={styles.time}>
                    <Icon style={styles.volumeIcon} icon="volumeOn" />
                    <p style={styles.timeText}>{time}</p>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    toolbarOuter: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 32,
        background: Colors.lightGray,
        borderTop: `1px solid ${Colors.lightGray}`,
        zIndex: 100000,
    },
    verticalStartContainer: {
        // width: 30,
        height: '100%',
        background: Colors.darkGray,
    },
    verticalText: {
        fontFamily: 'Terminal',
        textOrientation: 'sideways',
        fontSize: 32,
        padding: 4,
        paddingBottom: 64,
        paddingTop: 8,
        letterSpacing: 1,
        color: Colors.lightGray,
        transform: 'scale(-1)',
        WebkitTransform: 'scale(-1)',
        MozTransform: 'scale(-1)',
        msTransform: 'scale(-1)',
        OTransform: 'scale(-1)',
        // @ts-ignore
        writingMode: 'tb-rl',
    },
    startWindowContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    startWindow: {
        position: 'absolute',
        bottom: 28,
        display: 'flex',
        flex: 1,
        width: 256,
        // height: 400,
        left: 4,
        boxSizing: 'border-box',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
        background: Colors.lightGray,
    },
    activeTabOuter: {
        border: `1px solid ${Colors.black}`,
        borderBottomColor: Colors.white,
        borderRightColor: Colors.white,
    },
    startWindowInner: {
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        flex: 1,
    },
    startMenuIcon: {
        width: 32,
        height: 32,
    },
    startMenuText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        marginLeft: 8,
        color: Colors.black,
    },
    startMenuOption: {
        alignItems: 'center',
        // flex: 1,
        height: 24,
        padding: 12,
    },
    startMenuSpace: {
        flex: 1,
    },
    startMenuLine: {
        height: 1,
        background: Colors.white,
        borderTop: `1px solid ${Colors.darkGray}`,
    },
    activeTabInner: {
        border: `1px solid ${Colors.darkGray}`,
        borderBottomColor: Colors.lightGray,
        borderRightColor: Colors.lightGray,
        backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%),
        linear-gradient(-45deg,  white 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%,  white 75%),
        linear-gradient(-45deg, transparent 75%,  white 75%)`,
        backgroundSize: `4px 4px`,
        backgroundPosition: `0 0, 0 2px, 2px -2px, -2px 0px`,
        pointerEvents: 'none',
    },
    tabContainerOuter: {
        display: 'flex',
        flex: 1,
        maxWidth: 300,
        marginRight: 4,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    tabContainer: {
        display: 'flex',
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        alignItems: 'center',
        paddingLeft: 4,
        flex: 1,
    },
    tabIcon: {
        marginRight: 6,
    },
    startContainer: {
        alignItems: 'center',
        flexShrink: 1,
        // background: 'red',
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    startContainerOuter: {
        marginLeft: 3,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    toolbarTabsContainer: {
        // background: 'blue',
        flex: 1,
        marginLeft: 4,
        marginRight: 4,
    },
    startIcon: {
        marginRight: 4,
    },
    toolbarInner: {
        borderTop: `1px solid ${Colors.white}`,

        alignItems: 'center',
        flex: 1,
    },
    toolbar: {
        flexGrow: 1,
        width: '100%',
    },
    time: {
        flexShrink: 1,
        width: 86,
        height: 24,
        boxSizing: 'border-box',
        marginRight: 4,
        paddingLeft: 4,
        paddingRight: 4,
        border: `1px solid ${Colors.white}`,
        borderTopColor: Colors.darkGray,

        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftColor: Colors.darkGray,
    },
    volumeIcon: {
        cursor: 'pointer',
        height: 18,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'MSSerif',
    },
    subMenu: {
        position: 'absolute',
        left: '100%',
        top: 'auto',
        backgroundColor: Colors.lightGray,
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        width: 200,
    },
    subMenuOption: {
        padding: 8,
        cursor: 'pointer',
        color: Colors.black,
    },
    subMenuArrow: {
        marginLeft: 'auto',
        width: 16,
        height: 16,
    },
    hoveredOption: {
        backgroundColor: Colors.blue,
        color: Colors.white,
    },
    hoveredText: {
        color: Colors.white,
    },
    subMenuIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    startMenuSectionTitle: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: Colors.darkGray,
        paddingLeft: 12,
        paddingBottom: 4,
    },
};

export default Toolbar;
