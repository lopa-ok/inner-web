import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import settingIcon from '../../assets/setting.png';
import '../css/BgSetting.css';

interface SettingsProps {
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
}

function Settings({ onClose, onInteract, onMinimize }: SettingsProps) {
  const [themeColor, setThemeColor] = useState<string | null>(null);
  const [localTheme, setLocalTheme] = useState(() => {
    const prevTheme = localStorage.getItem('theme');
    return prevTheme ? prevTheme : null;
  });
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);

  const colorOptions = [
    { value: 1, label: 'None', color: '#098684', barColor: '#14045c' },
    { value: 2, label: 'Purple Summer', color: '#3F4565', barColor: '#3F4565' },
    { value: 3, label: 'Matt Blue', color: '#456EA6', barColor: '#456EA6' },
    { value: 4, label: 'Matt Green', color: '#008081', barColor: '#008081' },
    { value: 6, label: 'Blue Sky', color: '#4B6894', barColor: '#4B6894' },
    { value: 7, label: 'Dark Tone', color: '#313439', barColor: '#313439' },
    { value: 8, label: 'Light Pink', color: '#f3aac0', barColor: '#1c1719' },
    { value: 9, label: 'Deep Ocean', color: '#3F4565', barColor: '#3F4565' },
    { value: 10, label: 'Purple Blue', color: '#354092', barColor: '#354092' },
  ];

  interface ColorOption {
    value: number;
    label: string;
    color: string;
    barColor: string;
  }

  function setColorFunction(index: number): void {
    const selectedOption: ColorOption | undefined = colorOptions.find(option => option.value === index);
    if (selectedOption) {
      setSelectedColor(index);
      setThemeColor(selectedOption.color);
    }
  }

  useEffect(() => {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (localTheme) {
      bodyBG.style.backgroundColor = localTheme;
    }
  }, [localTheme]);

  function applyColor() {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (themeColor) {
      bodyBG.style.backgroundColor = themeColor;
    }
  }

  function cancelColor() {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (localTheme) {
      bodyBG.style.backgroundColor = localTheme;
    }
  }

  function okColor() {
    const bodyBG = document.getElementsByTagName('body')[0];
    if (themeColor) {
      bodyBG.style.backgroundColor = themeColor;
      localStorage.setItem('theme', themeColor);
      setLocalTheme(themeColor);
    }
  }

  return (
    <Window
      top={10}
      left={10}
      width={width}
      height={height}
      windowTitle="Settings"
      windowBarIcon="settingsIcon"
      windowBarColor="#757579"
      closeWindow={onClose}
      onInteract={onInteract}
      onWidthChange={setWidth}
      onHeightChange={setHeight}
      minimizeWindow={onMinimize}
    >
      <div className="settings-container">
        <div className="settings-header">
          <img src={settingIcon} alt="Settings" />
          <span>Settings</span>
        </div>
        <div className="settings-content">
          <div className="color-options">
            <p>Select a Color</p>
            <div className="color-options-list">
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  className={`color-option ${selectedColor === option.value ? 'selected' : ''}`}
                  style={{ backgroundColor: option.color }}
                  onClick={() => setColorFunction(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="settings-footer">
          <button onClick={okColor}>OK</button>
          <button onClick={cancelColor}>Cancel</button>
          <button onClick={applyColor}>Apply</button>
        </div>
      </div>
    </Window>
  );
}

export default Settings;