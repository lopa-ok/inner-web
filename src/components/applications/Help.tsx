import React, { useState } from 'react';
import Window from '../os/Window';

export interface HelpProps extends WindowAppProps {}

const Help: React.FC<HelpProps> = (props) => {
    const [currentPage, setCurrentPage] = useState('help');

    const renderContent = () => {
        switch (currentPage) {
            case 'help':
                return (
                    <section>
                        <h1 style={styles.title}>Help</h1>
                        <div style={styles.textContainer}>
                            <ul style={styles.list}>
                                <li>To open an application, double-click its icon on the desktop.</li>
                                <li>To move a window, click and drag its title bar.</li>
                                <li>To resize a window, click and drag its edges or corners.</li>
                                <li>To close a window, click the "X" button in the top-right corner.</li>
                            </ul>
                        </div>
                    </section>
                );
            case 'faq':
                return (
                    <section>
                        <h1 style={styles.title}>Frequently Asked Questions</h1>
                        <div style={styles.textContainer}>
                            <ul style={styles.list}>
                                <li>How do I change the background?</li>
                                <li>How do I add a new application?</li>
                                <li>How do I delete a file?</li>
                            </ul>
                        </div>
                    </section>
                );
            case 'contact':
                return (
                    <section>
                        <h1 style={styles.title}>Contact Support</h1>
                        <div style={styles.textContainer}>
                            <ul style={styles.list}>
                                <li>If you need further assistance, please contact our support team at support@microsoft.com</li>
                            </ul>
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <Window
            top={100}
            left={100}
            width={550}
            height={400}
            windowTitle="Help"
            windowBarIcon="helpIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.sidebar}>
                    <div style={styles.sidebarItem} onClick={() => setCurrentPage('help')}>Help</div>
                    <div style={styles.sidebarItem} onClick={() => setCurrentPage('faq')}>FAQ</div>
                    <div style={styles.sidebarItem} onClick={() => setCurrentPage('contact')}>Contact</div>
                </div>
                <div style={styles.content}>
                    {renderContent()}
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    sidebar: {
        width: '150px',
        backgroundColor: '#d4d0c8',
        borderRight: '1px solid #808080',
        display: 'flex',
        flexDirection: 'column',
    },
    sidebarItem: {
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid #808080',
    },
    content: {
        padding: 20,
        flex: 1,
        overflowY: 'auto',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        display: 'block',
        textDecoration: 'underline',
    },
    textContainer: {
        marginTop: 20,
        marginRight: 50,
        padding: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
    list: {
        fontSize: 16,
        listStyleType: 'disc',
        paddingLeft: 20,
        marginBottom: 20,
    },
};

export default Help;
