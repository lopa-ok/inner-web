import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../diary/DiaryHome';
import About from '../diary/DiaryAbout';
import RandomStuff from '../diary/RandomStuff';
import VerticalNavbar from '../diary/VerticalNavbar';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import '../diary/Diary.css';
import SchoolLife from '../diary/sections/SchoolLife';
import HowItStarted from '../diary/sections/HowItStarted';
import MyThoughts from '../diary/sections/MyThoughts';

export interface ShowcaseExplorerProps extends WindowAppProps {}

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Philopater Essam - Portfolio"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2025 Philopater Essam'}
        >
            <Router>
                <div className="site-page diary-content">
                    <VerticalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/school-life" element={<SchoolLife />} />
                        <Route path="/how-it-started" element={<HowItStarted />} />
                        <Route path="/my-thoughts" element={<MyThoughts />} />
                        <Route path="/random-stuff" element={<RandomStuff />} />
                    </Routes>
                </div>
            </Router>
        </Window>
    );
};

export default ShowcaseExplorer;
