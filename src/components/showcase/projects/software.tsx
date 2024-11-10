import React from 'react';
import tictactoe from '../../../assets/pictures/projects/software/tictactoe.mp4';
import saga from '../../../assets/pictures/projects/software/old.mp4';
import computer from '../../../assets/pictures/projects/software/computer.mp4';
import scroll from '../../../assets/pictures/projects/software/scroll.mp4';

import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = () => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <p>
                Below are some of my favorite Web development projects I have worked on over the last few years.
            </p>
            <ResumeDownload />
            
            {/* Portfolio Project */}
            <div className="text-block">
                <h2>philopater.me</h2>
                <p>
                    philopater.me is my portfolio website, and also the website you are on right now. This project was an absolute joy to make and challenged me both technically and creatively...
                </p>
                <div className="captioned-image">
                    <VideoAsset src={computer} />
                    <p style={styles.caption}>
                        <sub><b>Figure 1:</b> Blender Scene of the 3D website. The scene was baked and exported in GLTF format.</sub>
                    </p>
                </div>
                <h3>Links:</h3>
                <ul>
                    <li><a href="https://philopater.me" target="_blank" rel="noreferrer"><b>[3D Site]</b> - philopater.me</a></li>
                    <li><a href="https://philopater.vercel.app/" target="_blank" rel="noreferrer"><b>[OS Site]</b> - philopater.vercel.app</a></li>
                </ul>
            </div>
            
            {/* Old Portfolio Project */}
            <div className="text-block">
                <h2>Old Portfolio</h2>
                <p>
                    My first attempt at creating an interactive, visually engaging portfolio. This project pushed my skills in design and development, using React and Three.js, but was very resource-intensive, which made it challenging to run on many devices.
                </p>
                <div className="captioned-image">
                    <VideoAsset src={saga} />
                    <p style={styles.caption}><sub><b>Figure 2:</b> A preview of the old portfolio’s main interface.</sub></p>
                </div>
                <h3>Links:</h3>
                <ul>
                    <li><a href="https://lopa-old-portfolio.vercel.app/" target="_blank" rel="noreferrer"><b>[Old Portfolio]</b> - lopa-old-portfolio.vercel.app</a></li>
                </ul>
            </div>

            {/* Stop the Scroll Project */}
            <div className="text-block">
                <h2>Stop the Scroll</h2>
                <p>
                    A Chrome extension that organizes GitHub comments by reactions to help developers find useful responses more efficiently. The extension is open-source on GitHub.
                </p>
                <div className="captioned-image">
                    <VideoAsset src={scroll} />
                    <p style={styles.caption}><sub><b>Figure 3:</b> Skip the Scroll in action.</sub></p>
                </div>
                <h3>Links:</h3>
                <ul>
                    <li><a href="https://github.com/lopa-ok/Stop-The-Scroll" target="_blank" rel="noreferrer"><b>[GitHub]</b> - Stop the Scroll Repository</a></li>
                </ul>
            </div>

            {/* Tic Tac Toe Project */}
            <div className="text-block">
                <h2>Tic Tac Toe Ultimate</h2>
                <p>
                    An advanced Tic Tac Toe game with features that go beyond the traditional 3x3 grid, making it more challenging and fun to play.
                </p>
                <div className="captioned-image">
                    <VideoAsset src={tictactoe} />
                    <p style={styles.caption}><sub><b>Figure 4:</b> A preview of Ultimate tic-tac-toe in action.</sub></p>
                </div>
                <h3>Links:</h3>
                <ul>
                    <li><a href="https://github.com/lopa-ok/new-project" target="_blank" rel="noreferrer"><b>[GitHub]</b> - New Project Repository</a></li>
                </ul>
            </div>

            <ResumeDownload />
        </div>
    );
};

const styles = {
    video: {
        width: '100%',
        padding: 12,
    },
    caption: {
        width: '80%',
    },
};

export default SoftwareProjects;
