
import React, { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';

type Operator = '+' | '-' | '*' | '/';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const handleDigitClick = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForSecondOperand) {
        setDisplayValue('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const calculate = (first: number, second: number, op: Operator): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  const handleOperatorClick = (nextOperator: Operator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstOperand !== null && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    } else {
      setFirstOperand(inputValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const handleEqualsClick = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };
  
  const handleToggleSignClick = () => {
      setDisplayValue(String(parseFloat(displayValue) * -1));
  };

  const handlePercentageClick = () => {
      setDisplayValue(String(parseFloat(displayValue) / 100));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 border border-gray-700">
          <div className="bg-gray-900/50 backdrop-blur-sm text-white text-6xl font-light text-right p-6 rounded-2xl mb-6 break-words break-all">
            {displayValue}
          </div>
          <div className="grid grid-cols-4 gap-4">
            <CalculatorButton onClick={handleClearClick} variant="special">AC</CalculatorButton>
            <CalculatorButton onClick={handleToggleSignClick} variant="special">+/-</CalculatorButton>
            <CalculatorButton onClick={handlePercentageClick} variant="special">%</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('/')} variant="operator">/</CalculatorButton>
            
            <CalculatorButton onClick={() => handleDigitClick('7')}>7</CalculatorButton>
            <CalculatorButton onClick={() => handleDigitClick('8')}>8</CalculatorButton>
            <CalculatorButton onClick={() => handleDigitClick('9')}>9</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('*')} variant="operator">x</CalculatorButton>

            <CalculatorButton onClick={() => handleDigitClick('4')}>4</CalculatorButton>
            <CalculatorButton onClick={() => handleDigitClick('5')}>5</CalculatorButton>
            <CalculatorButton onClick={() => handleDigitClick('6')}>6</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('-')} variant="operator">-</CalculatorButton>

            <CalculatorButton onClick={() => handleDigitClick('1')}>1</CalculatorButton>
            <CalculatorButton onClick={() => handleDigitClick('2')}>2</CalculatorButton>
            <CalculatorButton onClick={() => handleDigitClick('3')}>3</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick('+')} variant="operator">+</CalculatorButton>

            <CalculatorButton onClick={() => handleDigitClick('0')} className="col-span-2">0</CalculatorButton>
            <CalculatorButton onClick={handleDecimalClick}>.</CalculatorButton>
            <CalculatorButton onClick={handleEqualsClick} variant="operator">=</CalculatorButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
