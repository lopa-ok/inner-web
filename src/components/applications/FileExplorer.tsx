import React from 'react';
import Window from '../os/Window';
import folderIcon from '../../assets/icons/scrabbleIcon.png';

export interface FileExplorerProps extends WindowAppProps {}

const FileExplorer: React.FC<FileExplorerProps> = (props) => {
    return (
        <Window
            top={50}
            left={50}
            width={800}
            height={600}
            windowBarIcon="windowGameIcon"
            windowTitle="File Explorer"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div className="file-explorer">
                <div className="sidebar">
                    <div className="sidebar-item">Desktop</div>
                    <div className="sidebar-item">Documents</div>
                    <div className="sidebar-item">Downloads</div>
                    <div className="sidebar-item">Pictures</div>
                    <div className="sidebar-item">Music</div>
                    <div className="sidebar-item">Videos</div>
                </div>
                <div className="content">
                    <div className="content-header">
                        <div className="content-header-item">Name</div>
                        <div className="content-header-item">Date Modified</div>
                        <div className="content-header-item">Type</div>
                        <div className="content-header-item">Size</div>
                    </div>
                    <div className="content-body">
                        <div className="content-item">
                            <img src={folderIcon} alt="Folder" className="content-item-icon" />
                            <span className="content-item-name">My Documents</span>
                        </div>
                        <div className="content-item">
                            <img src={folderIcon} alt="Folder" className="content-item-icon" />
                            <span className="content-item-name">My Pictures</span>
                        </div>
                        {/* Add more items as needed */}
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    fileExplorer: {
        display: 'flex',
        height: '100%',
    },
    sidebar: {
        width: '200px',
        backgroundColor: '#c0c0c0',
        padding: '10px',
        borderRight: '2px solid #808080',
    },
    sidebarItem: {
        padding: '5px',
        marginBottom: '5px',
        backgroundColor: '#ffffff',
        border: '1px solid #808080',
        cursor: 'pointer',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    contentHeader: {
        display: 'flex',
        padding: '5px',
        backgroundColor: '#c0c0c0',
        borderBottom: '2px solid #808080',
    },
    contentHeaderItem: {
        flex: 1,
        padding: '5px',
        borderRight: '1px solid #808080',
        textAlign: 'left',
    },
    contentBody: {
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
    },
    contentItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        marginBottom: '5px',
        border: '1px solid #808080',
        cursor: 'pointer',
    },
    contentItemIcon: {
        width: '24px',
        height: '24px',
        marginRight: '10px',
    },
    contentItemName: {
        flex: 1,
    },
};

export default FileExplorer;