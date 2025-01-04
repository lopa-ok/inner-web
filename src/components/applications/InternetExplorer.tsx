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
            <div className="internet-explorer">
                <div className="toolbar">
                    <p>File<span style={{ left: '-23px' }}>_</span></p>
                    <p>Edit<span style={{ left: '-24px' }}>_</span></p>
                    <p>View<span style={{ left: '-32px' }}>_</span></p>
                    <p>Help<span style={{ left: '-30px' }}>_</span></p>
                </div>
                <div className="content">
                    <p>Welcome to Internet Explorer!</p>
                </div>
            </div>
        </Window>
    );
};

export default InternetExplorer;

const styles: StyleSheetCSS = {
    internetExplorer: {
        display: 'flex',
        height: '100%',
    },
    toolbar: {
        display: 'flex',
        height: '30px',
        backgroundColor: 'lightgrey',
        borderBottom: '1px solid grey',
    },
    content: {
        padding: '20px',
    },
};

