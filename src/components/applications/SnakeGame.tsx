import React, { useEffect, useRef, useState } from 'react';
import Window from '../os/Window';

export interface SnakeGameProps extends WindowAppProps {}

const SnakeGame: React.FC<SnakeGameProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [powerUp, setPowerUp] = useState<{ x: number; y: number } | null>(null);
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [speed, setSpeed] = useState(100);

    const gridSize = 20;
    const tileSize = 20;

    const getRandomPosition = (): { x: number; y: number } => {
        let position: { x: number; y: number };
        do {
            position = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            };
        } while (snake.some(segment => segment.x === position.x && segment.y === position.y) || (food.x === position.x && food.y === position.y));
        return position;
    };

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        const gridSize = 20;
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;

        for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ctx.canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
            ctx.stroke();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameStarted) setGameStarted(true);

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                case 's':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                case 'a':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                case 'd':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction, gameStarted]);

    useEffect(() => {
        if (gameOver || !gameStarted) return;

        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newSnake = [...prevSnake];
                const head = { ...newSnake[0] };

                switch (direction) {
                    case 'UP':
                        head.y -= 1;
                        break;
                    case 'DOWN':
                        head.y += 1;
                        break;
                    case 'LEFT':
                        head.x -= 1;
                        break;
                    case 'RIGHT':
                        head.x += 1;
                        break;
                }

                newSnake.unshift(head);

                if (head.x === food.x && head.y === food.y) {
                    setFood(getRandomPosition());
                    if (Math.random() < 0.1) {
                        setPowerUp(getRandomPosition());
                    }
                } else {
                    newSnake.pop();
                }

                if (powerUp && head.x === powerUp.x && head.y === powerUp.y) {
                    setSpeed((prevSpeed) => Math.max(prevSpeed - 10, 50));
                    setPowerUp(null);
                }

                if (
                    head.x < 0 ||
                    head.x >= gridSize ||
                    head.y < 0 ||
                    head.y >= gridSize ||
                    newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
                ) {
                    setGameOver(true);
                    return prevSnake;
                }

                return newSnake;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [direction, food, gameOver, gameStarted, speed, powerUp]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        drawGrid(ctx);

        // Draw snake
        ctx.fillStyle = 'green';
        snake.forEach((segment) => {
            ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
        });

        // Draw food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

        // Draw power-up
        if (powerUp) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(powerUp.x * tileSize, powerUp.y * tileSize, tileSize, tileSize);
        }
    }, [snake, food, powerUp]);

    const restartGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(getRandomPosition());
        setPowerUp(null);
        setDirection('RIGHT');
        setGameOver(false);
        setGameStarted(false);
        setSpeed(100);
    };

    return (
        <Window
            top={50}
            left={50}
            width={425}
            height={530}
            windowTitle="Snake Game"
            windowBarIcon="snakeIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Score: {snake.length - 1}</h2>
                </div>
                <canvas ref={canvasRef} width={400} height={400} style={styles.canvas} />
                {gameOver && (
                    <div style={styles.gameOverContainer}>
                        <div style={styles.gameOverContent}>
                            <h2>Game Over</h2>
                            <p>Your score: {snake.length - 1}</p>
                            <div className="site-button" onMouseDown={restartGame} style={styles.restartButton}>
                                Restart Game
                            </div>
                        </div>
                    </div>
                )}
                {!gameStarted && !gameOver && (
                    <div style={styles.startMessageContainer}>
                        <div style={styles.startMessageContent}>
                            <p>Press any arrow key to start the game</p>
                        </div>
                    </div>
                )}
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
    },
    header: {
        flexShrink: 1,
        paddingTop: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    canvas: {
        border: '1px solid black',
    },
    gameOverContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    startMessageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    startMessageContent: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 20,
        border: '2px solid #333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

export default SnakeGame;
