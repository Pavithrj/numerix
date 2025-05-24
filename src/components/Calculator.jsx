import { useState, useRef, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import { Sun, Moon } from 'lucide-react';

const buttons = [
    ["C", "Del", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", ".", "="]
];

const MAX_INPUT_LENGTH = 25;
const operators = ["+", "-", "*", "/", "%"];

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef(null);

    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("calc-history")) || []);
    const [showHistory, setShowHistory] = useState(false);
    const [warning, setWarning] = useState(false);

    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem("theme");
        if (stored) return stored;
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleWheelScroll = (e) => {
        if (inputRef.current) {
            e.preventDefault();
            inputRef.current.scrollLeft += e.deltaY;
        }
    };

    const handleClick = useCallback((value) => {
        if (input.length >= MAX_INPUT_LENGTH && !["C", "Del", "=", "Enter"].includes(value)) {
            setWarning(true);
            setTimeout(() => setWarning(false), 2000);
            return;
        }

        const lastChar = input.slice(-1);
        const prevChar = input.slice(-2, -1);

        if (value === "C") {
            setInput("");
            setResult("");
        } else if (value === "Del") {
            setInput(input.slice(0, -1));
        } else if (value === "=" || value === "Enter") {
            try {
                const formattedInput = input.replace(/(\d+(\.\d+)?)%/g, "($1/100)").replace(/[+\-*/%]+$/, "");
                const evalResult = evaluate(formattedInput);
                const finalResult = Number.isInteger(evalResult) ? evalResult : parseFloat(evalResult.toFixed(4));

                setResult(finalResult);

                const newEntry = { expression: input, result: finalResult };
                const newHistory = [newEntry, ...history.slice(0, 9)];
                setHistory(newHistory);
                localStorage.setItem("calc-history", JSON.stringify(newHistory));
            } catch {
                setResult("Error");
            }
        } else if (value === "%") {
            if (input && /\d$/.test(input) && !lastChar.includes("%")) {
                setInput(input + "%");
            }
        } else if (value === ".") {
            const lastNum = input.split(/[+*/-]/).pop();

            if (!lastNum.includes(".")) {
                setInput(input + value);
            }
        } else if (operators.includes(value)) {
            if (input === "") return;
            if (operators.includes(lastChar)) {
                setInput(input.slice(0, -1) + value);
            } else {
                setInput(input + value);
            }
        } else {
            if ((value === "0" || value === "00") && input === "") {
                setInput("0");
            } else if (lastChar === "0" && ["+", "-", "*", "/"].includes(prevChar)) {
                return;
            } else {
                setInput(input + value);
            }
        }
    }, [input, history]);

    const handleHistoryClick = (expression) => {
        setInput(expression);
        setResult("");
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("calc-history");
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            if ((/\d/.test(key) || operators.includes(key) || key === "." || key === "Enter" || key === "Backspace" || key === "Delete" || key === "%")) {
                if (key === "Backspace") handleClick("Del");
                else if (key === "Delete") handleClick("C");
                else if (key === "Enter") handleClick("=");
                else handleClick(key);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleClick]);

    return (
        <div className={`flex flex-col gap-4 items-center justify-center min-h-screen p-4 transition-all duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {warning &&
                <div className="absolute z-10 px-4 py-1 text-sm text-white transition-all duration-500 bg-yellow-500 rounded shadow-lg w-fit top-2 animate-fadeInUp">
                    Max input length reached!
                </div>
            }

            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`absolute z-10 p-2 text-xl transition rounded-full shadow-2xl top-2 right-2 sm:text-sm ${theme === "dark" ? "text-white border-gray-400" : "text-black border"}`}>
                {theme === "dark" ? <Sun /> : <Moon />}
            </button>

            <div className="relative flex flex-col w-full max-w-sm gap-4 p-5 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
                <div className="text-right">
                    <div ref={inputRef} onWheel={handleWheelScroll} className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400">
                        {input || "0"}
                    </div>
                    <div className="text-2xl font-bold duration-500 sm:text-3xl">
                        {result || "0"}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {buttons.flat().map((btn, i) => (
                        <button key={i} onClick={() => handleClick(btn)} className={`p-2 sm:p-4 text-base sm:text-xl rounded-xl font-semibold shadow-md transition duration-500 ease-in-out ${btn === "=' ? 'col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white' : btn === 'C' ? 'bg-rose-500 hover:bg-rose-600 text-white' : btn === 'Del' ? 'bg-red-500 hover:bg-red-600 text-white' : '/-*+%'.includes(btn) ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}>
                            {btn}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex w-full max-w-sm justify-evenly">
                {history.length > 0 && (
                    <button onClick={() => setShowHistory(!showHistory)} className="px-4 py-1 text-white transition bg-gray-700 rounded hover:bg-gray-600">
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                )}

                {history.length > 0 && showHistory &&
                    <button onClick={clearHistory} className="px-4 py-1 text-white transition rounded bg-rose-600 hover:bg-rose-700">
                        Clear History
                    </button>
                }
            </div>

            {showHistory && history.length > 0 &&
                <div className="flex flex-col w-full max-w-sm p-5 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
                    <ul className="flex flex-col justify-between gap-2 text-sm">
                        {history.map((item, index) => (
                            <li key={index} onClick={() => handleHistoryClick(item.expression)} className={`flex justify-between transition-all duration-500 rounded cursor-pointer hover:bg-white/20 animate-fadeInUp ${theme === 'dark' ? "text-gray-300" : "text-black"}`}>
                                <div>
                                    {item.expression}
                                </div>

                                <div className={`${theme === 'dark' ? 'text-emerald-400' : 'text-black'}`}>
                                    {item.result}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
};

export default Calculator;
