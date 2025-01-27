import React, { useRef, useState, useEffect } from 'react';
import Window from '../os/Window';

export interface PaintAppProps extends WindowAppProps {}

const PaintApp: React.FC<PaintAppProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [tool, setTool] = useState('pencil');
    const [color, setColor] = useState('#000000');
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

    const getCanvasCoordinates = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        const gridSize = 20;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');    
        if (!ctx) return;

        setContext(ctx);
        ctx.strokeStyle = color;
        ctx.beginPath();
        const { x, y } = getCanvasCoordinates(e);
        ctx.moveTo(x, y);
        setStartPos({ x, y });
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !context) return;

        const { x, y } = getCanvasCoordinates(e);

        if (tool === 'pencil') {
            context.lineTo(x, y);
            context.stroke();
        } else if (tool === 'eraser') {
            context.clearRect(x, y, 10, 10);
            drawGrid(context);
        }
    };

    const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!context || !startPos) return;

        const { x, y } = getCanvasCoordinates(e);

        if (tool === 'line') {
            context.moveTo(startPos.x, startPos.y);
            context.lineTo(x, y);
            context.stroke();
        } else if (tool === 'rectangle') {
            context.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
        } else if (tool === 'ellipse') {
            context.beginPath();
            context.ellipse(
                (startPos.x + x) / 2,
                (startPos.y + y) / 2,
                Math.abs(x - startPos.x) / 2,
                Math.abs(y - startPos.y) / 2,
                0,
                0,
                2 * Math.PI
            );
            context.stroke();
        }

        context.closePath();
        setIsDrawing(false);
        setStartPos(null);
    };

    const handleToolChange = (selectedTool: string) => {
        setTool(selectedTool);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawGrid(ctx);
    }, []);

    return (
        <Window
            top={50}
            left={50}
            width={800}
            height={650}
            windowTitle="Paint"
            windowBarIcon="folderIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={false}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>Paint</h2>
                    <p>Draw and create your own artwork.</p>
                </div>
                <div style={styles.tools}>
                    <button onClick={() => handleToolChange('pencil')} style={styles.toolButton}>
                        <img src="/icons/pencil.png" alt="Pencil" />
                    </button>
                    <button onClick={() => handleToolChange('eraser')} style={styles.toolButton}>
                        <img src="/icons/eraser.png" alt="Eraser" />
                    </button>
                    <button onClick={() => handleToolChange('line')} style={styles.toolButton}>
                        <img src="/icons/line.png" alt="Line" />
                    </button>
                    <button onClick={() => handleToolChange('rectangle')} style={styles.toolButton}>
                        <img src="/icons/rectangle.png" alt="Rectangle" />
                    </button>
                    <button onClick={() => handleToolChange('ellipse')} style={styles.toolButton}>
                        <img src="/icons/ellipse.png" alt="Ellipse" />
                    </button>
                    <input type="color" value={color} onChange={handleColorChange} style={styles.colorPicker} />
                </div>
                <div style={styles.canvasContainer}>
                    <canvas
                        ref={canvasRef}
                        width={700}
                        height={400}
                        style={styles.canvas}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />
                </div>
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
        backgroundColor: 'white',
    },
    header: {
        flexShrink: 1,
        paddingTop: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tools: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottom: '1px solid black',
    },
    toolButton: {
        marginBottom: 10,
        padding: 5,
        cursor: 'pointer',
        backgroundColor: '#c0c0c0',
        border: '1px solid #808080',
        width: 32,
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    colorPicker: {
        marginTop: 10,
    },
    canvasContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    canvas: {
        border: '1px solid black',
    },
};

export default PaintApp;
