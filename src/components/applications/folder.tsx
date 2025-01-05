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
      <div style={{ padding: '10px' }}>
        <div style={styles.toolbar}>
          <button style={styles.toolbarButton}>File</button>
          <button style={styles.toolbarButton}>Edit</button>
          <button style={styles.toolbarButton}>View</button>
          <button style={styles.toolbarButton}>Help</button>
        </div>
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
    borderBottom: '1px solid #808080',
    marginBottom: '10px',
  },
  toolbarButton: {
    backgroundColor: '#c0c0c0',
    border: 'none',
    padding: '2px 8px',
    marginRight: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};

export default Folder;