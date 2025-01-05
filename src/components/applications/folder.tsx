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
      width={500}
      height={400}
      windowTitle="Folder"
      windowBarIcon="folderIcon"
      windowBarColor="#757579"
      closeWindow={onClose}
      onInteract={onInteract}
      onWidthChange={() => {}}
      onHeightChange={() => {}}
      minimizeWindow={onMinimize}
    >
      <div style={{ padding: '10px', marginTop: '20px' }}> 
        <div style={{ marginTop: '20px' }}>
          <DesktopShortcut
            icon="credits"
            shortcutName="Credits"
            onOpen={openCreditsApp}
          />
        </div>
      </div>
    </Window>
  );
};

export default Folder;