import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../showcase/Home';
import About from '../showcase/About';
import Window from '../os/Window';
import Experience from '../showcase/Experience';
import Projects from '../showcase/Projects';
import Contact from '../showcase/Contact';
import Hack from '../showcase/Hack';
import SoftwareProjects from '../showcase/projects/software';
import AIProjects from '../showcase/projects/ai';
import GamesProjects from '../showcase/projects/games';
import RandomStuff from '../showcase/RandomStuff';
import VerticalNavbar from '../showcase/VerticalNavbar';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

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
                <div className="site-page">
                    <VerticalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/random-stuff" element={<RandomStuff />} />
                        <Route path="/Hack" element={<Hack/>} />
                        <Route
                            path="/projects/software"
                            element={<SoftwareProjects />}
                        />
                        <Route
                            path="/projects/AI"
                            element={<AIProjects />}
                        />
                        <Route path="/projects/games" element={<GamesProjects />} />
                    </Routes>
                </div>
            </Router>
        </Window>
    );
};

export default ShowcaseExplorer;
