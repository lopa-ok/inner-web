import React, { useState } from 'react';
import Window from '../os/Window';

export interface FindProps extends WindowAppProps {}

const Find: React.FC<FindProps> = (props) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = () => {
        // Mock search results
        setResults([
            'File1.txt',
            'File2.txt',
            'Document1.docx',
            'Image1.png',
        ]);
    };

    return (
        <Window
            top={100}
            left={100}
            width={500}
            height={400}
            windowTitle="Find"
            windowBarIcon="findIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.searchContainer}>
                    <label htmlFor="find-input" style={styles.label}>Find:</label>
                    <input
                        id="find-input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleSearch} style={styles.button}>Search</button>
                </div>
                <div style={styles.resultsContainer}>
                    <h2 style={styles.resultsTitle}>Results:</h2>
                    <ul style={styles.resultsList}>
                        {results.map((result, index) => (
                            <li key={index} style={styles.resultItem}>{result}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        marginRight: 10,
        fontSize: 14,
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 14,
        marginRight: 10,
    },
    button: {
        padding: 8,
        fontSize: 14,
        cursor: 'pointer',
    },
    resultsContainer: {
        flex: 1,
        overflowY: 'auto',
    },
    resultsTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    resultsList: {
        listStyleType: 'none',
        paddingLeft: 0,
    },
    resultItem: {
        fontSize: 14,
        padding: 5,
        borderBottom: '1px solid #ccc',
    },
};

export default Find;
