import React from 'react';
import sudokuSolverImage from '../../../assets/pictures/projects/AI/sudoku-solver.png';
import ResumeDownload from '../ResumeDownload';
export interface RoboticsProjectsProps {}

const RoboticsProjects: React.FC<RoboticsProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>AI and ML Projects</h1>
            
            <br />
            <p>
                Below are some random boring AI projects that I have worked on over the last few years.
            </p>
            <br />
            <ResumeDownload />
            <div className="text-block">
            <h2>Sudoku Solver</h2>
                <p>
                    The Sudoku Solver is a project that I developed to solve Sudoku puzzles using a backtracking algorithm. This project showcases my ability to implement complex algorithms and create efficient solutions for challenging problems.
                </p>
                <br />
                <p>
                    The solver is implemented in Python and can solve any valid Sudoku puzzle. It uses a backtracking algorithm to fill in the empty cells with the correct numbers, ensuring that the solution adheres to the rules of Sudoku.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={sudokuSolverImage} alt="Sudoku Solver" style={styles.image} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> Screenshot of the Sudoku Solver in action.
                        </sub>
                    </p>
                </div>
                <br />
                <h3>Features:</h3>
                <ul>
                    <li>Solves any valid Sudoku puzzle</li>
                    <li>Implemented using a backtracking algorithm</li>
                    <li>Efficient and fast solution</li>
                </ul>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/lopa-ok/sudoku-solver"
                        >
                            <p>
                                <b>[GitHub Repo]</b> - github.com/lopa-ok/sudoku-solver
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    image: {
        width: '100%',
        height: 'auto',
    },
    caption: {
        textAlign: 'center',
        fontSize: '0.9em',
        color: '#555',
    },
};

export default RoboticsProjects;