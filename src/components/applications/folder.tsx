import React from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';


interface FolderProps {
  folderId: string;
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
  openCreditsApp: () => void; // New prop for opening the Credits app
}

const Folder: React.FC<FolderProps> = ({ folderId, onClose, onInteract, onMinimize, openCreditsApp }) => {
  return (
    <Window
      top={10}
      left={10}
      width={600}
      height={500}
      windowTitle="Documents"
      windowBarIcon="folderIcon"
      windowBarColor="#757579"
      closeWindow={onClose}
      onInteract={onInteract}
      onWidthChange={() => {}}
      onHeightChange={() => {}}
      minimizeWindow={onMinimize}
    >
      <div style={{ padding: '10px', marginTop: '-150px' }}>
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