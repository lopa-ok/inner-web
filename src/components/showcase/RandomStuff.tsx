import React from 'react';
import ResumeDownload from './ResumeDownload';
import igcseChristmasParty from '../../assets/pictures/igcseChristmasParty.png';

export interface RandomStuffProps {}

const RandomStuff: React.FC<RandomStuffProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Random Stuff</h1>
            <h3>& Hobbies</h3>
            <br />
            <p>Here you can find random stuff that happens in my life, all time-stamped.</p>
            <br />
            <ResumeDownload />
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>Added This Page to the Portfolio</h2>
                        <p style={styles.date}>January 24, 2025</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerRight}>
                <div style={styles.textBlock}>
                    <p>On January 24, 2025, I added this "Random Stuff" page to my portfolio. This page is a collection of various events and experiences that I want to share, all time-stamped for easy reference.</p>
                </div>
            </div>
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>McDonald's Franchise Owner Tour</h2>
                        <p style={styles.date}>January 8, 2025</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerRight}>
                <div style={styles.textBlock}>
                    <p>On January 25, the McDonald's franchise owner invited me and my friends inside the McDonald's and gave us a full tour. We got to see the kitchen, the storage areas, and even the management offices. It was a unique experience and we learned a lot about how a McDonald's restaurant operates.</p>
                </div>
            </div>
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>Church Christmas Celebration</h2>
                        <p style={styles.date}>January 6, 2025</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerRight}>
                <div style={styles.textBlock}>
                    <p>On January 6, 2025, I went to church to celebrate Christmas. It was a beautiful and joyous occasion, filled with prayers, hymns, and a sense of community. Celebrating Christmas at church is always a special experience for me.</p>
                </div>
            </div>
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>School Christmas Party</h2>
                        <p style={styles.date}>December 13, 2024</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerRight}>
                <div style={styles.textBlock}>
                    <p>Attended the school Christmas party and had a fantastic time with the entire school community. The event was grand with a lot of activities, performances, and a festive atmosphere. It was a great way to end the year and celebrate with everyone.</p>
                </div>
            </div>
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>IGCSE Christmas Party</h2>
                        <p style={styles.date}>December 12, 2024</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerLeft}>
                <div style={styles.textBlock}>
                    <p>Attended the IGCSE Christmas party and had a great time with friends. Went with my skates as always! The event was filled with festive decorations, music, and delicious food. We played various games and exchanged gifts. It was a memorable day, and I enjoyed every moment of it. The party was a great opportunity to bond with classmates and teachers, and it created lasting memories that I will cherish forever.</p>
                </div>
                {/* <div className="captioned-image" style={styles.imageContainer}>
                    <img src={igcseChristmasParty} style={styles.image} alt="IGCSE Christmas Party" />
                    <br />
                    <p>
                        <sub>
                            <b>Figure 1:</b> Me and my friend <a href="https://www.instagram.com/itsrany_3">Rany</a> while in my skates, obviously
                        </sub>
                    </p>
                </div> */}
            </div>
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>Trip to El Fayoum</h2>
                        <p style={styles.date}>November 21, 2024</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerRight}>
                <div style={styles.textBlock}>
                    <p>Went on a trip to El Fayoum with my friends. We explored the beautiful landscapes, visited historical sites, and enjoyed the local cuisine. It was an amazing experience and a great way to unwind and relax.</p>
                </div>
            </div>
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>My Birthday</h2>
                        <p style={styles.date}>October 3, 2024</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerLeft}>
                <div style={styles.textBlock}>
                    <p>October 3, 2024, was my birthday. I celebrated with my family, and it was a wonderful day filled with joy and happiness. We had a small party at home, and I received some amazing gifts.</p>
                </div>
            </div>
            <br />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h2>Last Day of Exams for Year 10</h2>
                        <p style={styles.date}>June 11, 2024</p>
                    </div>
                </div>
            </div>
            <div className="text-block" style={styles.textBlockContainerLeft}>
                <div style={styles.textBlock}>
                    <p>June 11 was my last day of exams for year 10. It was a relief to finish all the exams and start the summer break. I felt a sense of accomplishment and was excited for the upcoming holidays.</p>
                </div>
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
    textBlockContainerLeft: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    textBlockContainerRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    textBlock: {
        flex: 1,
        marginRight: 16,
    },
    imageContainer: {
        flex: 1,
        textAlign: 'center',
    },
    image: {
        height: 'auto',
        width: '100%',
        maxWidth: 400,
    },
};

export default RandomStuff;
