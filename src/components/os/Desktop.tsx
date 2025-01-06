import React, { useCallback, useEffect, useState } from 'react';
import Colors from '../../constants/colors';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import Doom from '../applications/Doom';
import OregonTrail from '../applications/OregonTrail';
import ShutdownSequence from './ShutdownSequence';
import ThisComputer from '../applications/ThisComputer';
import wordle from '../applications/wordle';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import Scrabble from '../applications/Scrabble';
import Chess from '../applications/Chess'; 
import Credits from '../applications/Credits';
import InternetExplorer from '../applications/InternetExplorer';
import Folder from '../applications/folder';
import { IconName } from '../../assets/icons';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const GRID_SIZE = 100;

const Desktop: React.FC<DesktopProps> = (props) => {
    const [windows, setWindows] = useState<DesktopWindows>({});
    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);
    const [positions, setPositions] = useState<{ [key: string]: { top: number; left: number } }>({});
    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);
    const [folders, setFolders] = useState<DesktopShortcutProps[]>([]);
    const [folderContents, setFolderContents] = useState<{ [key: string]: DesktopShortcutProps[] }>({});
    const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });

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
            />,
            highestZIndex + 1
        );
    };

    const APPLICATIONS: {
        [key in string]: {
            key: string;
            name: string;
            shortcutIcon: IconName;
            component: React.FC<ExtendedWindowAppProps<any>>;
        };
    } = {
        // computer: {
        //     key: 'computer',
        //     name: 'This Computer',
        //     shortcutIcon: 'computerBig',
        //     component: ThisComputer,
        // },
        showcase: {
            key: 'showcase',
            name: 'My Showcase',
            shortcutIcon: 'showcaseIcon',
            component: ShowcaseExplorer,
        },
        wordle: {
            key: 'wordle',
            name: 'wordle',
            shortcutIcon: 'wordleIcon',
            component: wordle,
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
        //     component: Chess,
        // },
        internetExplorer: {
            key: 'internetExplorer',
            name: 'Internet Explorer',
            shortcutIcon: 'InternetExplorerIcon',
            component: InternetExplorer,
        },
        folder: {
            key: 'folder',
            name: 'Documents',
            shortcutIcon: 'folderIcon',
            component: (props) => <Folder {...props} openCreditsApp={openCreditsApp} />,
        },
        credits: {
            key: 'credits',
            name: 'Credits',
            shortcutIcon: 'credits',
            component: Credits,
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
            if (key !== 'credits') {
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

        newShortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName === 'My Showcase') {
                shortcut.onOpen();
            }
        });

        setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                Object.keys(newWindows).forEach((k) => {
                    if (k !== key) {
                        newWindows[k].zIndex -= 1;
                    }
                });
                newWindows[key].zIndex = getHighestZIndex() + 1;
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
            setWindows((prevState) => {
                const newWindows = { ...prevState };
                Object.keys(newWindows).forEach((k) => {
                    newWindows[k].zIndex -= 1;
                });
                newWindows[key] = {
                    zIndex: zIndex || getHighestZIndex() + 1,
                    minimized: false,
                    component: element,
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                };
                return newWindows;
            });
        },
        [getHighestZIndex]
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

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const createNewFolder = () => {
        const newFolderKey = `folder-${Date.now()}`;
        const newFolder: DesktopShortcutProps = {
            shortcutName: `Folder ${folders.length + 1}`,
            icon: 'folderIcon',
            onOpen: () => {
                addWindow(
                    newFolderKey,
                    <Folder
                        folderId={newFolderKey}
                        onInteract={() => onWindowInteract(newFolderKey)}
                        onMinimize={() => minimizeWindow(newFolderKey)}
                        onClose={() => removeWindow(newFolderKey)}
                        openCreditsApp={openCreditsApp}
                        key={newFolderKey}
                    />
                );
            },
        };
        setFolders([...folders, newFolder]);
        setFolderContents((prevContents) => ({
            ...prevContents,
            [newFolderKey]: [], // Initialize the folder contents
        }));
        setPositions((prevPositions) => ({
            ...prevPositions,
            [newFolder.shortcutName]: { top: (shortcuts.length + folders.length) * 104, left: 6 },
        }));
        setContextMenu({ visible: false, x: 0, y: 0 });
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
        if (contextMenu.visible) {
            setContextMenu({ visible: false, x: 0, y: 0 });
        }
    };

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
                    const position = positions[shortcut.shortcutName] || { top: i * 104, left: 6 };
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, position)}
                            key={shortcut.shortcutName}
                            draggable
                            onDragStart={(e) => handleDragStart(e, shortcut.shortcutName)}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                            />
                        </div>
                    );
                })}
                {folders.map((folder, i) => {
                    const position = positions[folder.shortcutName] || { top: (shortcuts.length + i) * 104, left: 6 };
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, position)}
                            key={folder.shortcutName}
                            draggable
                            onDragStart={(e) => handleDragStart(e, folder.shortcutName)}
                        >
                            <DesktopShortcut
                                icon={folder.icon}
                                shortcutName={folder.shortcutName}
                                onOpen={folder.onOpen}
                            />
                        </div>
                    );
                })}
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
            />
            {contextMenu.visible && (
                <div style={{ ...styles.contextMenu, top: contextMenu.y, left: contextMenu.x }}>
                    <div style={styles.contextMenuItem} onClick={createNewFolder}>
                        New Folder
                    </div>
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
        backgroundColor: Colors.turquoise,
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
    },
    contextMenuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
    },
};

export default Desktop;