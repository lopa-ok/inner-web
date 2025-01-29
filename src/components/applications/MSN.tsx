import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
import Window from '../os/Window';

interface MSNProps {
  onClose: () => void;
  onInteract: () => void;
  onMinimize: () => void;
}

const MSN: React.FC<MSNProps> = (props) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && input) {
      ws.current.send(input);
      setInput('');
    }
  };

  return (
    <Window
      top={50}
      left={50}
      width={600}
      height={400}
      windowBarIcon="msnIcon"
      windowTitle="MSN Messenger"
      closeWindow={props.onClose}
      onInteract={props.onInteract}
      minimizeWindow={props.onMinimize}
    >
      <div style={styles.container}>
        <div style={styles.header}>
          <h2>MSN Messenger</h2>
        </div>
        <div style={styles.chatContainer}>
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div key={index} style={styles.message}>
                {msg}
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
};

const styles: StyleSheetCSS = {
  container: {
    flex: 1,
    flexDirection: 'column',
    overflowY: 'scroll',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    flexShrink: 1,
    paddingBottom: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: 16,
  },
  message: {
    padding: 8,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  sendButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#0078d4',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default MSN;
