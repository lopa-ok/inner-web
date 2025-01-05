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
            windowBarIcon="windowExplorerIcon"
            windowTitle="Internet Explorer"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div style={styles.addressBar}>
                <span style={styles.addressLabel}>Address:</span>
                <input type="text" value="https://oldgoogle.neocities.org/1998/" readOnly style={styles.addressInput} />
                <button style={styles.goButton}>Go</button>
            </div>
            <iframe
                src="https://oldgoogle.neocities.org/1998/"
                style={styles.iframe}
                title="Internet Explorer"
            ></iframe>
        </Window>
    );
};

const styles = {
    addressBar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '4px',
        borderBottom: '1px solid #808080',
    },
    addressLabel: {
        marginRight: '8px',
        fontFamily: "'MS Sans Serif', sans-serif",
        fontSize: '12px',
    },
    addressInput: {
        flex: 1,
        padding: '2px',
        fontFamily: "'MS Sans Serif', sans-serif",
        fontSize: '12px',
        border: '1px solid #808080',
    },
    goButton: {
        marginLeft: '8px',
        padding: '2px 8px',
        fontFamily: "'MS Sans Serif', sans-serif",
        fontSize: '12px',
        cursor: 'pointer',
    },
    iframe: {
        width: '100%',
        height: 'calc(100% - 40px)',
        border: 'none',
    },
};

export default InternetExplorer;