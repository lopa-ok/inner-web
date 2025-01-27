import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';

export interface MSDOSProps extends WindowAppProps {}

const MSDOS: React.FC<MSDOSProps> = (props) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const [currentDirectory, setCurrentDirectory] = useState('C:\\');
    const [directories, setDirectories] = useState<{ [key: string]: string[] }>({
        'C:\\': ['WINDOWS', 'Program Files', 'Users', 'Documents', 'Games'],
    });
    const outputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = inputRef.current?.innerText || '';
            setOutput((prevOutput) => [...prevOutput, `${currentDirectory}> ${command}`, ...wrapText(executeCommand(command))]);
            setInput('');
            if (inputRef.current) {
                inputRef.current.innerText = '';
            }
        } else {
            setInput(inputRef.current?.innerText || '');
        }
    };

    const wrapText = (text: string): string[] => {
        const maxLength = 58;
        const lines = [];
        let currentLine = '';

        text.split(' ').forEach(word => {
            if (currentLine.length + word.length + 1 > maxLength) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine += (currentLine.length ? ' ' : '') + word;
            }
        });

        if (currentLine.length) {
            lines.push(currentLine);
        }

        return lines;
    };

    const executeCommand = (command: string): string => {
        const [cmd, ...args] = command.split(' ');
        switch (cmd.toLowerCase()) {
            case 'dir':
                return `Volume in drive C has no label.\nDirectory of ${currentDirectory}\n\n${directories[currentDirectory].map(dir => `<DIR>       ${dir}`).join('\n')}\n`;
            case 'cls':
                setOutput([]);
                return '';
            case 'help':
                return 'Supported commands: dir, cls, help, echo, date, time, cd, mkdir';
            case 'echo':
                return args.join(' ');
            case 'date':
                return new Date().toLocaleDateString();
            case 'time':
                return new Date().toLocaleTimeString();
            case 'cd':
                if (args.length === 0) {
                    return 'The system cannot find the path specified.';
                }
                const newDir = args.join(' ');
                if (directories[currentDirectory]?.includes(newDir)) {
                    setCurrentDirectory(`${currentDirectory}${newDir}\\`);
                    return '';
                } else {
                    return 'The system cannot find the path specified.';
                }
            case 'mkdir':
                if (args.length === 0) {
                    return 'A subdirectory or file must be specified.';
                }
                const newFolder = args.join(' ');
                setDirectories(prev => {
                    const updatedDirectories = { ...prev };
                    if (!updatedDirectories[currentDirectory]) {
                        updatedDirectories[currentDirectory] = [];
                    }
                    updatedDirectories[currentDirectory].push(newFolder);
                    return updatedDirectories;
                });
                return '';
            default:
                return `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
        }
    };

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <Window
            top={50}
            left={50}
            width={600}
            height={400}
            windowTitle="MS-DOS"
            windowBarIcon="folderIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.output} ref={outputRef}>
                    {output.map((line, index) => (
                        <pre key={index} style={styles.line}>{line}</pre>
                    ))}
                    <div style={styles.inputLine}>
                        <span style={styles.prompt}>{currentDirectory}&gt;</span>
                        <div
                            ref={inputRef}
                            contentEditable
                            onKeyDown={handleInputChange}
                            style={styles.input}
                        />
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Consolas, "Courier New", monospace', 
        padding: 10,
        overflow: 'hidden',
    },
    output: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        whiteSpace: 'pre-wrap', 
        wordWrap: 'break-word', 
    },
    line: {
        margin: 0,
        fontFamily: 'Consolas, "Courier New", monospace', 
        fontSize: '14px',
        letterSpacing: '0.5px', 
        wordBreak: 'break-word', 
    },
    inputLine: {
        display: 'flex',
        alignItems: 'center',
    },
    prompt: {
        fontFamily: 'Consolas, "Courier New", monospace', 
        fontSize: '14px',
        letterSpacing: '0.5px', 
    },
    input: {
        backgroundColor: 'transparent', 
        color: 'white',
        border: 'none',
        outline: 'none',
        fontFamily: 'Consolas, "Courier New", monospace', 
        fontSize: '14px',
        letterSpacing: '0.5px', 
        flex: 1,
        caretColor: 'white', 
        wordBreak: 'break-word', 
    },
};

export default MSDOS;
