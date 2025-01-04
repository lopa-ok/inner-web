import React from 'react';
import Window from '../os/Window';

interface FolderProps {
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
}

const Folder: React.FC<FolderProps> = ({ onClose, onInteract, onMinimize }) => {
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
        <p>This is a folder.</p>
      </div>
    </Window>
  );
};

export default Folder;