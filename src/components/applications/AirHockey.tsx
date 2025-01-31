import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';

type DataType = "puck" | "players" | "teamChange" | "scored" | "gameSettings";

interface BaseData {
  type: DataType;
}

interface PuckData extends BaseData {
  type: "puck";
  puck: Circle;
}

interface RacketsData extends BaseData {
  type: "players";
  players: Player[];
}

interface TeamData extends BaseData {
  type: "teamChange";
  team: string;
}

interface ScoreData extends BaseData {
  type: "scored";
  score: number;
}

interface GameSettingsData extends BaseData {
  type: "gameSettings";
  gameSettings: {
    maxPuckSpeed: number;
    puckRadius: number;
    racketRadius: number;
  };
}

interface Player {
  id: string;
  name: string;
  team: string;
  score: number;
  racket: Circle;
}

type GameData =
  | PuckData
  | RacketsData
  | TeamData
  | ScoreData
  | GameSettingsData;

interface Circle {
  center: Vector;
  velo: Vector;
  rad: number;
}

interface Vector {
  x: number;
  y: number;
}

const TABLE_DIMENSIONS = {
  WIDTH: 1,
  LENGTH: 1.67172813,
  BORDER_SIZE: 0.05339913232,
  GOAL_SIZE: 0.447646738,
  GOAL_HEIGHT: 0.276176631,
};

const defaultGameSettings = {
  puckRadius: 0.03,
  racketRadius: 0.06,
  maxPuckSpeed: 0.04,
};

const Table: Vector[] = [
  { x: TABLE_DIMENSIONS.BORDER_SIZE, y: TABLE_DIMENSIONS.BORDER_SIZE },
  { x: TABLE_DIMENSIONS.BORDER_SIZE, y: TABLE_DIMENSIONS.GOAL_HEIGHT },
  {
    x: TABLE_DIMENSIONS.BORDER_SIZE - 2 * defaultGameSettings.puckRadius,
    y: TABLE_DIMENSIONS.GOAL_HEIGHT,
  },
  {
    x: TABLE_DIMENSIONS.BORDER_SIZE - 2 * defaultGameSettings.puckRadius,
    y: TABLE_DIMENSIONS.GOAL_HEIGHT + TABLE_DIMENSIONS.GOAL_SIZE,
  },
  {
    x: TABLE_DIMENSIONS.BORDER_SIZE,
    y: TABLE_DIMENSIONS.GOAL_HEIGHT + TABLE_DIMENSIONS.GOAL_SIZE,
  },
  {
    x: TABLE_DIMENSIONS.BORDER_SIZE,
    y: TABLE_DIMENSIONS.WIDTH - TABLE_DIMENSIONS.BORDER_SIZE,
  },
  {
    x: TABLE_DIMENSIONS.LENGTH - TABLE_DIMENSIONS.BORDER_SIZE,
    y: TABLE_DIMENSIONS.WIDTH - TABLE_DIMENSIONS.BORDER_SIZE,
  },
  {
    x: TABLE_DIMENSIONS.LENGTH - TABLE_DIMENSIONS.BORDER_SIZE,
    y: TABLE_DIMENSIONS.WIDTH - TABLE_DIMENSIONS.GOAL_HEIGHT,
  },
  {
    x:
      TABLE_DIMENSIONS.LENGTH -
      TABLE_DIMENSIONS.BORDER_SIZE +
      2 * defaultGameSettings.puckRadius,
    y: TABLE_DIMENSIONS.WIDTH - TABLE_DIMENSIONS.GOAL_HEIGHT,
  },
  {
    x:
      TABLE_DIMENSIONS.LENGTH -
      TABLE_DIMENSIONS.BORDER_SIZE +
      2 * defaultGameSettings.puckRadius,
    y: TABLE_DIMENSIONS.GOAL_HEIGHT,
  },
  {
    x: TABLE_DIMENSIONS.LENGTH - TABLE_DIMENSIONS.BORDER_SIZE,
    y: TABLE_DIMENSIONS.GOAL_HEIGHT,
  },
  {
    x: TABLE_DIMENSIONS.LENGTH - TABLE_DIMENSIONS.BORDER_SIZE,
    y: TABLE_DIMENSIONS.BORDER_SIZE,
  },
];

const defaultPlayer = {
  id: "-1",
  team: "red",
  name: "",
  score: 0,
  racket: {
    center: { x: 0.5, y: 0.5 },
    velo: { x: 0, y: 0 },
    rad: defaultGameSettings.racketRadius,
  },
};

const defaultPuck: Circle = {
  center: { x: TABLE_DIMENSIONS.LENGTH / 2, y: TABLE_DIMENSIONS.WIDTH / 2 },
  velo: { x: 0.00000001, y: 0.00000001 },
  rad: defaultGameSettings.puckRadius,
};

interface Props {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

const AirHockey: React.FC<Props> = ({ onInteract, onMinimize, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameSettings, setGameSettings] = useState(defaultGameSettings);
    const [player, setPlayer] = useState<Player>(defaultPlayer);
    const [puck, setPuck] = useState<Circle>(defaultPuck);
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            
            context.fillStyle = '#fff';
            context.beginPath();
            context.arc(player.racket.center.x, player.racket.center.y, player.racket.rad, 0, Math.PI * 2);
            context.fill();

            
            context.beginPath();
            context.arc(puck.center.x, puck.center.y, puck.rad, 0, Math.PI * 2);
            context.fill();

            
            context.font = '20px Arial';
            context.fillText(`Player: ${playerScore}`, 20, 30);
            context.fillText(`AI: ${aiScore}`, canvas.width - 80, 30);

            
            puck.center.x += puck.velo.x;
            puck.center.y += puck.velo.y;

            
            if (puck.center.y - puck.rad <= 0) {
                setPlayerScore(prev => prev + 1);
                resetBall();
            } else if (puck.center.y + puck.rad >= canvas.height) {
                setAiScore(prev => prev + 1);
                resetBall();
            }

            
            if (
                (puck.center.x > player.racket.center.x - player.racket.rad && puck.center.x < player.racket.center.x + player.racket.rad && puck.center.y + puck.rad >= player.racket.center.y - player.racket.rad)
            ) {
                puck.velo.y = -puck.velo.y;
            }

            
            if (puck.center.x - puck.rad <= 0 || puck.center.x + puck.rad >= canvas.width) {
                puck.velo.x = -puck.velo.x;
            }

            requestAnimationFrame(draw);
        };

        const resetBall = () => {
            setPuck({
                ...defaultPuck,
                center: { x: canvas.width / 2, y: canvas.height / 2 },
                velo: { x: -puck.velo.x, y: -puck.velo.y },
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            setPlayer({
                ...player,
                racket: {
                    ...player.racket,
                    center: { x: e.clientX - rect.left, y: e.clientY - rect.top },
                },
            });
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        draw();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [player, puck]);

    const resetGame = () => {
        setPlayerScore(0);
        setAiScore(0);
    };

    return (
        <Window
            top={10}
            left={10}
            width={800}
            height={600}
            windowTitle="Air Hockey"
            windowBarIcon="folderIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Air Hockey</h2>
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
        backgroundColor: '#ffDADA',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    canvas: {
        backgroundColor: '#',
        border: '2px solid #333',
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

export default AirHockey;
