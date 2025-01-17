import React, { useRef } from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';
import Credits from '../applications/Credits';

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

    const onWindowInteract = (key: string) => {
        // Implement the logic for window interaction
    };

    const minimizeWindow = (key: string) => {
        // Implement the logic for minimizing the window
    };

    const removeWindow = (key: string) => {
        // Implement the logic for removing the window
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
