import React, { useState } from 'react';
import Window from '../os/Window';

export interface InternetExplorerProps extends WindowAppProps {}

const InternetExplorer: React.FC<InternetExplorerProps> = (props) => {
    const [url, setUrl] = useState('https://oldgoogle.neocities.org/2009/');

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleGoClick = () => {
        const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
        if (iframe) {
            iframe.src = url;
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleGoClick();
        }
    };

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
                <input
                    type="text"
                    value={url}
                    onChange={handleAddressChange}
                    onKeyPress={handleKeyPress}
                    style={styles.addressInput}
                />
                <button onClick={handleGoClick} style={styles.goButton}>Go</button>
            </div>
            <iframe
                id="browser-iframe"
                src={url}
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
        height: 'calc(100% - 40px)', // Adjust height to account for address bar
        border: 'none',
    },
};

export default InternetExplorer;