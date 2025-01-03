import React from 'react';
import Window from '../os/Window';
import Wordle from '../wordle/Wordle';

export interface esordleAppProps extends WindowAppProps {}

const esordleApp: React.FC<esordleAppProps> = (props) => {
    return (
        <Window
            top={20}
            left={300}
            width={600}
            height={860}
            windowBarIcon="windowGameIcon"
            windowTitle="esordle"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2024 Philopater Essam'}
        >
            <div className="site-page">
                <Wordle />
            </div>
        </Window>
    );
};

export default esordleApp;
