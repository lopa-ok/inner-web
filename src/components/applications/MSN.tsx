import React, { useState, useRef, useEffect } from 'react';
import Window from '../os/Window';
import msnIcon from '../../assets/icons/msnIcon.png';

interface ChatMessage {
    id: number;
    name: string;
    chat: string;
    timestamp: string;
}

const MSN: React.FC<WindowAppProps> = ({ onClose, onInteract, onMinimize }) => {
    const [userName, setUserName] = useState('');
    const [chatValue, setChatValue] = useState('');
    const [chatData, setChatData] = useState<ChatMessage[]>(() => {
        const savedMessages = localStorage.getItem('msnChatData');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080');

        ws.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.current.onmessage = (event) => {
            const newMessage: ChatMessage = JSON.parse(event.data);
            setChatData((prevChatData) => {
                const updatedChatData = [...prevChatData, newMessage];
                localStorage.setItem('msnChatData', JSON.stringify(updatedChatData));
                return updatedChatData;
            });
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatData]);

    const handleSendMessage = () => {
        if (chatValue.trim()) {
            const newMessage: ChatMessage = {
                id: Date.now(),
                name: userName || 'Anonymous',
                chat: chatValue,
                timestamp: new Date().toLocaleString(),
            };
            ws.current?.send(JSON.stringify(newMessage));
            setChatValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Window
            top={10}
            left={10}
            width={600}
            height={500}
            windowTitle="MSN"
            windowBarIcon="msnIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div style={styles.msnContainer}>
                <div style={styles.msnHeader}>
                    <img src={msnIcon} alt="MSN Icon" style={styles.msnHeaderIcon} />
                    <h2 style={styles.msnHeaderText}>MSN Messenger</h2>
                </div>
                <div style={styles.msnChatWindow}>
                    {chatData.map((message) => (
                        <div key={message.id} style={styles.msnMessage}>
                            <strong>{message.name}:</strong> {message.chat}
                            <div style={styles.timestamp}>{message.timestamp}</div>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
                <div style={styles.msnInputContainer}>
                    <input
                        type="text"
                        placeholder="Enter your username..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={styles.msnUsernameInput}
                    />
                    <textarea
                        placeholder="Enter your message..."
                        value={chatValue}
                        onChange={(e) => setChatValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={styles.msnTextarea}
                    />
                    <button onClick={handleSendMessage} style={styles.msnSendButton}>Send</button>
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    msnContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '10px',
        backgroundColor: '#c3c3c3',
        border: '2px solid #808080',
        boxShadow: 'inset 1px 1px #ffffff, inset -1px -1px #000000',
    },
    msnHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        backgroundColor: '#000080',
        color: 'white',
        padding: '2px 5px',
        border: '2px solid #808080',
        boxShadow: 'inset 1px 1px #ffffff, inset -1px -1px #000000',
    },
    msnHeaderIcon: {
        width: '32px',
        height: '32px',
        marginRight: '10px',
    },
    msnHeaderText: {
        fontSize: '16px',
        fontFamily: 'Tahoma, sans-serif',
    },
    msnChatWindow: {
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
        backgroundColor: 'white',
        border: '2px solid #808080',
        boxShadow: 'inset 1px 1px #ffffff, inset -1px -1px #000000',
        marginBottom: '10px',
    },
    msnMessage: {
        marginBottom: '10px',
        fontFamily: 'Tahoma, sans-serif',
    },
    timestamp: {
        fontSize: '10px',
        color: '#888',
        marginTop: '5px',
    },
    msnInputContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    msnUsernameInput: {
        marginBottom: '10px',
        padding: '10px',
        border: '2px solid #808080',
        boxShadow: 'inset 1px 1px #ffffff, inset -1px -1px #000000',
        fontFamily: 'Tahoma, sans-serif',
    },
    msnTextarea: {
        marginBottom: '10px',
        padding: '10px',
        border: '2px solid #808080',
        boxShadow: 'inset 1px 1px #ffffff, inset -1px -1px #000000',
        fontFamily: 'Tahoma, sans-serif',
    },
    msnSendButton: {
        padding: '10px',
        backgroundColor: '#c3c3c3',
        color: 'black',
        border: '2px solid #808080',
        boxShadow: '1px 1px #ffffff, -1px -1px #000000',
        cursor: 'pointer',
        fontFamily: 'Tahoma, sans-serif',
    },
    msnSendButtonHover: {
        backgroundColor: '#a3a3a3',
    },
};

export default MSN;
