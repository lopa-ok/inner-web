import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface AchievementsProps {}

const Achievements: React.FC<AchievementsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Achievements</h1>
            <h3>Recognitions, Awards, and Milestones</h3>
            <br />
            <p>
                Here are some of the recognitions, awards, and milestones I have achieved over the years. These achievements reflect my dedication, hard work, and passion for technology and innovation.(wip these are just placeholders)
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>Best Software Developer Award</h2>
                        <p style={styles.date}>June 2024</p>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Received the Best Software Developer Award at the annual tech conference for my contributions to open-source projects and innovative solutions in software development.
                </p>
                <br />
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>Hackathon Winner</h2>
                        <p style={styles.date}>March 2023</p>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Won first place in the national hackathon for developing a mobile application that helps users manage their mental health through mindfulness exercises and tracking.
                </p>
                <br />
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>Top 10 in Ebhar Misr Competition</h2>
                        <p style={styles.date}>August 2022</p>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Ranked in the top 10 in the Ebhar Misr competition, showcasing my skills in technology and innovation. The competition was a great platform to demonstrate my abilities and learn from other talented participants.
                </p>
                <br />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 24,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    date: {
        fontStyle: 'italic',
    },
};

export default Achievements;
