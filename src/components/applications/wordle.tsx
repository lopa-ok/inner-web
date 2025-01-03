import React from 'react';
import Window from '../os/Window';
import Wordle from '../wordle/Wordle';

export interface wordleAppProps extends WindowAppProps {}

const wordleApp: React.FC<wordleAppProps> = (props) => {
    return (
        <Window
            top={20}
            left={300}
            width={600}
            height={860}
            windowBarIcon="windowGameIcon"
            windowTitle="wordle"
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

export default wordleApp;
