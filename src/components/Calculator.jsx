import React, { useState, useRef } from "react";
import { evaluate } from "mathjs";

const buttons = [
    ["C", "Del", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", ".", "="]
];

export default function Calculator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef(null);

    // Add this handler inside the component:
    const handleWheelScroll = (e) => {
        if (inputRef.current) {
            e.preventDefault();
            inputRef.current.scrollLeft += e.deltaY;
        }
    };

    const handleClick = (value) => {
        const operators = ["+", "-", "*", "/", "%"];

        if (value === "C") {
            setInput("");
            setResult("");
        } else if (value === "Del") {
            setInput(input.slice(0, -1));
        } else if (value === "=") {
            try {
                // Replace all % with % operator logic (a % b => a mod b)
                const formattedInput = input.replace(/(\d+)%(?=\d)/g, (_, num) => `${num}/100*`);
                const evalResult = evaluate(formattedInput);
                setResult(evalResult);
            } catch {
                setResult("Error");
            }
        } else if (value === "%") {
            if (input !== "" && /\d$/.test(input)) {
                setInput(input + "%");
            }
        } else if (operators.includes(value)) {
            if (input === "") return;
            const lastChar = input.slice(-1);
            if (operators.includes(lastChar)) {
                setInput(input.slice(0, -1) + value);
            } else {
                setInput(input + value);
            }
        } else {
            const lastChar = input.slice(-1);
            const prevChar = input.slice(-2, -1);

            if (value === "0" || value === "00") {
                if (input === "") {
                    setInput("0");
                    return;
                }
                if (lastChar === "0" && ["+", "-", "*", "/"].includes(prevChar)) {
                    return;
                }
                if (/\d/.test(lastChar)) {
                    setInput(input + value);
                    return;
                }
                setInput(input + value);
            } else {
                setInput(input + value);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm">
                <div className="mb-4 text-right text-white">
                    {/*
          <div className="text-sm text-gray-400">{input || "0"}</div>
          */}

                    <div
                        ref={inputRef}
                        onWheel={handleWheelScroll}
                        className="text-sm text-gray-400 max-w-full overflow-x-auto whitespace-nowrap overflow-hidden scrollbar-none"
                    >
                        {input || "0"}
                    </div>



                    <div className="text-3xl font-bold">{result || "0"}</div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {buttons.flat().map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(btn)}
                            className={`py-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out 
                ${btn === "="
                                    ? "col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                                    : btn === "C"
                                        ? "bg-rose-500 hover:bg-rose-600 text-white"
                                        : btn === "Del"
                                            ? "bg-red-500 hover:bg-red-600 text-white"
                                            : "/-*+%".includes(btn)
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
    );
}