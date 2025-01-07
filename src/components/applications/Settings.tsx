import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
}

const Settings: React.FC<SettingsProps> = ({ onClose, onInteract, onMinimize }) => {
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

  function appleBG() {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (ImgBgPreview) {
      bodyBG.style.backgroundColor = themeColor || '';
      bodyBG.style.backgroundImage = `url(${ImgBgPreview})`;
    } else {
      bodyBG.style.backgroundImage = 'none';
    }
  }

  function cancelBg() {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (localBg) {
      bodyBG.style.backgroundColor = localTheme || '';
      bodyBG.style.backgroundImage = `url(${localBg})`;
    } else {
      bodyBG.style.backgroundImage = 'none';
    }
  }

  function okBg() {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (ImgBgPreview) {
      bodyBG.style.backgroundColor = themeColor || '';
      bodyBG.style.backgroundImage = `url(${ImgBgPreview})`;
      localStorage.setItem('theme', themeColor || '');
      localStorage.setItem('background', ImgBgPreview);
      localStorage.setItem('barcolor', barcolor || '');
      setLocalBg(ImgBgPreview);
      setLocalTheme(themeColor);
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
      windowBarIcon="settingsIcon"
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
      >
        <div className="folder_dragbar_bgsetting" style={{ background: barcolor || '#757579' }}>
          <div className="bgsetting_barname">
            <img src={settingIcon} alt="" />
            <span>Settings</span>
          </div>
          <div className="bgsetting_barbtn">
            <div onClick={!isTouchDevice ? (e) => {
              e.stopPropagation();
            } : undefined}
              onTouchEnd={(e) => {
                e.stopPropagation();
              }}
            >
              <p className='dash'></p>
            </div>
            <div>
              <p className='x'
                onClick={!isTouchDevice ? () => {
                  cancelBg();
                  deleteTap('Settings');
                } : undefined}
                onTouchEnd={() => {
                  cancelBg();
                  deleteTap('Settings');
                }}
              >×</p>
            </div>
          </div>
        </div>
        <div className="file_tap_container-bgsetting">
          <p>Background</p>
        </div>
        <div className="folder_content">
          <div className="folder_content-bgsetting">
            <img alt="bgsettingPC" className='bgsetting_img' src={bgPic} />
            <div className="preview_bg">
              {ImgBgPreview && (
                <img src={ImgBgPreview} alt='' />
              )}
            </div>
            <div className="bgsettingtext_container">
              <div className="wallpaper">
                <p>Wallpaper</p>
                <p>Select an HTML Element or Picture</p>
                <div className="wallpaper_container">
                  {colorOptions.map((option) => (
                    <ul
                      key={option.value}
                      onClick={() => setbgColorFunction2(option.value)}
                      style={selectedBg2 === option.value ? { background: '#040482', color: 'white' } : {}}
                    >
                      {option.label}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bgsetting_btn_container">
            <div className="bgsetting_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('Settings');
                okBg();
              } : undefined}
              onTouchEnd={() => {
                deleteTap('Settings');
                okBg();
              }}
            >
              <span>OK</span>
            </div>
            <div className="bgsetting_btn_cancel"
              onClick={!isTouchDevice ? () => {
                deleteTap('Settings');
                cancelBg();
              } : undefined}
              onTouchEnd={() => {
                deleteTap('Settings');
                cancelBg();
              }}
            ><span>Cancel</span>
            </div>
            <div className="bgsetting_btn_cancel" onClick={appleBG}><span>Apply</span></div>
          </div>
        </div>
      </motion.div>
    </Window>
  );
};

export default Settings;