import React from 'react';
import { Link } from '../general';
import { useNavigate } from 'react-router';
import cheese from '../../assets/pictures/cheese.gif';
import flying from '../../assets/pictures/flying.gif';
// import scary from '../../assets/pictures/Scary.gif';
import creep from '../../assets/pictures/creep.gif';

interface GifConfig {
    src: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width: number;
    rotation?: number;
}

const gifConfigs: GifConfig[] = [
    {
        src: flying,
        bottom: '0%',
        left: '25%',
        width: 350,
        rotation: 0,
    },
    {
        src: cheese,
        top: '60%',
        left: '70%',
        width: 450,
        rotation: 5,
    },
    // {
    //     src: scary,
    //     top: '20%',
    //     left: '10%',
    //     width: 100,
    //     rotation: 0,
    // },
    {
        src: creep,
        top: '0%',
        right: '5%',
        width: 200,
        rotation: 0,
    },
];

export interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const navigate = useNavigate();

    const goToContact = () => {
        navigate('/contact');
    };

    return (
        <div style={styles.page} className="diary-content">
            <div style={styles.header} className="site-page-content">
                <h1 style={styles.name}>Philopater Essam's Diary</h1>
                <div style={{ height: 24 }}></div>
                <h3>Where you can find what's going on with my life</h3>
                <div style={styles.buttons}>
                    <Link containerStyle={styles.link} to="about" text="ABOUT" />
                    <Link containerStyle={styles.link} to="school-life" text="SCHOOL LIFE" />
                    <Link containerStyle={styles.link} to="how-it-started" text="HOW IT STARTED" />
                    <Link containerStyle={styles.link} to="my-thoughts" text="MY THOUGHTS" />
                    <Link containerStyle={styles.link} to="random-stuff" text="RANDOM STUFF" />
                </div>
            </div>
            <div style={styles.gifsContainer}>
                {gifConfigs.map((gif, index) => (
                    <div
                        key={index}
                        className="gif-wrapper"
                        style={{
                            ...styles.gifWrapper,
                            position: 'fixed',
                            top: gif.top,
                            left: gif.left,
                            right: gif.right,
                            bottom: gif.bottom,
                            width: gif.width,
                            transform: `rotate(${gif.rotation || 0}deg)`,
                        }}
                    >
                        <img src={gif.src} style={styles.image} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    page: {
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        marginBottom: 64,
        marginTop: 64,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    buttons: {
        justifyContent: 'space-between',
    },
    link: {
        padding: 16,
    },
    name: {
        fontSize: 72,
        marginBottom: 16,
        lineHeight: 0.9,
    },
    gifsContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
    gifWrapper: {
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        pointerEvents: 'auto',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
};

export default Home;