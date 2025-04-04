import { useState } from 'react';

const buttons = [
    ["C", "/", "*", "Del"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", "."]
];

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        if (value === "C") {
            setInput("");
            setResult("");
        } else if (value === "Del") {
            setInput(input.slice(0, -1));
        } else if (value === "=") {
            try {
                const evalResult = eval(input);
                setResult(evalResult);
            } catch {
                setResult("Error");
            }
        } else {
            setInput(input + value);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm">
                <div className="mb-4 text-right text-white">
                    <div className="text-sm text-gray-400">{input || "0"}</div>
                    <div className="text-3xl font-bold">{result || "0"}</div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {buttons.flat().map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(btn)}
                            className={`py-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out 
                ${btn === "="
                                    ? "col-span-1 bg-green-500 hover:bg-green-600 text-white"
                                    : btn === "C" || btn === "Del"
                                        ? "bg-red-500 hover:bg-red-600 text-white"
                                        : "/-*+".includes(btn)
                                            ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                                            : "bg-white text-gray-800 hover:bg-gray-100"
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Calculator;
