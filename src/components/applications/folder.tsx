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

const GRID_SIZE = 100;

const Folder: React.FC<FolderProps> = ({ folderId, onClose, onInteract, onMinimize, openCreditsApp }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const snapToGrid = (position: { top: number; left: number }) => {
    return {
      top: Math.round(position.top / GRID_SIZE) * GRID_SIZE,
      left: Math.round(position.left / GRID_SIZE) * GRID_SIZE,
    };
  };

  const iconPosition = snapToGrid({ top: 20, left: 20 });

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
      <div ref={contentRef} style={{ padding: '10px', paddingTop: '60px', position: 'relative' }}>
        <div style={{ ...iconPosition, position: 'absolute' }}>
          <DesktopShortcut
            icon="credits"
            shortcutName="Credits"
            onOpen={openCreditsApp}
            textColor="black"
          />
        </div>
      </div>
    </Window>
  );
};

export default Folder;