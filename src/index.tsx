import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { WebSocketServer } from 'ws';
// import http from 'http';

// const server = http.createServer();
// const wss = new WebSocketServer({ server });

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     // Broadcast message to all clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === ws.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

// server.listen(8080, () => {
//   console.log('Server is listening on port 8080');
// });

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
