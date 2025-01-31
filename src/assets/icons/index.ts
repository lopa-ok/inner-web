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
import sudokuIcon from './sudokuIcon.png';
import hangmanIcon from './hangmanIcon.png'
import tictactoeIcon from './tictactoeIcon.png';
import whackIcon from './whackIcon.png';
import tetrisIcon from './tetrisIcon.png';
import twentyIcon from './twentyIcon.png';
import arrowRightIcon from './arrowRightIcon.png';
import arrowRightInvertedIcon from './arrowRightInvertedIcon.png';
import paintIcon from './paintIcon.png';
import calculatorIcon from './calculatorIcon.png';
import findIcon from './findIcon.png';
import programIcon from './programIcon.png';
import helpIcon from './helpIcon.png';
import snakeIcon from './snakeIcon.png';
import memoryIcon from './memoryIcon.png';
import lanIcon from './lanIcon.png';
import genSettingsIcon from './genSettingsIcon.png';
import dosIcon from './dosIcon.png';
import rockPaperScissorsIcon from './rockPaperScissorsIcon.png';
import diaryIcon from './diaryIcon.png'
import fourIcon from './fourIcon.png';
import hockeyIcon from './hockeyIcon.png';
import pongIcon from './pongIcon.png';
import checkersIcon from './checkersIcon.png';

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
    sudokuIcon: sudokuIcon,
    hangmanIcon: hangmanIcon,
    tictactoeIcon: tictactoeIcon,
    whackIcon: whackIcon,
    twentyIcon: twentyIcon,
    tetrisIcon: tetrisIcon,
    arrowRightIcon: arrowRightIcon,
    arrowRightInvertedIcon: arrowRightInvertedIcon,
    paintIcon: paintIcon,
    calculatorIcon: calculatorIcon,
    findIcon: findIcon,
    programIcon: programIcon,
    helpIcon: helpIcon,
    snakeIcon: snakeIcon,
    memoryIcon: memoryIcon,
    lanIcon: lanIcon,
    genSettingsIcon: genSettingsIcon,
    dosIcon: dosIcon,
    rockPaperScissorsIcon: rockPaperScissorsIcon,
    diaryIcon: diaryIcon,
    fourIcon: fourIcon,
    hockeyIcon: hockeyIcon,
    pongIcon: pongIcon,
    checkersIcon: checkersIcon,

};

export type IconName = keyof typeof icons;

const getIconByName = (
    iconName: IconName
    // @ts-ignore
): React.FC<React.SVGAttributes<SVGElement>> => icons[iconName];

export default getIconByName;