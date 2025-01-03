import React from 'react';

export interface RoboticsProjectsProps {}

const RoboticsProjects: React.FC<RoboticsProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Robotics Projects</h1>
            <h3>Sudoku Solver</h3>
            <br />
            <div className="text-block">
                <p>
                    The Sudoku Solver is a project that I developed to solve Sudoku puzzles using a backtracking algorithm. This project showcases my ability to implement complex algorithms and create efficient solutions for challenging problems.
                </p>
                <br />
                <p>
                    The solver is implemented in Python and can solve any valid Sudoku puzzle. It uses a backtracking algorithm to fill in the empty cells with the correct numbers, ensuring that the solution adheres to the rules of Sudoku.
                </p>
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

export default RoboticsProjects;