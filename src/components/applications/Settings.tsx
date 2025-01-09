import React, { useState, useEffect } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import Window from '../os/Window';
import settingIcon from '../../assets/icons/setting.png';
import bgPic from '../../assets/bg/bgpc.png';
import bg0 from '../../assets/bg/bg0.png';
import bg1 from '../../assets/bg/bg1.png';
import bg2 from '../../assets/bg/bg2.jpg';
import bg3 from '../../assets/bg/bg3.jpg';
import bg5 from '../../assets/bg/bg5.png';
import bg6 from '../../assets/bg/bg6.jpg';
import bg7 from '../../assets/bg/bg7.png';
import bg8 from '../../assets/bg/bg8.png';
import bg9 from '../../assets/bg/bg9.jpg';

interface SettingsProps {
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
  updateBackground: (background: string, theme: string) => void; // Add updateBackground prop
}

const Settings: React.FC<SettingsProps> = ({ onClose, onInteract, onMinimize, updateBackground }) => {
  const [barcolor, setBarcolor] = useState<string | null>(null);
  const [ImgBgPreview, setImgBgPreview] = useState<string | null>(null);
  const [localBg, setLocalBg] = useState(() => {
    const prevBg = localStorage.getItem('background');
    return prevBg ? prevBg : null;
  });
  const [themeColor, setThemeColor] = useState<string | null>(null);
  const [localTheme, setLocalTheme] = useState(() => {
    const prevTheme = localStorage.getItem('theme');
    return prevTheme ? prevTheme : null;
  });
  const [selectedBg2, setSelectedBg2] = useState<number | null>(null);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);

  const colorOptions = [
    { value: 1, label: '(None)', color: '#098684', image: bg0, barColor: '#14045c' },
    { value: 2, label: 'Purple Summer', color: '#3F4565', image: bg1, barColor: '#3F4565' },
    { value: 3, label: 'Matt Blue', color: '#456EA6', image: bg2, barColor: '#456EA6' },
    { value: 4, label: 'Matt Green', color: '#008081', image: bg3, barColor: '#008081' },
    { value: 6, label: 'Blue Sky', color: '#4B6894', image: bg5, barColor: '#4B6894' },
    { value: 7, label: 'Dark Tone', color: '#313439', image: bg6, barColor: '#313439' },
    { value: 8, label: 'Light Pink', color: '#f3aac0', image: bg7, barColor: '#1c1719' },
    { value: 9, label: 'Deep Ocean', color: '#3F4565', image: bg8, barColor: '#3F4565' },
    { value: 10, label: 'Purple Blue', color: '#354092', image: bg9, barColor: '#354092' },
  ];

  function setbgColorFunction2(index: number): void {
    const selectedOption = colorOptions.find(option => option.value === index);
    if (selectedOption) {
      setSelectedBg2(index);
      setImgBgPreview(selectedOption.image);
      setThemeColor(selectedOption.color);
      setBarcolor(selectedOption.barColor);
    }
  }

  useEffect(() => {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (localBg) {
      bodyBG.style.backgroundColor = localTheme || '';
      bodyBG.style.backgroundImage = `url(${localBg})`;
    }
  }, [localBg, localTheme]);

  function applyBG() {
    if (ImgBgPreview) {
      updateBackground(ImgBgPreview, themeColor || '');
      setLocalBg(ImgBgPreview);
      setLocalTheme(themeColor);
    }
  }

  function cancelBg() {
    if (localBg) {
      updateBackground(localBg, localTheme || '');
    }
  }

  function okBg() {
    if (ImgBgPreview) {
      updateBackground(ImgBgPreview, themeColor || '');
      localStorage.setItem('theme', themeColor || '');
      localStorage.setItem('background', ImgBgPreview);
      localStorage.setItem('barcolor', barcolor || '');
      setLocalBg(ImgBgPreview);
      setLocalTheme(themeColor);
    }
  }

  const handleApplyClick = () => {
    if (ImgBgPreview && themeColor) {
      updateBackground(ImgBgPreview, themeColor);
    }
  };

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function deleteTap(appName: string) {
    // Implement the logic to delete the tap
    console.log(`Deleting tap for ${appName}`);
  }

  return (
    <Window
      top={10}
      left={10}
      width={width}
      height={height}
      windowTitle="Settings"
      windowBarIcon="setting"
      windowBarColor={barcolor || '#757579'}
      closeWindow={onClose}
      onInteract={onInteract}
      onWidthChange={setWidth}
      onHeightChange={setHeight}
      minimizeWindow={onMinimize}
    >
      <motion.div
        className='bgsetting_folder'
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={styles.bgSettingFolder as MotionStyle}
      >
        <div className="folder_dragbar_bgsetting" style={{ ...styles.folderDragbarBgSetting, background: barcolor || '#757579' }}>
          <div className="bgsetting_barname" style={styles.bgSettingBarName}>
            <img src={settingIcon} alt="" style={styles.settingIcon} />
            <span>Settings</span>
          </div>
          <div className="bgsetting_barbtn" style={styles.bgSettingBarBtn}>
            <div onClick={!isTouchDevice ? (e) => {
              e.stopPropagation();
            } : undefined}
              onTouchEnd={(e) => {
                e.stopPropagation();
              }}
            >
              <p className='dash' style={styles.dash}></p>
            </div>
            <div>
              <p className='x'
                onClick={!isTouchDevice ? () => {
                  cancelBg();
                  deleteTap('Settings');
                  onClose();
                } : undefined}
                onTouchEnd={() => {
                  cancelBg();
                  deleteTap('Settings');
                  onClose();
                }}
                style={styles.closeBtn}
              >×</p>
            </div>
          </div>
        </div>
        <div className="file_tap_container-bgsetting" style={styles.fileTapContainerBgSetting as React.CSSProperties}>
          <p>Background</p>
        </div>
        <div className="folder_content" style={styles.folderContent as React.CSSProperties}>
          <div className="folder_content-bgsetting" style={styles.folderContentBgSetting as React.CSSProperties}>
            <img alt="bgsettingPC" className='bgsetting_img' src={bgPic} style={styles.bgSettingImg as React.CSSProperties} />
            <div className="preview_bg" style={styles.previewBg as React.CSSProperties}>
              {ImgBgPreview && (
                <img src={ImgBgPreview} alt='' style={styles.previewImg as React.CSSProperties} />
              )}
            </div>
            <div className="bgsettingtext_container" style={styles.bgSettingTextContainer as React.CSSProperties}>
              <div className="wallpaper" style={styles.wallpaper as React.CSSProperties}>
                <p>Wallpaper</p>
                <p>Select an HTML Element or Picture</p>
                <div className="wallpaper_container" style={styles.wallpaperContainer as React.CSSProperties}>
                  {colorOptions.map((option) => (
                    <ul
                      key={option.value}
                      onClick={() => setbgColorFunction2(option.value)}
                      style={selectedBg2 === option.value ? { ...styles.wallpaperOption, background: '#040482', color: 'white' } : styles.wallpaperOption as React.CSSProperties}
                    >
                      {option.label}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bgsetting_btn_container" style={styles.bgSettingBtnContainer as React.CSSProperties}>
            <div className="bgsetting_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('Settings');
                okBg();
                onClose();
              } : undefined}
              onTouchEnd={() => {
                deleteTap('Settings');
                okBg();
                onClose();
              }}
              style={styles.bgSettingBtn as React.CSSProperties}
            >
              <span>OK</span>
            </div>
            <div className="bgsetting_btn_cancel"
              onClick={!isTouchDevice ? () => {
                deleteTap('Settings');
                cancelBg();
                onClose();
              } : undefined}
              onTouchEnd={() => {
                deleteTap('Settings');
                cancelBg();
                onClose();
              }}
              style={styles.bgSettingBtn as React.CSSProperties}
            ><span>Cancel</span>
            </div>
            <div 
              className="bgsetting_btn_apply" 
              onClick={handleApplyClick} 
              style={styles.bgSettingBtn as React.CSSProperties}
            >
              <span>Apply</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Window>
  );
};

const styles = {
  bgSettingFolder: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  folderDragbarBgSetting: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    height: '30px',
  },
  bgSettingBarName: {
    display: 'flex',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: '8px',
  },
  bgSettingBarBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  dash: {
    margin: 0,
    padding: '0 8px',
    cursor: 'pointer',
  },
  closeBtn: {
    margin: 0,
    padding: '0 8px',
    cursor: 'pointer',
  },
  fileTapContainerBgSetting: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  folderContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '10px',
  },
  folderContentBgSetting: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  bgSettingImg: {
    width: '150px',
    height: 'auto',
    marginRight: '20px',
  },
  previewBg: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    marginRight: '20px',
  },
  previewImg: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  bgSettingTextContainer: {
    flex: 1,
  },
  wallpaper: {
    marginBottom: '20px',
  },
  wallpaperContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  wallpaperOption: {
    padding: '5px',
    cursor: 'pointer',
  },
  bgSettingBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  bgSettingBtn: {
    marginLeft: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
};

export default Settings;