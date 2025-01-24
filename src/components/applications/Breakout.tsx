import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';

interface Brick {
    x: number;
    y: number;
    status: number;
    color: string;
}

const Breakout: React.FC<{ onInteract: () => void; onMinimize: () => void; onClose: () => void; }> = ({ onInteract, onMinimize, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [score, setScore] = useState(0);
    const [paddleX, setPaddleX] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const paddleHeight = 10;
        const paddleWidth = 50;
        setPaddleX((canvas.width - paddleWidth) / 2);

        const ballRadius = 7;
        let x = canvas.width / 2;
        let y = canvas.height - 20;
        let dx = 2;
        let dy = -2;

        const brickRowCount = 3;
        const brickColumnCount = 5;
        const brickWidth = 50;
        const brickHeight = 15;
        const brickPadding = 10;
        const brickOffsetTop = 20;
        const brickOffsetLeft = 20;

        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33'];

        const bricks: Brick[][] = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[(c + r) % colors.length] };
            }
        }

        const drawBall = () => {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#009FFF';
            ctx.fill();
            ctx.closePath();
        };

        const drawPaddle = () => {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = '#009FFF';
            ctx.fill();
            ctx.closePath();
        };

        const drawBricks = () => {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status === 1) {
                        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = bricks[c][r].color;
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        };

        const collisionDetection = () => {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    const b = bricks[c][r];
                    if (b.status === 1) {
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            setScore((prevScore) => prevScore + 1);
                            if (score + 1 === brickRowCount * brickColumnCount) {
                                setWon(true);
                                setGameOver(true);
                            }
                        }
                    }
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    setGameOver(true);
                }
            }

            x += dx;
            y += dy;

            if (!gameOver) {
                requestAnimationFrame(draw);
            }
        };

        draw();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                setPaddleX((prevPaddleX) => Math.min(prevPaddleX + 7, canvas.width - paddleWidth));
            } else if (e.key === 'ArrowLeft') {
                setPaddleX((prevPaddleX) => Math.max(prevPaddleX - 7, 0));
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameOver, score, paddleX]);

    const restartGame = () => {
        setGameOver(false);
        setWon(false);
        setScore(0);
    };

    return (
        <Window
            top={10}
            left={10}
            width={520}
            height={700}
            windowTitle="Breakout"
            windowBarIcon="folderIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Breakout</h2>
                    <p>Score: {score}</p>
                </div>
                <canvas ref={canvasRef} width={400} height={400} style={styles.canvas}></canvas>
                {gameOver && (
                    <div style={styles.gameOverContainer}>
                        <div style={styles.gameOverContent}>
                            <h2>{won ? 'You win!' : 'Game Over'}</h2>
                            <p>Your score: {score}</p>
                            <div className="site-button" onMouseDown={restartGame} style={styles.restartButton}>
                                Restart Game
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#f4f4f4',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    header: {
        flexShrink: 1,
        paddingTop: 32,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
    },
    canvas: {
        border: '2px solid #333',
        backgroundColor: '#fff',
    },
    gameOverContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    gameOverContent: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 20,
        border: '2px solid #333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    restartButton: {
        marginTop: 20,
    },
};

export default Breakout;
