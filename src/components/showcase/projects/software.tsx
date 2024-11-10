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
                Below are some of my favorite Web development projects I have worked on
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
                    pretty much done!
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
                This is my previous portfolio, 
                It was built using React and JS , with a focus on showcasing interactive and visually intensive content. 
                One lesson I learned from creating it was balancing performance with design complexity—this version is quite resource-intensive, 
                making it hard to run smoothly on most computers. It's been a great learning experience that has helped me refine my approach in my current portfolio
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={saga} />
                    <div style={styles.caption}>
                        <p>
                            <sub>
                                <b>Figure 2: </b> The Old Portfolio
                            </sub>
                        </p>
                    </div>
                </div>
                <p>
                    Reloaded Rampart was a really fun project to work on and
                    had a multitude of challenges. An interesting challenge that
                    you may not even notice was the rotation of objects such as
                    the players weapon. Rotating pixel art is a very difficult
                    thing to do because in the world of pixels you are dealing
                    with such a little amount of information. Even a single
                    misplaced pixel can cause a sprite to read in a totally
                    different and unintended way. To deal with this we developed
                    an algorithm to prioritize outlines, while rotating the
                    insides with a simple Nearest Neighbor algorithm. Doing so
                    resulted in a relatively readable sprite when rotating
                    sprites. It was a surprisingly difficult challenge as it
                    intersected both art and programming, but was fun to work on
                    overall.
                </p>
                <br />
                
                <p>
                    Unfortunately, the game currently is not in a releasable
                    state and so there is no demo available online. If this ever
                    changes, however, a link to the game will be added here.
                </p>
            </div>
            <div className="text-block">
                <h2>Stop the Scroll</h2>
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
            </div>
            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    video: {
        width: '100%',
        padding: 12,
    },
    caption: {
        width: '80%',
    },
};

export default SoftwareProjects;
