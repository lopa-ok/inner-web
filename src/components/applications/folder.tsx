import React, { useRef } from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';
import { IconName } from '../../assets/icons';

interface FolderProps {
  folderId: string;
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
  openCreditsApp: () => void; // New prop for opening the Credits app
}

const Folder: React.FC<FolderProps> = ({ folderId, onClose, onInteract, onMinimize, openCreditsApp }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Window
      top={10}
      left={10}
      width={600}
      height={500}
      windowTitle={`Folder ${folderId}`}
      windowBarIcon="folderIcon"
      windowBarColor="#757579"
      closeWindow={onClose}
      onInteract={onInteract}
      onWidthChange={() => {}}
      onHeightChange={() => {}}
      minimizeWindow={onMinimize}
    >
      <div ref={contentRef} style={{ padding: '10px', marginTop: '40px' }}> 
        <div style={{ marginBottom: '20px' }}></div>
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