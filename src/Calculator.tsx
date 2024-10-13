import { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumberClick = (value: string) => {
    if (shouldResetDisplay) {
      setDisplay(value);
      setShouldResetDisplay(false);
    } else {
      setDisplay((prev) => (prev === '0' ? value : prev + value));
    }
  };

  const handleOperationClick = (op: string) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
    } else if (operation) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setPrevValue(result);
      setDisplay(result.toString());
    }
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prevValue !== null && operation) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPrevValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const buttonClass = "bg-gray-800 text-purple-400 font-bold py-4 px-6 rounded-lg text-2xl hover:bg-gray-700 transition-colors duration-200";
  const operationButtonClass = "bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-2xl hover:bg-purple-600 transition-colors duration-200";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-96 bg-gray-900 rounded-2xl shadow-2xl p-6">
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            className="w-full text-right text-4xl font-bold bg-transparent text-purple-400 outline-none"
            value={display}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button onClick={handleClear} className={`col-span-2 ${operationButtonClass} bg-red-600 hover:bg-red-500`}>AC</button>
          <button onClick={handleBackspace} className={operationButtonClass}>⌫</button>
          <button onClick={() => handleOperationClick('/')} className={operationButtonClass}>÷</button>
          
          {['7', '8', '9'].map((btn) => (
            <button key={btn} onClick={() => handleNumberClick(btn)} className={buttonClass}>{btn}</button>
          ))}
          <button onClick={() => handleOperationClick('*')} className={operationButtonClass}>×</button>
          
          {['4', '5', '6'].map((btn) => (
            <button key={btn} onClick={() => handleNumberClick(btn)} className={buttonClass}>{btn}</button>
          ))}
          <button onClick={() => handleOperationClick('-')} className={operationButtonClass}>-</button>
          
          {['1', '2', '3'].map((btn) => (
            <button key={btn} onClick={() => handleNumberClick(btn)} className={buttonClass}>{btn}</button>
          ))}
          <button onClick={() => handleOperationClick('+')} className={operationButtonClass}>+</button>
          
          <button onClick={() => handleNumberClick('0')} className={`col-span-2 ${buttonClass}`}>0</button>
          <button onClick={handleDecimal} className={buttonClass}>.</button>
          <button onClick={handleEquals} className={`${operationButtonClass} bg-green-600 hover:bg-green-500`}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;