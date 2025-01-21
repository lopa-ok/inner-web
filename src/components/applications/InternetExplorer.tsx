import React from 'react';
import Window from '../os/Window';

export interface InternetExplorerProps extends WindowAppProps {}

const InternetExplorer: React.FC<InternetExplorerProps> = (props) => {
    return (
        <Window
            top={50}
            left={50}
            width={800}
            height={600}
            windowBarIcon="InternetExplorerIcon"
            windowTitle="Google Chrome"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <iframe
                src="https://oldgoogle.neocities.org/2009/"
                style={styles.iframe}
                title="Google Chrome"
            ></iframe>
        </Window>
    );
};

const styles = {
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
    },
};

export default InternetExplorer;