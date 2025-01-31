import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';

interface Props {
    onInteract: () => void;
    onMinimize: () => void;
    onClose: () => void;
}

type Piece = {
    isKing: boolean;
    isRed: boolean;
} | null;

type Position = {
    row: number;
    col: number;
};

const BOARD_SIZE = 8;

const Checkers: React.FC<Props> = ({ onInteract, onMinimize, onClose }) => {
    const [board, setBoard] = useState<(Piece | null)[][]>(initializeBoard());
    const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
    const [isRedTurn, setIsRedTurn] = useState(false);
    const [validMoves, setValidMoves] = useState<Position[]>([]);
    const [redScore, setRedScore] = useState(0);
    const [blackScore, setBlackScore] = useState(0);

    useEffect(() => {
        if (isRedTurn) {
            const timer = setTimeout(() => {
                makeAIMove();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isRedTurn, board]);

    function initializeBoard(): (Piece | null)[][] {
        const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if ((row + col) % 2 === 1) {
                    board[row][col] = { isKing: false, isRed: true };
                }
            }
        }

        for (let row = BOARD_SIZE - 3; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if ((row + col) % 2 === 1) {
                    board[row][col] = { isKing: false, isRed: false };
                }
            }
        }

        return board;
    }

    function getValidMoves(position: Position): Position[] {
        const piece = board[position.row][position.col];
        if (!piece) return [];

        const moves: Position[] = [];
        const directions = piece.isKing ? [-1, 1] : [piece.isRed ? 1 : -1];

        for (const rowDir of directions) {
            for (const colDir of [-1, 1]) {
                const newRow = position.row + rowDir;
                const newCol = position.col + colDir;
                if (isValidPosition(newRow, newCol) && !board[newRow][newCol]) {
                    moves.push({ row: newRow, col: newCol });
                }

                const jumpRow = position.row + rowDir * 2;
                const jumpCol = position.col + colDir * 2;
                if (
                    isValidPosition(jumpRow, jumpCol) &&
                    !board[jumpRow][jumpCol] &&
                    board[newRow][newCol] &&
                    board[newRow][newCol]?.isRed !== piece.isRed
                ) {
                    moves.push({ row: jumpRow, col: jumpCol });
                }
            }
        }

        return moves;
    }

    function isValidPosition(row: number, col: number): boolean {
        return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
    }

    function handleSquareClick(row: number, col: number) {
        if (!selectedPiece) {
            const piece = board[row][col];
            if (piece && piece.isRed === isRedTurn && !piece.isRed) {
                setSelectedPiece({ row, col });
                setValidMoves(getValidMoves({ row, col }));
            }
        } else {
            const isValidMove = validMoves.some(move => move.row === row && move.col === col);
            if (isValidMove) {
                movePiece(selectedPiece, { row, col });
            }
            setSelectedPiece(null);
            setValidMoves([]);
        }
    }

    function movePiece(from: Position, to: Position) {
        const newBoard = board.map(row => [...row]);
        const piece = newBoard[from.row][from.col];
        if (!piece) return;

        if (to.row === 0 && !piece.isRed || to.row === BOARD_SIZE - 1 && piece.isRed) {
            piece.isKing = true;
        }

        if (Math.abs(to.row - from.row) === 2) {
            const capturedRow = (from.row + to.row) / 2;
            const capturedCol = (from.col + to.col) / 2;
            newBoard[capturedRow][capturedCol] = null;
            if (piece.isRed) {
                setRedScore(prev => prev + 1);
            } else {
                setBlackScore(prev => prev + 1);
            }
        }

        newBoard[to.row][to.col] = piece;
        newBoard[from.row][from.col] = null;

        let hasValidMoves = false;
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const piece = newBoard[row][col];
                if (piece && piece.isRed === !isRedTurn) {
                    const moves = getValidMoves({ row, col });
                    if (moves.length > 0) {
                        hasValidMoves = true;
                        break;
                    }
                }
            }
            if (hasValidMoves) break;
        }

        if (!hasValidMoves) {
            setTimeout(() => {
                alert(`Game Over! ${isRedTurn ? 'Red' : 'Black'} wins!`);
                resetGame();
            }, 100);
        }

        setBoard(newBoard);
        setIsRedTurn(!isRedTurn);
    }

    function makeAIMove() {
        const possibleMoves: { from: Position, to: Position, score: number }[] = [];
        
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const piece = board[row][col];
                if (piece && piece.isRed) {
                    const moves = getValidMoves({ row, col });
                    moves.forEach(move => {
                        const newBoard = board.map(row => [...row]);
                        const testPiece = { ...piece };
                        
                        if (move.row === 0) testPiece.isKing = true;
                        newBoard[move.row][move.col] = testPiece;
                        newBoard[row][col] = null;

                        let captureScore = 0;
                        if (Math.abs(move.row - row) === 2) {
                            const capturedRow = (row + move.row) / 2;
                            const capturedCol = (col + move.col) / 2;
                            newBoard[capturedRow][capturedCol] = null;
                            captureScore = 10;
                        }

                        let score = evaluateMove({
                            from: { row, col },
                            to: move,
                            piece: testPiece,
                            board: newBoard,
                            captureScore
                        });

                        possibleMoves.push({
                            from: { row, col },
                            to: move,
                            score
                        });
                    });
                }
            }
        }

        if (possibleMoves.length > 0) {
            possibleMoves.sort((a, b) => b.score - a.score);
            const bestMove = possibleMoves[0];
            movePiece(bestMove.from, bestMove.to);
        }
    }

    function evaluateMove({ from, to, piece, board, captureScore }: {
        from: Position;
        to: Position;
        piece: Piece;
        board: (Piece | null)[][];
        captureScore: number;
    }): number {
        let score = captureScore;

        if (piece?.isKing) score += 5;

        if (!piece?.isKing && piece?.isRed && to.row === BOARD_SIZE - 1) score += 8;

        if (isProtected(to, board)) score += 3;

        const centerDistance = Math.abs(3.5 - to.col);
        score += (4 - centerDistance) * 0.5;

        if (!piece?.isKing) {
            const advanceScore = piece?.isRed ? to.row - from.row : from.row - to.row;
            score += advanceScore * 0.3;
        }

        if (canBeCaptured(to, board)) score -= 7;

        return score;
    }

    function isProtected(pos: Position, board: (Piece | null)[][]): boolean {
        const directions = [
            { row: -1, col: -1 }, { row: -1, col: 1 },
            { row: 1, col: -1 }, { row: 1, col: 1 }
        ];

        return directions.some(dir => {
            const newRow = pos.row + dir.row;
            const newCol = pos.col + dir.col;
            if (isValidPosition(newRow, newCol)) {
                const piece = board[newRow][newCol];
                return piece && piece.isRed;
            }
            return false;
        });
    }

    function canBeCaptured(pos: Position, board: (Piece | null)[][]): boolean {
        const directions = [
            { row: -1, col: -1 }, { row: -1, col: 1 },
            { row: 1, col: -1 }, { row: 1, col: 1 }
        ];

        return directions.some(dir => {
            const adjacentRow = pos.row + dir.row;
            const adjacentCol = pos.col + dir.col;
            const jumpRow = pos.row + dir.row * 2;
            const jumpCol = pos.col + dir.col * 2;

            if (isValidPosition(adjacentRow, adjacentCol) && isValidPosition(jumpRow, jumpCol)) {
                const adjacentPiece = board[adjacentRow][adjacentCol];
                return adjacentPiece && 
                       !adjacentPiece.isRed && 
                       !board[jumpRow][jumpCol];
            }
            return false;
        });
    }

    function resetGame() {
        setBoard(initializeBoard());
        setSelectedPiece(null);
        setValidMoves([]);
        setIsRedTurn(false);
        setRedScore(0);
        setBlackScore(0);
    }

    return (
        <Window
            top={10}
            left={10}
            width={600}
            height={700}
            windowTitle="Checkers"
            windowBarIcon="checkersIcon"
            windowBarColor="#757579"
            closeWindow={onClose}
            onInteract={onInteract}
            minimizeWindow={onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={{ color: '#231F20' }}>Checkers</h2>
                </div>
                <div style={styles.board}>
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} style={styles.row}>
                            {row.map((piece, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    style={{
                                        ...styles.square,
                                        backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#939598' : '#231F20',
                                    }}
                                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                                >
                                    <div style={{
                                        ...styles.squareOverlay,
                                        boxShadow: selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex
                                            ? 'inset 0 0 0 4px #FFDC01'
                                            : validMoves.some(move => move.row === rowIndex && move.col === colIndex)
                                            ? 'inset 0 0 0 4px #00A9A2'
                                            : 'none'
                                    }}>
                                        {piece && (
                                            <div style={{
                                                ...styles.piece,
                                                backgroundColor: piece.isRed ? '#C70039' : '#231F20',
                                                border: `2px solid ${piece.isRed ? '#939598' : '#939598'}`,
                                            }}>
                                                {piece.isKing && <div style={styles.crown}>K</div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={styles.footer}>
                    <div style={styles.scores}>
                        <p style={{ color: '#B22222' }}>AI (Red): {redScore}</p>
                        <p style={{ color: '#231F20' }}>You (Black): {blackScore}</p>
                    </div>
                    <div style={{ ...styles.turnIndicator, backgroundColor: '#00A9A2', color: 'white' }}>
                        Turn: {isRedTurn ? 'AI (Red)' : 'Your turn'}
                    </div>
                    <button style={{ ...styles.resetButton, backgroundColor: '#231F20' }} onClick={resetGame}>
                        New Game
                    </button>
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
        backgroundColor: '#f0f0f0',
        height: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    footer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    scores: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '250px',
        padding: '10px 20px',
        backgroundColor: '#939598',
        color: 'white',
        borderRadius: 5,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    board: {
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #333',
        width: 'fit-content',
        margin: '0 auto',
    },
    row: {
        display: 'flex',
    },
    square: {
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        boxSizing: 'border-box',
    },
    squareOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'box-shadow 0.15s ease-in-out',
        boxSizing: 'border-box',
    },
    piece: {
        width: 45,
        height: 45,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    crown: {
        color: 'gold',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    resetButton: {
        marginTop: 20,
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
    turnIndicator: {
        padding: '10px 20px',
        backgroundColor: '#fff',
        borderRadius: 5,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginTop: 10,
        fontSize: '16px',
    },
};

export default Checkers;