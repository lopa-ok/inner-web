import React from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';
import { IconName } from '../../assets/icons';

interface FolderProps {
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
  openCreditsApp: () => void; // New prop for opening the Credits app
}

const Folder: React.FC<FolderProps> = ({ onClose, onInteract, onMinimize, openCreditsApp }) => {
  return (
    <Window
      top={10}
      left={10}
      width={400}
      height={300}
      windowTitle="Folder"
      windowBarIcon="folderIcon"
      windowBarColor="#757579"
      closeWindow={onClose}
      onInteract={onInteract}
      onWidthChange={() => {}}
      onHeightChange={() => {}}
      minimizeWindow={onMinimize}
    >
      <div style={styles.toolbar}>
        <div style={styles.toolbarItem}>File</div>
        <div style={styles.toolbarItem}>Edit</div>
        <div style={styles.toolbarItem}>View</div>
        <div style={styles.toolbarItem}>Help</div>
      </div>
      <div style={{ padding: '10px' }}>
        <DesktopShortcut
          icon="credits"
          shortcutName="Credits"
          onOpen={openCreditsApp}
        />
      </div>
    </Window>
  );
};

const styles = {
  toolbar: {
    display: 'flex',
    backgroundColor: '#c0c0c0',
    padding: '2px 4px',
    borderBottom: '2px solid #808080',
  },
  toolbarItem: {
    marginRight: '10px',
    cursor: 'pointer',
    fontFamily: "'MS Sans Serif', sans-serif",
    fontSize: '12px',
    color: '#000',
  },
  toolbarItemHover: {
    backgroundColor: '#000080',
    color: '#fff',
  },
};

export default Folder;