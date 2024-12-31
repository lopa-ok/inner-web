import React from 'react';

import girlRun from '../../../assets/pictures/projects/games/girl-run.gif';
import gsts from '../../../assets/pictures/projects/games/gsts.png';

export interface GamesProps {}

const Games: React.FC<GamesProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Games</h1>
            <h3>Projects and Development</h3>
            <br />
            <div className="text-block">
                <p>
                    Placeholder for future content about game development projects.
                </p>
            </div>
            <div className="text-block">
                <h2>Pixel Art and Animation</h2>
                <br />
                <div className="captioned-image">
                    <img src={girlRun} alt="Girl running animation" />
                    <p>
                        <sub>
                            <b>Figure 1:</b> Eight Frame Run cycle animated by myself, original sprite by kevink
                        </sub>
                    </p>
                </div>
                <br />
                <div className="captioned-image">
                    <img src={gsts} alt="Enemy lineup" />
                    <p>
                        <sub>
                            <b>Figure 2:</b> More pixel art: Enemy Lineup from a game I worked on
                        </sub>
                    </p>
                </div>
                <br />
                <p>
                    Placeholder for future content about pixel art and animation.
                </p>
            </div>
        </div>
    );
};

export default Games;