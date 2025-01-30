import React from 'react';

const RandomStuff: React.FC = () => {
    return (
        <div className="site-page-content">
            <h1>Random Stuff</h1>
            <h3>Its Random ?</h3>
            <br />
            <div className="text-block">
                <p>
                    This is where I document all the random moments in my life whether it's casual hangouts, small wins, or anything that doesn’t quite belong anywhere else. Everything here is time-stamped for memory's sake.
                </p>
                <br /><br />
                <div style={styles.titleContainer}>
                    <h3 style={styles.title}>McDonald's Franchise Tour</h3>
                    <p style={styles.date}>January 8, 2025</p>
                </div>
                <p>
                    The franchise owner gave me and my friends a full tour inside McDonald's. We saw the kitchen, storage, and management areas. It was really interesting to see how everything operates behind the scenes!
                </p>
                <br />
                <div style={styles.titleContainer}>
                    <h3 style={styles.title}>Christmas at Church</h3>
                    <p style={styles.date}>January 6, 2025</p>
                </div>
                <p>
                    Celebrated Christmas at church. It was a peaceful and joyful experience, filled with hymns, prayers, and good company.
                </p>
                <br />
                <div style={styles.titleContainer}>
                    <h3 style={styles.title}>School Christmas Party</h3>
                    <p style={styles.date}>December 13, 2024</p>
                </div>
                <p>
                    Attended the school Christmas party and had a fantastic time with the entire school community. The event was grand with a lot of activities, performances, and a festive atmosphere. It was a great way to end the year and celebrate with everyone.
                </p>
                <br />
                <div style={styles.titleContainer}>
                    <h3 style={styles.title}>IGCSE Christmas Party</h3>
                    <p style={styles.date}>December 12, 2024</p>
                </div>
                <p>
                    Attended the IGCSE Christmas party and had a great time with friends. Went with my skates as always! The event was filled with festive decorations, music, and delicious food. We played various games and exchanged gifts. It was a memorable day, and I enjoyed every moment of it. The party was a great opportunity to bond with classmates and teachers, and it created lasting memories that I will cherish forever.
                </p>
                <br />
                <div style={styles.titleContainer}>
                    <h3 style={styles.title}>Trip to El Fayoum</h3>
                    <p style={styles.date}>November 21, 2024</p>
                </div>
                <p>
                    Went on a trip to El Fayoum with my friends. We explored the beautiful landscapes, visited historical sites, and enjoyed the local cuisine. It was an amazing experience and a great way to unwind and relax.
                </p>
                <br />
                <div style={styles.titleContainer}>
                    <h3 style={styles.title}>My Birthday</h3>
                    <p style={styles.date}>October 3, 2024</p>
                </div>
                <p>
                    October 3, 2024, was my birthday. I celebrated with my family, and it was a wonderful day filled with joy and happiness. We had a small party at home, and I received some amazing gifts.
                </p>
                <br />
                <div style={styles.titleContainer}>
                    <h3 style={styles.title}>Last Day of Exams for Year 10</h3>
                    <p style={styles.date}>June 11, 2024</p>
                </div>
                <p>
                    June 11 was my last day of exams for year 10. It was a relief to finish all the exams and start the summer break. I felt a sense of accomplishment and was excited for the upcoming holidays.
                </p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        margin: 0,
    },
    date: {
        margin: '4px 0 16px 0',
        fontStyle: 'italic',
        color: '#666',
    },
};

export default RandomStuff;
