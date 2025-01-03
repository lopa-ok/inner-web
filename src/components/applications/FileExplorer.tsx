import React from 'react';
import Window from '../os/Window';
import folderIcon from '../../assets/icons/scrabbleIcon.png';

export interface FileExplorerProps extends WindowAppProps {
    minimizeWindow: () => void;
}

const FileExplorer: React.FC<FileExplorerProps> = (props) => {
    return (
        <Window
            top={50}
            left={50}
            width={800}
            height={600}
            windowBarIcon="windowExplorerIcon"
            windowTitle="File Explorer"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.minimizeWindow}
        >
            <div className="file-explorer" style={styles.fileExplorer}>
                <div className="sidebar" style={styles.sidebar}>
                    <div className="sidebar-item" style={styles.sidebarItem}>Desktop</div>
                    <div className="sidebar-item" style={styles.sidebarItem}>Documents</div>
                    <div className="sidebar-item" style={styles.sidebarItem}>Downloads</div>
                    <div className="sidebar-item" style={styles.sidebarItem}>Pictures</div>
                    <div className="sidebar-item" style={styles.sidebarItem}>Music</div>
                    <div className="sidebar-item" style={styles.sidebarItem}>Videos</div>
                </div>
                <div className="content" style={styles.content}>
                    <div className="content-header" style={styles.contentHeader}>
                        <div className="content-header-item" style={styles.contentHeaderItem}>Name</div>
                        <div className="content-header-item" style={styles.contentHeaderItem}>Date Modified</div>
                        <div className="content-header-item" style={styles.contentHeaderItem}>Type</div>
                        <div className="content-header-item" style={styles.contentHeaderItem}>Size</div>
                    </div>
                    <div className="content-body" style={styles.contentBody}>
                        <div className="content-item" style={styles.contentItem}>
                            <img src={folderIcon} alt="Folder" className="content-item-icon" style={styles.contentItemIcon} />
                            <span className="content-item-name" style={styles.contentItemName}>My Documents</span>
                        </div>
                        <div className="content-item" style={styles.contentItem}>
                            <img src={folderIcon} alt="Folder" className="content-item-icon" style={styles.contentItemIcon} />
                            <span className="content-item-name" style={styles.contentItemName}>My Pictures</span>
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