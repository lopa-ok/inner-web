import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';

interface Props {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

const Pong: React.FC<Props> = ({ onInteract, onMinimize, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const paddleWidth = 10;
        const paddleHeight = 100;
        const ballSize = 10;
        let playerY = canvas.height / 2 - paddleHeight / 2;
        let aiY = canvas.height / 2 - paddleHeight / 2;
        let ballX = canvas.width / 2 - ballSize / 2;
        let ballY = canvas.height / 2 - ballSize / 2;
        let ballSpeedX = 4;
        let ballSpeedY = 4;

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#fff';
            context.fillRect(0, playerY, paddleWidth, paddleHeight);
            context.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

            context.fillRect(ballX, ballY, ballSize, ballSize);

            context.font = '20px Arial';
            context.fillText(`You: ${playerScore}`, 20, 30);
            context.fillText(`AI: ${aiScore}`, canvas.width - 80, 30);

            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballY <= 0 || ballY + ballSize >= canvas.height) {
                ballSpeedY = -ballSpeedY;
            }

            if (
                (ballX <= paddleWidth && ballY + ballSize >= playerY && ballY <= playerY + paddleHeight) ||
                (ballX + ballSize >= canvas.width - paddleWidth && ballY + ballSize >= aiY && ballY <= aiY + paddleHeight)
            ) {
                ballSpeedX = -ballSpeedX;
            }

            if (ballX <= 0) {
                setAiScore(prev => prev + 1);
                resetBall();
            } else if (ballX + ballSize >= canvas.width) {
                setPlayerScore(prev => prev + 1);
                resetBall();
            }

            if (aiY + paddleHeight / 2 < ballY) {
                aiY += 2;
            } else {
                aiY -= 2;
            }

            requestAnimationFrame(draw);
        };

        const resetBall = () => {
            ballX = canvas.width / 2 - ballSize / 2;
            ballY = canvas.height / 2 - ballSize / 2;
            ballSpeedX = -ballSpeedX;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            playerY = e.clientY - rect.top - paddleHeight / 2;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        draw();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [playerScore, aiScore]);

    const resetGame = () => {
        setPlayerScore(0);
        setAiScore(0);
    };

    return (
        <Window
            top={10}
            left={10}
            width={870}
            height={750}
            windowTitle="Pong"
            windowBarIcon="folderIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Pong</h2>
                </div>
                <canvas ref={canvasRef} width={800} height={500} style={styles.canvas} />
                <div className="site-button" onClick={resetGame} style={styles.resetButton}>
                    Reset Game
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    canvas: {
        backgroundColor: '#000',
        border: '2px solid #fff',
    },
    resetButton: {
        marginTop: 20,
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
};

export default Pong;