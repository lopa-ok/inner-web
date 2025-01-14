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
import Settings from '../applications/Settings';
import bg0 from '../../assets/bg/bg0.png';
import TextEditor from '../applications/TextEditor';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const GRID_SIZE = 100;
const VERTICAL_SPACING = 104;
const HORIZONTAL_SPACING = 100;
const INITIAL_OFFSET = { top: 16, left: 6 };

interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    type: 'desktop' | 'folder' | 'file';
    targetId?: string;
}

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
    };

    const APPLICATIONS: {
        [key in string]: {
            key: string;
            name: string;
            shortcutIcon: IconName;
            component: React.FC<ExtendedWindowAppProps<any>>;
        };
    } = {
        // Remove the folder entry from apps since i made it seperate
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
        //     component: Settings,
        // },
        internetExplorer: {
            key: 'internetExplorer',
            name: 'Internet Explorer',
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
            if (key !== 'credits' && key !== 'settings' && key !== 'folder') {
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

        const documentsFolder = `folder-0`;
        if (!folders[documentsFolder]) {
            setFolders(prev => ({
                ...prev,
                [documentsFolder]: [{
                    shortcutName: "Credits",
                    icon: "credits",
                    onOpen: () => {
                        addWindow(
                            'credits',
                            <Credits
                                onInteract={() => onWindowInteract('credits')}
                                onMinimize={() => minimizeWindow('credits')}
                                onClose={() => removeWindow('credits')}
                                key="credits"
                            />
                        );
                    }
                }]
            }));
            setFolderNames(prev => ({
                ...prev,
                [documentsFolder]: "Documents"
            }));
            setNextFolderId(1);
        }

        const documentsShortcut: DesktopShortcutProps = {
            shortcutName: "Documents",
            icon: "folderIcon",
            onOpen: () => openFolder(documentsFolder, "Documents")
        };

        const existingDocumentsShortcut = newShortcuts.find(shortcut => shortcut.shortcutName === "Documents");
        if (!existingDocumentsShortcut) {
            newShortcuts.push(documentsShortcut);
        }

        newShortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName === 'My Showcase') {
                shortcut.onOpen();
            }
        });

        setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setWindows((prevWindows) => ({
                ...prevWindows,
                [key]: {
                    ...prevWindows[key],
                    zIndex: 1 + getHighestZIndex(),
                },
            }));
        },
        [setWindows, getHighestZIndex]
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element, zIndex?: number) => {
            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: zIndex || getHighestZIndex() + 1,
                    minimized: false,
                    component: React.cloneElement(element, { updateBackground }), // Pass updateBackground to Settings
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                },
            }));
        },
        [getHighestZIndex, updateBackground]
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
        const column = Math.floor(totalItems / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING));
        const row = totalItems % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING);

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

    const deleteFolder = (folderId: string) => {
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
        setShortcuts(prev => prev.filter(shortcut => shortcut.shortcutName !== fileName));
        setWindows(prev => {
            const newWindows = { ...prev };
            delete newWindows[fileName];
            return newWindows;
        });
        sessionStorage.removeItem(fileName); // Remove from session storage
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
                    const position = positions[shortcut.shortcutName] || {
                        top: INITIAL_OFFSET.top + (i % Math.floor((window.innerHeight - 100) / VERTICAL_SPACING)) * VERTICAL_SPACING,
                        left: INITIAL_OFFSET.left + Math.floor(i / Math.floor((window.innerHeight - 100) / VERTICAL_SPACING)) * HORIZONTAL_SPACING
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
                            />
                        </div>
                    );
                })}
                {Object.keys(folders).map((folderId) => {
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
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
                addWindow={addWindow}
                updateBackground={updateBackground}
                removeWindow={removeWindow}
            />
            {contextMenu.visible && (
                <div style={{ ...styles.contextMenu, top: contextMenu.y, left: contextMenu.x }}>
                    {contextMenu.type === 'desktop' ? (
                        <>
                            <div style={styles.contextMenuItem} onClick={createNewFolder}>
                                New Folder
                            </div>
                            <div style={styles.contextMenuItem} onClick={createNewTextFile}>
                                New Text File
                            </div>
                        </>
                    ) : contextMenu.type === 'folder' ? (
                        <>
                            <div style={styles.contextMenuItem} onClick={handleRename}>
                                Rename
                            </div>
                            <div style={styles.contextMenuItem} onClick={() => deleteFolder(contextMenu.targetId!)}>
                                Delete
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={styles.contextMenuItem} onClick={() => deleteFile(contextMenu.targetId!)}>
                                Delete
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
    },
    contextMenuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
    },
};

export default Desktop;