import React from 'react';
import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        // add on resize listener
        <div className="site-page-content">
            {/* <img src={me} style={styles.topImage} alt="" /> */}
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>I'm Philopater Essam</h3>
            <br />
            <div className="text-block">
                <p>
                I'm Philopater, also known as Lopa I am currently a high school student.
                <br />
                I'll be graduating in 2026, and I aspire to pursue a career in a computer-related field.


                <br/>
                </p>
                <p>
                If you're curious about my nickname, "Lopa" comes from the middle four letters of my name.
                </p>
                <br />
                <p>
                    Thank you for taking the time to check out my portfolio. I
                    really hope you enjoy exploring it as much as I enjoyed
                    building it. If you have any questions or comments, feel
                    free to contact me using{' '}
                    <Link to="/contact">this form</Link> or shoot me an email at{' '}
                    <a href="mailto:lopa@programmer.net">
                    lopa@programmer.net
                    </a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>About Me</h3>
                <br />
                <p>
                    From a young age, I have had a curiosity about how things
                    worked. This naturally led me to become absolutely obsessed
                    with Lego and I fell in love with building things. In
                    pre-school, I joined the Lego Robotics team at my
                    local church, which was my first real exposure to
                    programming.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={me} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Figure 1:</b> kiddo lopa
                        </sub>
                    </p>
                </div>

                <p>
                    I started programming more seriously at the end of elementry school,
                    initially learning how to scrape and interact with websites.
                    I went on to do a ton of passion projects. 
                    I worked on many projects including Robots, chatbots,
                    multiple game projects, apps, and more. Some of these
                    projects are viewable on my{' '}
                    <Link to="/projects/software">Software Projects</Link> and <Link to="/projects/robotics">Robotics Projects</Link>   page.
                </p>
                <br />
                <p>
                Back in 2015, My parents enrolled me into my very first programming course.
                Initially, there was some hesitation from the institution due to my age;
                I was four years younger than thier Acceptance. 
                However, my father convinced and they agreed to take me in. 
                It wasn't long before I became deeply engrossed in the world of computers and electronics, 
                eventually finding myself drawn to the exciting realm of robotics and programming.
                The course introduced me to my first ever programming Language which was C++
                </p>
                <br />
                <br />
                <div style={{}}>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'justify',
                            alignSelf: 'center',
                            flexDirection: 'column',
                        }}
                    >

                        <h3>My Studies</h3>
                        <p>
                        I am an IGCSE student at Alkarma International School. 
                        Throughout my time here, I have actively participated in numerous {' '}
                            <Link to="/Experience">Competitions</Link>{' '} showcasing my skills and dedication.
                        I have completed five O-levels in English, Mathematics, Computer Science, ICT, and Chemistry.
                        In the upcoming November session, I will be taking AS Mathematics to further enhance my academic portfolio.
                        <br/>
                        <b>Edit:</b> Im done with AS Mathematics Now, and Currently Taking A2 Mathmatics and physics (and one more subject that i still yet to figure out)
                        <br/>
                        <b>Edit 2:</b> Change in plans im taking Physics, Accounting and Enviromental Mangement
                        </p>
                        
                        <br />
                        <h3>My Hobbies</h3>
                        <br />
                        <p>
                            I have a lot of hobbies that I enjoy doing in my free time.
                            The more tangible hobbies I have are{' '}
                            <Link to="/projects/robotics">Robotics</Link>{' '}
                            and creating{' '}
                            <Link to="/projects/art">Digital Art</Link>. You can
                            read more about each of these on their respective
                            pages under my projects tab. Some other hobbies I
                            enjoy are Modelling, and (unsurprisingly)
                            playing video games.
                        </p>
                        <br />
                        
                    </div>
                    <div style={styles.verticalImage}>
                        <img src={meNow} style={styles.image} alt="" />
                        <p>
                            <sub>
                                <b>Figure 2:</b> Me, December 2023
                            </sub>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <p>
                    Thanks for reading about me! I hope that you enjoy exploring
                    the rest of my portfolio website and everything it has to
                    offer. If you find an easter egg make sure to let me know
                    on instagram{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.instagram.com/philopater.essam/"
                    >
                        @philopater.essam
                    </a>{' '}
                    Good luck and have fun!
                </p>
                <br />
                <p>
                    If you have any questions or comments I would love to hear
                    them. You can reach me through the{' '}
                    <Link to="/contact">contact page</Link> or shoot me an email
                    at{' '}
                    <a href="mailto:lopa@programmer.net">
                    lopa@programmer.net
                    </a>
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        // width: '80%',
        marginLeft: 32,
        flex: 0.8,

        alignItems: 'center',
        // marginBottom: 32,
        textAlign: 'center',
        flexDirection: 'column',
    },
};

export default About;
