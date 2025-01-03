import React from 'react';
import DesktopShortcut from '../os/DesktopShortcut';
import Window from '../os/Window';
import FileExplorer from './FileExplorer';

export interface ThisComputerProps extends WindowAppProps {}

const ThisComputerApp: React.FC<ThisComputerProps> = (props) => {
    const [showFileExplorer, setShowFileExplorer] = React.useState(false);

    return (
        <Window
            top={20}
            left={20}
            width={600}
            height={400}
            windowBarIcon="computerSmall"
            windowTitle="This Computer"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div className="site-page">
                <div style={{ marginTop: 20 }}>
                    <DesktopShortcut
                        icon="computerBig"
                        invertText
                        shortcutName={'Computer Details'}
                        onOpen={() => setShowFileExplorer(true)}
                    />
                </div>
                {showFileExplorer && (
                    <FileExplorer
                        onClose={() => setShowFileExplorer(false)}
                        onMinimize={props.onMinimize}
                        onInteract={props.onInteract}
                        minimizeWindow={props.onMinimize}
                    />
                )}
            </div>
        </Window>
    );
};

export default ThisComputerApp;