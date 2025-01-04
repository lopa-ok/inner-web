import React, { useState } from 'react';
import Window from '../os/Window';
import Minesweeper from '../Minesweeper/Minesweeper';

export interface MinesweeperAppProps extends WindowAppProps {}

const MinesweeperApp: React.FC<MinesweeperAppProps> = (props) => {
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);

    return (
        <Window
            top={10}
            left={10}
            width={width}
            height={height}
            windowTitle="Minesweeper"
            windowBarIcon="windowGameIcon"
            windowBarColor="#000000"
            bottomLeftText={'Minesweeper Game'}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            minimizeWindow={props.onMinimize}
        >
            <Minesweeper width={width} height={height} />
        </Window>
    );
};

export default MinesweeperApp;