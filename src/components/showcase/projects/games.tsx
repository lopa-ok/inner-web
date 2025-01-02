import React from 'react';
// @ts-ignore
import mine from '../../../assets/pictures/projects/games/mine.mp4';
// @ts-ignore
import hypixel from '../../../assets/pictures/projects/games/hypixel.mp4';
// @ts-ignore
import two from '../../../assets/pictures/projects/games/two.mp4';
// @ts-ignore
import tictactoe from '../../../assets/pictures/projects/games/tictactoe.mp4';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Game Devolpment</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Below are some random boring games that I have worked on over the last few years.
            </p>
            <br />
            <ResumeDownload />
            <div className="text-block">
                <h2>Tic-Tac-Toe Ultimate</h2>
                <br />
                <p>
                    Tic Tac Toe Ultimate is an advanced version of the classic Tic Tac Toe game, built using JavaScript. This project includes features that go beyond the traditional 3x3 grid, making it more challenging and fun to play.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={tictactoe} />
                    <div style={styles.caption}>
                        <p>
                            <sub>
                                <b>Figure 1: </b>  A preview of Tic-Tac-toe Ultimate in action.
                            </sub>
                        </p>
                    </div>
                </div>
                <h3>How to play:</h3>
                <ul>
                    <li>
                        <p>
                            Players take turns to place their mark (X or O) in the mini-grids.
                        </p>
                    </li>
                    <li>
                        <p>
                            Each move determines the mini-grid for the opponent's next move.
                        </p>
                    </li>
                    <li>
                        <p>
                            The first player to win the majority of the mini-grids or get Three mini-grids in a row wins the game.
                        </p>
                    </li>
                </ul>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://lopa-ok.github.io/tic-tac-toe-ultimate/"
                        >
                            <p>
                                <b>[Demo]</b> - lopa-ok.github.io/tic-tac-toe-ultimate/
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/lopa-ok/tic-tac-toe-ultimate"
                        >
                            <p>
                                <b>[Github Repo]</b> - github.com/lopa-ok/tic-tac-toe-ultimate
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <br />
            
            
            <br />
            <div className="text-block">
                <h2>Hypixel AH Snipper</h2>
                <br />
                <p>
                    The Hypixel AH Snipper is a Python application designed to fetch and display auction data from the Hypixel Skyblock API. It features a user-friendly GUI that allows users to filter auctions, copy auction commands, and view detailed auction information, including profit percentages and end times.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={hypixel} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 2:</b> Showcase of the Hypixel AH Snipper
                        </sub>
                    </p>
                </div>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/lopa-ok/Hypixel-AH-Snipper"
                        >
                            <p>
                                <b>[Github Repo]</b> - github.com/lopa-ok/Hypixel-AH-Snipper
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Minesweeper</h2>
                <br />
                <p>
                Minesweeper is a classic puzzle game where the objective is to clear a rectangular board containing hidden "mines" without detonating any of them. This project was built using React and showcases my ability to create interactive and engaging user interfaces. The game includes adjustable difficulty levels, a timer, and high score tracking.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={mine} />
                    <div style={styles.caption}>
                        <p>
                            <sub>
                                <b>Figure 3: </b>  A preview of Minesweeper game
                            </sub>
                        </p>
                    </div>
                </div>
                <p>
                    the game features adjustable difficulty levels, a timer, and high score tracking. It was a fun project to work on and I learned a lot about game development in the process.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/lopa-ok/minesweeper"
                        >
                            <p>
                                <b>[Github Repo]</b> - github.com/lopa-ok/minesweeper
                            </p>
                        </a>
                    </li>
                <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://lopa-ok.github.io/minesweeper/"
                        >
                            <p>
                                <b>[Demo]</b> - lopa-ok.github.io/minesweeper/
                            </p>
                        </a>
                    </li>
                    
                </ul>
                
            </div>
            <div className="text-block">
                <h2>2048</h2>
                <br />
                <p>
                2048 is a popular sliding block puzzle game where the objective is to combine tiles with the same number to create a tile with the number 2048. This project was built using JavaScript and showcases my ability to implement game logic and create an engaging user experience. The game features smooth animations and a responsive design, making it enjoyable to play.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={two} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 4:</b> A preview of 2048 game
                        </sub>
                    </p>
                </div>
                
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/lopa-ok/2048"
                        >
                            <p>
                                <b>[GitHub Repo]</b> - github.com/lopa-ok/2048
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://lopa-ok.github.io/2048/"
                        >
                            <p>
                            <b>[Demo]</b> - lopa-ok.github.io/2048/
                            </p>
                        </a>
                    </li>
                </ul>
                
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    caption: {
        textAlign: 'center',
        fontSize: '0.9em',
        color: '#555',
    },
};

export default SoftwareProjects;