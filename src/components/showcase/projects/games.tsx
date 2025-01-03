import React from 'react';
// @ts-ignore
import mine from '../../../assets/pictures/projects/games/mine.mp4';
// @ts-ignore
import hypixel from '../../../assets/pictures/projects/games/hypixel.mp4';
// @ts-ignore
import two from '../../../assets/pictures/projects/games/two.mp4';
// @ts-ignore
import tictactoe from '../../../assets/pictures/projects/games/tictactoe.mp4';
// @ts-ignore
import sudoku from '../../../assets/pictures/projects/games/sudoku.mp4';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps {}

const gamesProjects: React.FC<SoftwareProjectsProps> = (props) => {
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
            <br />
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
                is a project where I recreated the classic Minesweeper game, combining logic-based gameplay with a sleek and interactive user interface. This project challenged me to balance efficient game mechanics with responsive design, delivering an engaging experience for players of all skill levels.
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
                <p>
                From a technical standpoint, the game grid is dynamically generated using JavaScript and relies on algorithms to distribute mines randomly across the board while calculating adjacent mine counts for each cell. The game features intuitive controls: left-click to reveal cells and right-click to flag potential mines. The implementation includes real-time feedback to players, such as highlighting flagged cells, revealing safe paths, and showing a game-over screen when a mine is clicked.
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
                This implementation of the classic 2048 game creates a 4x4 grid where tiles merge to reach the goal of forming a tile with the value 2048. The game initializes with two randomly placed tiles (either 2 or 4) and supports movement in four directions: up, down, left, and right. Each move shifts tiles, merges matching values, and updates the score dynamically. If no moves remain, a game-over modal appears displaying the final score. The design emphasizes smooth tile updates, intuitive keyboard controls, and interactive UI elements, creating an engaging experience while maintaining the logic for merging and generating new tiles.
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
            <div className="text-block">
                <h2>Sudoku</h2>
                <br />
                <p>
    
    is a project where I developed an interactive Sudoku game, blending logic-based problem-solving with a clean and user-friendly interface. The game dynamically generates puzzles, validates solutions, tracks time, and even provides a hint system to assist users. It’s a showcase of combining core programming skills with a focus on user engagement.
</p>
<br />
<div className="captioned-image">
    <VideoAsset src={sudoku} />
    <p style={styles.caption}>
        <sub>
            <b>Figure 5:</b> The Sudoku game's interface, featuring dynamically generated puzzles, a timer, and a hint system for players.
        </sub>
    </p>
</div>
<p>
    From a technical perspective, this project leverages JavaScript and DOM manipulation to create and manage the game grid. The puzzle generation relies on a backtracking algorithm to ensure unique, solvable puzzles. Additionally, the grid is populated using a randomized masking method that removes numbers while maintaining puzzle integrity through solution validation. The hint system scans the grid to intelligently suggest valid numbers for empty cells, while the timer keeps track of user progress in real time.
</p>

        
    

                </div>
                
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/lopa-ok/sudoku"
                        >
                            <p>
                                <b>[GitHub Repo]</b> - github.com/lopa-ok/sudoku
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://lopa-ok.github.io/sudoku/"
                        >
                            <p>
                            <b>[Demo]</b> - lopa-ok.github.io/sudoku/
                            </p>
                        </a>
                    </li>
                </ul>
                
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

export default gamesProjects;