import React from 'react';

import windowResize from './windowResize.png';
import maximize from './maximize.png';
import minimize from './minimize.png';
import computerBig from './computerBig.png';
import computerSmall from './computerSmall.png';
import myComputer from './myComputer.png';
import showcaseIcon from './showcaseIcon.png';
import doomIcon from './doomIcon.png';
import wordleIcon from './wordleIcon.png';
import credits from './credits.png';
import volumeOn from './volumeOn.png';
import volumeOff from './volumeOff.png';
import trailIcon from './trailIcon.png';
import windowGameIcon from './windowGameIcon.png';
import windowExplorerIcon from './windowExplorerIcon.png';
import windowsStartIcon from './windowsStartIcon.png';
import scrabbleIcon from './scrabbleIcon.png';
import close from './close.png';
import chessIcon from './chessIcon.png';
import setting from './setting.png';
import folderIcon from './folder.png';
import InternetExplorerIcon from './InternetExplorerIcon.png';
import textFileIcon from './textFileIcon.png';
import runIcon from './runIcon.png';
import recycleBinIcon from './recycleBinIcon.png';
import msnIcon from './msnIcon.png';
import recycleBinFullIcon from './recycleBinFullIcon.png';
import recycleBinDocIcon from './recycleBinDocIcon.png';
import recycleBinTextIcon from './recycleBinTextIcon.png';
import documentsIcon from './documentsIcon.png';

const icons = {
    windowResize: windowResize,
    maximize: maximize,
    minimize: minimize,
    computerBig: computerBig,
    computerSmall: computerSmall,
    myComputer: myComputer,
    showcaseIcon: showcaseIcon,
    doomIcon: doomIcon,
    volumeOn: volumeOn,
    volumeOff: volumeOff,
    credits: credits,
    scrabbleIcon: scrabbleIcon,
    wordleIcon: wordleIcon,
    close: close,
    windowGameIcon: windowGameIcon,
    windowExplorerIcon: windowExplorerIcon,
    windowsStartIcon: windowsStartIcon,
    trailIcon: trailIcon,
    chessIcon: chessIcon,
    setting: setting,
    folderIcon: folderIcon,
    InternetExplorerIcon: InternetExplorerIcon,
    textFileIcon: textFileIcon,
    runIcon: runIcon,
    recycleBinIcon: recycleBinIcon,
    msnIcon: msnIcon,
    recycleBinFullIcon: recycleBinFullIcon,
    recycleBinDocIcon: recycleBinDocIcon,
    recycleBinTextIcon: recycleBinTextIcon,
    documentsIcon: documentsIcon,
};

export type IconName = keyof typeof icons;

const getIconByName = (
    iconName: IconName
    // @ts-ignore
): React.FC<React.SVGAttributes<SVGElement>> => icons[iconName];

export default getIconByName;