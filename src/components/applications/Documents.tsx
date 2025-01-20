import React, { useRef } from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';
import Credits from '../applications/Credits';
import GamesFolder from '../applications/GamesFolder';
import Wordle from '../applications/wordle';
import GamesText from '../applications/GamesText';

interface DocumentsProps {
    onClose: () => void;
    onInteract: () => void;
    onMinimize: () => void;
    addWindow: (key: string, element: JSX.Element, zIndex?: number) => void;
    getHighestZIndex: () => number;
}

const Documents: React.FC<DocumentsProps> = ({
    onClose,
    onInteract,
    onMinimize,
    addWindow,
    getHighestZIndex,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

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

    return (
        <Window
            top={10}
            left={10}
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
