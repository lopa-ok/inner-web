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
  updateBackground: (background: string, theme: string) => void;
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
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(800);

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

  useEffect(() => {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (localBg) {
      bodyBG.style.backgroundColor = localTheme || '';
      bodyBG.style.backgroundImage = `url(${localBg})`;
    }

    if (localBg && localTheme) {
      setImgBgPreview(localBg);
      setThemeColor(localTheme);
    }
  }, [localBg, localTheme]);

  function setbgColorFunction2(index: number): void {
    const selectedOption = colorOptions.find(option => option.value === index);
    if (selectedOption) {
      console.log('Setting background:', selectedOption);
      setSelectedBg2(index);
      setImgBgPreview(selectedOption.image);
      setThemeColor(selectedOption.color);
      setBarcolor(selectedOption.barColor);
      
      updateBackground(selectedOption.image, selectedOption.color);
    }
  }

  function handleApplyClick() {
    if (ImgBgPreview && themeColor) {
      console.log('Applying background:', { ImgBgPreview, themeColor });
      updateBackground(ImgBgPreview, themeColor);
      localStorage.setItem('theme', themeColor);
      localStorage.setItem('background', ImgBgPreview);
      localStorage.setItem('barcolor', barcolor || '');
      setLocalBg(ImgBgPreview);
      setLocalTheme(themeColor);
    }
  }

  function cancelBg() {
    if (localBg && localTheme) {
      console.log('Canceling, reverting to:', { localBg, localTheme });
      updateBackground(localBg, localTheme);
    }
  }

  function okBg() {
    if (ImgBgPreview && themeColor) {
      console.log('Applying and saving:', { ImgBgPreview, themeColor });
      updateBackground(ImgBgPreview, themeColor);
      localStorage.setItem('theme', themeColor);
      localStorage.setItem('background', ImgBgPreview);
      localStorage.setItem('barcolor', barcolor || '');
      setLocalBg(ImgBgPreview);
      setLocalTheme(themeColor);
      onClose();
    }
  }

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
      minimizeWindow={onMinimize}
      resizable={false}
    >
      <motion.div
        className='bgsetting_folder'
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ ...styles.bgSettingFolder, overflow: 'hidden' } as MotionStyle}
      >
        <div className="file_tap_container-bgsetting" style={styles.fileTapContainerBgSetting as React.CSSProperties}>
          <p>Background</p>
        </div>
        <div className="folder_content" style={{ ...styles.folderContent, overflow: 'hidden' } as React.CSSProperties}>
          <div className="folder_content-bgsetting" style={styles.folderContentBgSetting as React.CSSProperties}>
            <img alt="bgsettingPC" className='bgsetting_img' src={bgPic} style={styles.bgSettingImg as React.CSSProperties} />
            <div className="preview_bg" style={styles.previewBg as React.CSSProperties}>
              {ImgBgPreview && (
                <img src={ImgBgPreview} alt='' style={styles.previewImg as React.CSSProperties} />
              )}
            </div>
            <div className="bgsettingtext_container" style={styles.bgSettingTextContainer as React.CSSProperties}>
              <div className="wallpaper" style={styles.wallpaper as React.CSSProperties}>
                <p>Select an HTML Element or Picture</p>
                <div className="wallpaper_container" style={styles.wallpaperContainer as React.CSSProperties}>
                  {colorOptions.map((option) => (
                    <ul
                      key={option.value}
                      onClick={() => setbgColorFunction2(option.value)}
                      style={selectedBg2 === option.value ? { ...styles.wallpaperOption, background: '#040482', color: 'white' } : styles.wallpaperOption as React.CSSProperties}
                      onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.wallpaperOptionHover)}
                      onMouseOut={(e) => {
                        if (selectedBg2 !== option.value) {
                          Object.assign(e.currentTarget.style, styles.wallpaperOption);
                        }
                      }}
                    >
                      {option.label}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bgsetting_btn_container" style={{ ...styles.bgSettingBtnContainer, flexDirection: 'row', bottom: '10px', right: '10px' } as React.CSSProperties}>
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
              onMouseDown={e => Object.assign(e.currentTarget.style, styles.bgSettingBtnActive)}
              onMouseUp={e => Object.assign(e.currentTarget.style, styles.bgSettingBtn)}
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

const styles: { [key: string]: React.CSSProperties } = {
  bgSettingFolder: {
    display: 'flex',
    flexDirection: 'column',
    background: '#c5c4c4',
    border: '0px solid white',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    outline: '1px solid white',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  fileTapContainerBgSetting: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: '12px',
    marginLeft: '9px',
    cursor: 'default',
    fontSize: '12px',
    background: '#c5c4c4',
    border: '2px solid black',
    borderTopColor: '#f0efef',
    borderLeftColor: '#f0efef',
    borderBottomColor: 'transparent',
    borderRightColor: '#353434',
    zIndex: 999999,
    padding: '1px 8px',
    width: 'fit-content',
  },
  folderContent: {
    position: 'relative',
    margin: '0 auto',
    width: 'calc(100% - 8px)',
    height: 'calc(100% - 4px)',
    overflow: 'hidden',
    touchAction: 'none',
    zIndex: 2,
  },
  folderContentBgSetting: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: 'calc(100% - 10px)',
    height: 'calc(100% - 95px)',
    padding: '1rem 1.5rem',
    border: '2px solid #353434',
    borderTopColor: '#f0efef',
    borderLeftColor: '#f0efef',
    margin: '0 auto',
    background: '#c5c4c4',
    overflow: 'hidden',
    wordBreak: 'break-word',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBg: {
    position: 'absolute',
    top: '24.5%',
    left: 'calc(50% - 4px)',
    transform: 'translate(-50%, -50%)',
    width: '34%',
    height: '28%',
    border: '2px solid black',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
    overflow: 'hidden',
    background: '#fff',
  },
  bgSettingBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    gap: '6px',
    bottom: '10px',
    right: '10px',
  },
  bgSettingImg: {
    width: '50%',
    height: 'auto',
    marginBottom: '20px',
    marginTop: '20px',
    position: 'relative',
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
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    height: '30%',
    width: '50%',
    border: '2px solid #353434',
    borderTopColor: '#f0efef',
    borderLeftColor: '#f0efef',
    background: 'white',
    margin: '0 auto',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    maxHeight: '150px',
  },
  wallpaperOption: {
    fontSize: '20px',
    cursor: 'default',
    margin: '0',
    width: '100%',
    textAlign: 'center',
    padding: '1px 0',
    fontFamily: 'MSSerif',
  },
  wallpaperOptionHover: {
    backgroundColor: '#000080',
    color: '#fff',
  },
  bgSettingBtn: {
    position: 'relative',
    width: '70px',
    textAlign: 'center',
    border: '2px solid black',
    borderTopColor: '#f0efef',
    borderLeftColor: '#f0efef',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '4px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgSettingBtnActive: {
    borderTopColor: 'black',
    borderLeftColor: 'black',
    borderBottomColor: '#f0efef',
    borderRightColor: '#f0efef',
  },
};

//custom scrollbar
const globalStyles = `
  body *::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background: none;
  }

  body *::-webkit-scrollbar-thumb, body *::-webkit-scrollbar-button {
    width: 16px;
    height: 16px;
    background: silver;
    box-shadow: inset 1px 1px #dfdfdf, inset -1px -1px gray;
    border: 1px solid;
    border-color: silver #000 #000 silver;
  }

  body *::-webkit-scrollbar-track {
    image-rendering: optimizeSpeed;
    image-rendering: pixelated;
    image-rendering: optimize-contrast;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAyIDIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyI+CjxtZXRhZGF0YT5NYWRlIHdpdGggUGl4ZWxzIHRvIFN2ZyBodHRwczovL2NvZGVwZW4uaW8vc2hzaGF3L3Blbi9YYnh2Tmo8L21ldGFkYXRhPgo8cGF0aCBzdHJva2U9IiNjMGMwYzAiIGQ9Ik0wIDBoMU0xIDFoMSIgLz4KPC9zdmc+");
    background-position: 0 0;
    background-repeat: repeat;
    background-size: 2px;
  }

  body *::-webkit-scrollbar-button {
    background-repeat: no-repeat;
    background-size: 16px;
  }

  body *::-webkit-scrollbar-button:single-button:vertical:decrement {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTcgNWgxTTYgNmgzTTUgN2g1TTQgOGg3IiAvPgo8L3N2Zz4=");
  }

  body *::-webkit-scrollbar-button:single-button:vertical:increment {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTQgNWg3TTUgNmg1TTYgN2gzTTQgOGg3IiAvPgo8L3N2Zz4=");
  }

  body *::-webkit-scrollbar-button:single-button:horizontal:decrement {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTggM2gxTTcgNGgyTTYgNWgzTTUgNmg0TTYgN2gzTTcgOGgyTTggOWgxIiAvPgo8L3N2Zz4=");
  }

  body *::-webkit-scrollbar-button:single-button:horizontal:increment {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTYgM2gxTTYgNGgyTTYgNWgzTTYgNmg0TTYgN2gzTTYgOGgyTTYgOWgxIiAvPgo8L3N2Zz4=");
  }

  body *::-webkit-scrollbar-corner {
    background: silver;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Settings;