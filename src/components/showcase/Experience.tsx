import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Experience</h1>
            <h3>Software Development, Hackathons, and Competitions</h3>
            <br />
            <p>
                Below are some of my work experiences, hackathons, and achievements in competitions. I have had the opportunity to work with leading companies like Brilliant and Apple, participate in global communities like Hack Club, and compete in prestigious competitions such as Ebhar Misr.
            </p>
            <br />
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Brilliant</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://brilliant.org/home/'}
                        >
                            <h4>https://brilliant.org</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Software Developer Intern</h3>
                        <b>
                            <p>Summer 2024 - Present</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    During my internship at Brilliant, I have had the opportunity to work on innovative educational technologies and collaborate with a talented team. I have contributed to various projects, including developing new features for Brilliant's learning platform and optimizing existing systems for better performance.
                </p>
                <br />
                <ul style={styles.experienceList}>
                    
                </ul>
                <br />
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Hack Club</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://hackclub.com'}
                        >
                            <h4>https://hackclub.com</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Member</h3>
                        <b>
                            <p>Summer 2024</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Hack Club is a global community of high school coders and creators, designed to empower students to build real-world projects, collaborate,
                    and learn together. Whether you're a beginner or experienced developer, Hack Club provides an open space for exploring technology, developing coding skills,
                    and making meaningful connections with peers. 
                    With access to workshops, resources, and events like hackathons, Hack Club encourages students to turn their ideas into reality and share them with the world.
                    As a proud Hack Club member,
                    I’m excited to contribute to this vibrant community and help foster a culture of creativity and innovation in coding.
                </p>
                <br />
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Apple</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://apple.com'}
                        >
                            <h4>https://apple.com</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Software Developer Intern</h3>
                        <b>
                            <p>Fall 2022 - Summer 2023</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    My time as a Software Developer at Apple, though brief, was an incredible learning experience.
                    I got the opportunity to work alongside talented engineers and contribute to real-world projects, even on a small scale. 
                    From debugging to implementing minor features, 
                    I gained a deeper understanding of how large-scale software development works and how Apple delivers such polished products. 
                    While my role was limited, 
                    the experience gave me insight into cutting-edge technology and inspired me to keep growing as a developer.
                </p>
                <br />
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Ebhar Misr</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://ebharmisr.com/en/home/'}
                        >
                            <h4>https://ebharmisr.com</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Competition</h3>
                        <b>
                            <p>Summer 2022</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Targeted towards Teens with diverse interests in music, art, science, technology, and singing.
                    Each year, 20 participants are chosen to attend a camp that enhances their soft skills.
                    Additionally, you'll have the opportunity to tour prestigious Egyptian universities.
                </p>
                <br />
                <ul style={styles.experienceList}>
                    <li>
                        Architected and engineered the vertical scrolling
                        discover player which, at its daily peak, was
                        responsible for generating over 600,000 views across
                        20,000 active users.
                    </li>
                    <li>
                        Designed and implemented multiple features to
                        increase app usability and user experience while
                        ensuring the quality, maintainability and
                        scalability of the front end as the user base grew
                        by over 50,000.
                    </li>
                    <li>
                        Coordinated major refactors targeted towards app
                        optimization and performance resulting in a smoother
                        user experience and accomplished by eliminating
                        redundant re-renders and API calls by over 50%.
                    </li>
                    <li>
                        Directed and executed an internal migration of 3
                        individual repositories to a single monorepo,
                        greatly reducing overhead for developing new
                        features, fixing bugs, and managing dependencies.
                    </li>
                    <li>
                        Rebuilt the website with React and shared mobile app
                        components allowing users to access a wide variety
                        of app interactions entirely on the web, resulting
                        in over 700,000 total site visits.
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    experienceList: {
        fontFamily: 'inherit', 
        fontSize: 'inherit',  
        lineHeight: 'inherit',
        color: 'inherit',
    },
};

export default Experience;