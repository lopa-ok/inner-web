import React, { useState } from 'react';
import DosPlayer from '../dos/DosPlayer';
import Window from '../os/Window';

export interface ChessAppProps extends WindowAppProps {}

const ChessApp: React.FC<ChessAppProps> = (props) => {
    const [width, setWidth] = useState(920);
    const [height, setHeight] = useState(750);

    return (
        <Window
            top={10}
            left={10}
            width={width}
            height={height}
            windowTitle="Chess"
            windowBarIcon="windowGameIcon"
            windowBarColor="#000000"
            bottomLeftText={'Powered by JSDOS & DOSBox'}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            minimizeWindow={props.onMinimize}
        >
            <DosPlayer
                width={width}
                height={height}
                bundleUrl="chess.jsdos"
            />
        </Window>
    );
};

export default ChessApp;