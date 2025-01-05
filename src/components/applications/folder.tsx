import React from 'react';
import Window from '../os/Window';
import DesktopShortcut from '../os/DesktopShortcut';
import Credits from '../applications/Credits';
import { IconName } from '../../assets/icons';

interface FolderProps {
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
}

const Folder: React.FC<FolderProps> = ({ onClose, onInteract, onMinimize }) => {
  const [showCredits, setShowCredits] = React.useState(false);

  const openCredits = () => {
    setShowCredits(true);
  };

  const closeCredits = () => {
    setShowCredits(false);
  };

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
        {/* <p>This is a folder.</p>
        <p>and its still a wip</p> */}
        <DesktopShortcut
          icon="credits"
          shortcutName="Credits"
          onOpen={openCredits}
        />
        {showCredits && (
          <Credits
            onInteract={onInteract}
            onMinimize={onMinimize}
            onClose={closeCredits}
          />
        )}
      </div>
    </Window>
  );
};

export default Folder;