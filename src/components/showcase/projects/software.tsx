import React from 'react';
// @ts-ignore
import saga from '../../../assets/pictures/projects/software/old.mp4';
// @ts-ignore
import computer from '../../../assets/pictures/projects/software/computer.mp4';
// @ts-ignore
import scroll from '../../../assets/pictures/projects/software/scroll.mp4';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Below are some of my favorite web development projects I have worked on
                over the last few years.
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>philopater.me</h2>
                <br />
                <p>
                                        philopater.me is my portfolio website, and also the
                                        website you are on right now. This project was an absolute
                                        joy to make and challenged me both technically and
                                        creatively. Early in 2024, I knew I wanted to make an
                                        interactive portfolio to aid my job search. I eventually got
                                        the idea for this site around early February and began
                                        development early March. I've been developing it alongside
                                        my semester at school and if you are reading this, it's
                                        pretty much done! just a PSA This website is heavily inspired by the work of Henry Heffernan.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={computer} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> Blender Scene of the 3D website.
                            The scene from Blender was baked and exported in a
                            GLTF format.
                        </sub>
                    </p>
                </div>
                <p>
                    Now, a quick technical breakdown of the site. The website is
                    split into two parts, the 3D site, and the 2D OS site. The
                    3D site uses Three.js to render the scene and renders the 2D
                    site inside of it using an iframe. The 2D OS site is a
                    simple react site that is hosted{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://philopater.vercel.app/"
                    >
                        here
                    </a>{' '}
                    and works as a standalone web app. The actual rendering of
                    the 2D site is accomplished using a CSS renderer provided by
                    Three.js that transforms the html of the 2D site with 3D CSS
                    transforms to give the illusion of three dimensionality.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://philopater.me"
                        >
                            <p>
                                <b>[3D Site]</b> - philopater.me
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://philopater.vercel.app/"
                        >
                            <p>
                                <b>[OS Site]</b> - philopater.vercel.app
                            </p>
                        </a>
                    </li>



                </ul>
                <p>
                    I'm skipping over a lot of details in exchange for brevity,
                    but I do plan on doing a more in depth breakdown for those
                    interested sometime in the future. To get updates with that
                    project feel free to follow me on instagram{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.instagram.com/philopater.essam/"
                    >
                        @philopater.essam
                    </a>
                </p>
            </div>
            <div className="text-block">
                <h2>Old portfolio</h2>
                <br />
                <p>
                was my first attempt at creating an interactive, visually engaging portfolio. This project pushed my skills in design and development, challenging me to explore complex animations and media integrations.I aimed to deliver a unique experience that stood out. However, one major lesson I learned was the importance of balancing aesthetics with functionality—this website ended up being quite resource-intensive, which unfortunately makes it hard for many computers to handle smoothly. It’s a reminder of how critical optimization is in web design, especially for interactive content.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={saga} />
                    <div style={styles.caption}>
                        <p>
                            <sub>
                                <b>Figure 2: </b>  A preview of the old portfolio’s main interface.
                            </sub>
                        </p>
                    </div>
                </div>
                <p>
                To break down the technical side: this portfolio relied on React and Threejs, giving it a dynamic and engaging feel. Unfortunately, the use of these intensive features, without enough optimization, made the website difficult to load on systems without high processing power. This project taught me invaluable lessons about prioritizing usability and performance alongside creative design, and these insights have guided my approach in building my current portfolio. Now, my goal is to deliver an equally engaging experience while ensuring it runs efficiently across devices.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://lopa-old-portfolio.vercel.app/"
                        >
                            <p>
                                <b>[Old Portfolio]</b> - lopa-old-portfolio.vercel.app
                            </p>
                        </a>
                    </li>

                </ul>
                <p>
                    I'm skipping over a lot of details in exchange for brevity,
                    but I do plan on doing a more in depth breakdown for those
                    interested sometime in the future. To get updates with that
                    project feel free to follow me on instagram{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.instagram.com/philopater.essam/"
                    >
                        @philopater.essam
                    </a>
                </p>
            </div>
            <div className="text-block">
                {/* <h2>Stop the Scroll</h2>
                <br />
                <p>
                    While working I spend a lot of time on GitHub
                    issue pages looking for answers and solutions to problems I
                    had run into. I would always find myself sifting though the
                    comments trying to find the right answer, which usually had
                    the most upvotes and positive reactions. With that
                    information, I decided to create a very simple chrome
                    extension that would sift through all the comments on the
                    page, sort them by positive reactions, and then allow you to
                    traverse them from most positive reactions to least positive
                    reactions.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={scroll} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 3:</b> Skip the Scroll in action, finding
                            the highest rated comments and scrolling right to
                            them
                        </sub>
                    </p>
                </div>
                <p>
                    The extension is open source and currently released on the
                    Chrome web store. Skip the Scroll is obviously not a project
                    with massive scope, but was fun to make and dive into the
                    world of browser extensions. I wanted to showcase since it's
                    a developer tool and I wanna give it some visibility for
                    those who might find it useful.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/lopa-ok/Stop-The-Scroll"
                        >
                            <p>
                                <b>[GitHub]</b> - Stop the Scroll Repository
                            </p>
                        </a>
                    </li>

                </ul>
                <p>
                    If you are a developer and have also found yourself
                    scrolling through github comment after github comment saying
                    "i also have this problem...", then I highly recommend you
                    check out Skip the Scroll to save you some of your precious
                    time. If you like it, feel free to star it on GitHub
                </p> 
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
                                <b>Figure 4: </b>  A preview of Tic-Tac-toe Ultimate in action.
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
                
            </div>*/}
            </div>
            
        </div>
    );
};

const styles: StyleSheetCSS = {
    video: {
        width: '100%',
        padding: 12,
    },
    caption: {
        marginBottom: 16,
        
    },
};

export default SoftwareProjects;