import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import cheese from '../../assets/pictures/Scary.gif';
import { useLocation, useNavigate } from 'react-router';


export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = (props) => {
    const location = useLocation();
    const [projectsExpanded, setProjectsExpanded] = useState(false);
    const [isHome, setIsHome] = useState(false);

    const navigate = useNavigate();
    const goToContact = () => {
        navigate('/contact');
    };

    useEffect(() => {
        if (location.pathname.includes('/projects')) {
            setProjectsExpanded(true);
        } else {
            setProjectsExpanded(false);
        }
        if (location.pathname === '/') {
            setIsHome(true);
        } else {
            setIsHome(false);
        }
        return () => {};
    }, [location.pathname]);

    return !isHome ? (
        <div style={styles.navbar}>
            <div style={styles.header}>
                <h1 style={styles.headerText}>Philopater</h1>
                <h1 style={styles.headerText}>Essam's</h1>
                <h3 style={styles.headerShowcase}>Diary</h3>
            </div>
            <div style={styles.links}>
                <Link 
                    containerStyle={styles.link} 
                    to="" 
                    text="HOME" 
                />
                <Link 
                    containerStyle={styles.link} 
                    to="about" 
                    text="ABOUT" 
                />
                <Link 
                    containerStyle={styles.link} 
                    to="school-life" 
                    text="SCHOOL LIFE" 
                />
                <Link 
                    containerStyle={styles.link} 
                    to="how-it-started" 
                    text="HOW IT STARTED" 
                />
                <Link 
                    containerStyle={styles.link} 
                    to="my-thoughts" 
                    text="MY THOUGHTS" 
                />
                <Link
                    containerStyle={styles.link}
                    to="random-stuff"
                    text="RANDOM STUFF"
                />
                
            </div>
            <div style={styles.spacer} />
            <div style={styles.cheeseContainer} onMouseDown={goToContact}>
                <img src={cheese} style={styles.image} alt="" /> 
            </div>
        </div>
    ) : (
        <></>
    );
};

const styles: StyleSheetCSS = {
    navbar: {
        width: 300,
        height: '100%',
        flexDirection: 'column',
        padding: '70px 24px',
        boxSizing: 'border-box',
        position: 'fixed',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'column',
        marginBottom: 64,
        alignItems: 'flex-start',
        paddingLeft: 0,
    },
    headerText: {
        fontSize: 38,
        lineHeight: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginLeft: 0,
    },
    headerShowcase: {
        marginTop: 12,
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginLeft: 0,
    },
    logo: {
        width: '100%',
        marginBottom: 8,
    },
    link: {
        marginBottom: 32,
        alignSelf: 'left',
        marginLeft: 16,
    },
    expandedLink: {
        marginBottom: 16,
    },
    insetLinks: {
        flexDirection: 'column',
        marginLeft: 32,
        marginBottom: 16,
    },
    insetLink: {
        marginBottom: 8,
    },
    links: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        marginLeft: 29,
    },
    image: {
        width: '80%',
    },
    spacer: {
        flex: 1,
    },
    cheeseContainer: {
        cursor: 'pointer',
        width: '100%',
    },
};

export default VerticalNavbar;
