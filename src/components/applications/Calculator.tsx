import React, { useState } from 'react';
import Window from '../os/Window';

export interface CalculatorProps extends WindowAppProps {}

const Calculator: React.FC<CalculatorProps> = (props) => {
    const [display, setDisplay] = useState('0');
    const [operator, setOperator] = useState<string | null>(null);
    const [operand, setOperand] = useState<number | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputDot = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
        setOperator(null);
        setOperand(null);
        setWaitingForOperand(false);
    };

    const toggleSign = () => {
        setDisplay((parseFloat(display) * -1).toString());
    };

    const inputPercent = () => {
        setDisplay((parseFloat(display) / 100).toString());
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (operand === null) {
            setOperand(inputValue);
        } else if (operator) {
            const currentValue = operand || 0;
            const newValue = calculate(currentValue, inputValue, operator);

            setOperand(newValue);
            setDisplay(newValue.toString());
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (left: number, right: number, operator: string) => {
        switch (operator) {
            case '+': 
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            default:
                return right;
        }
    };

    return (
        <Window
            top={50}
            left={50}
            width={245}
            height={450}
            windowTitle="Calculator"
            windowBarIcon="calculatorIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            resizable={true}
        >
            <div style={styles.container}>
                <div style={styles.display}>{display}</div>
                <div style={styles.buttons}>
                    <button style={styles.button} onClick={clearDisplay}>C</button>
                    <button style={styles.button} onClick={toggleSign}>±</button>
                    <button style={styles.button} onClick={inputPercent}>%</button>
                    <button style={styles.button} onClick={() => performOperation('/')}>/</button>
                    <button style={styles.button} onClick={() => inputDigit('7')}>7</button>
                    <button style={styles.button} onClick={() => inputDigit('8')}>8</button>
                    <button style={styles.button} onClick={() => inputDigit('9')}>9</button>
                    <button style={styles.button} onClick={() => performOperation('*')}>*</button>
                    <button style={styles.button} onClick={() => inputDigit('4')}>4</button>
                    <button style={styles.button} onClick={() => inputDigit('5')}>5</button>
                    <button style={styles.button} onClick={() => inputDigit('6')}>6</button>
                    <button style={styles.button} onClick={() => performOperation('-')}>-</button>
                    <button style={styles.button} onClick={() => inputDigit('1')}>1</button>
                    <button style={styles.button} onClick={() => inputDigit('2')}>2</button>
                    <button style={styles.button} onClick={() => inputDigit('3')}>3</button>
                    <button style={styles.button} onClick={() => performOperation('+')}>+</button>
                    <button style={{ ...styles.button, gridColumn: 'span 2' }} onClick={() => inputDigit('0')}>0</button>
                    <button style={styles.button} onClick={inputDot}>.</button>
                    <button style={styles.button} onClick={() => performOperation('=')}>=</button>
                </div>
            </div>
        </Window>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#c0c0c0',
        padding: 10,
    },
    display: {
        backgroundColor: 'white',
        border: '1px solid #000',
        fontSize: '2em',
        padding: '10px',
        textAlign: 'right',
        marginBottom: '10px',
    },
    buttons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '10px',
    },
    button: {
        backgroundColor: '#e0e0e0',
        border: '1px solid #000',
        fontSize: '1.5em',
        padding: '10px',
        cursor: 'pointer',
    },
};

export default Calculator;
