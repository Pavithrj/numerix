import React, { useState, useRef } from 'react';
import { evaluate } from 'mathjs';

const buttons = [
    ["C", "Del", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", ".", "="]
];

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef(null);

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
        <div className="flex items-center justify-center min-h-screen md:p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="w-full max-w-sm p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
                <div className="mb-4 text-right text-white">
                    <div
                        ref={inputRef}
                        onWheel={handleWheelScroll}
                        className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400 whitespace-nowrap"
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
                            className={`p-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out 
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
    )
};

export default Calculator;





// import React, { useState, useRef, useEffect } from 'react';
// import { evaluate } from 'mathjs';

// const buttons = [
//     ["C", "Del", "%", "/"],
//     ["7", "8", "9", "*"],
//     ["4", "5", "6", "-"],
//     ["1", "2", "3", "+"],
//     ["0", "00", ".", "="]
// ];

// const MAX_INPUT_LENGTH = 25;
// const operators = ["+", "-", "*", "/", "%"];

// const Calculator = () => {
//     const [input, setInput] = useState("");
//     const [result, setResult] = useState("");
//     const [warning, setWarning] = useState(false);
//     const inputRef = useRef(null);

//     const handleWheelScroll = (e) => {
//         if (inputRef.current) {
//             e.preventDefault();
//             inputRef.current.scrollLeft += e.deltaY;
//         }
//     };

//     const handleClick = (value) => {
//         if (input.length >= MAX_INPUT_LENGTH && !["C", "Del", "=", "Enter"].includes(value)) {
//             setWarning(true);
//             setTimeout(() => setWarning(false), 2000);
//             return;
//         }

//         const lastChar = input.slice(-1);
//         const prevChar = input.slice(-2, -1);

//         if (value === "C") {
//             setInput("");
//             setResult("");
//         } else if (value === "Del") {
//             setInput(input.slice(0, -1));
//         } else if (value === "=" || value === "Enter") {
//             try {
//                 const formattedInput = input.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
//                 const evalResult = evaluate(formattedInput);
//                 setResult(Number.isInteger(evalResult) ? evalResult : parseFloat(evalResult.toFixed(4)));
//             } catch {
//                 setResult("Error");
//             }
//         } else if (value === "%") {
//             if (input && /\d$/.test(input) && !lastChar.includes("%")) {
//                 setInput(input + "%");
//             }
//         } else if (value === ".") {
//             const lastNum = input.split(/[\+\-\*\/]/).pop();
//             if (!lastNum.includes(".")) {
//                 setInput(input + value);
//             }
//         } else if (operators.includes(value)) {
//             if (input === "") return;
//             if (operators.includes(lastChar)) {
//                 setInput(input.slice(0, -1) + value);
//             } else {
//                 setInput(input + value);
//             }
//         } else {
//             if ((value === "0" || value === "00") && input === "") {
//                 setInput("0");
//             } else if (lastChar === "0" && ["+", "-", "*", "/"].includes(prevChar)) {
//                 return;
//             } else {
//                 setInput(input + value);
//             }
//         }
//     };

//     // Keyboard support
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             const key = e.key;
//             if ((/\d/.test(key) || operators.includes(key) || key === "." || key === "Enter" || key === "Backspace" || key === "Delete" || key === "%")) {
//                 if (key === "Backspace") handleClick("Del");
//                 else if (key === "Delete") handleClick("C");
//                 else if (key === "Enter") handleClick("=");
//                 else handleClick(key);
//             }
//         };
//         window.addEventListener("keydown", handleKeyDown);
//         return () => window.removeEventListener("keydown", handleKeyDown);
//     }, [input]);

//     return (
//         <div className="flex items-center justify-center min-h-screen md:p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//             {warning && (
//                 <div className="absolute px-4 py-1 text-sm text-white -translate-x-1/2 bg-yellow-500 rounded shadow-lg top-2 left-1/2 animate-fade-in-out">
//                     Max input length reached!
//                 </div>
//             )}

//             <div className="relative w-full max-w-sm p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
//                 <div className="mb-4 text-right text-white">
//                     <div ref={inputRef} onWheel={handleWheelScroll} className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400 whitespace-nowrap">
//                         {input || "0"}
//                     </div>

//                     <div className="text-3xl font-bold">
//                         {result || "0"}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-3">
//                     {buttons.flat().map((btn, i) => (
//                         <button
//                             key={i}
//                             onClick={() => handleClick(btn)}
//                             className={`p-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out ${btn === "="
//                                 ? "col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white"
//                                 : btn === "C"
//                                     ? "bg-rose-500 hover:bg-rose-600 text-white"
//                                     : btn === "Del"
//                                         ? "bg-red-500 hover:bg-red-600 text-white"
//                                         : "/-*+%".includes(btn)
//                                             ? "bg-indigo-500 hover:bg-indigo-600 text-white"
//                                             : "bg-white text-gray-800 hover:bg-gray-100"
//                                 }`}
//                         >
//                             {btn}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Calculator;



// Warning Message

// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { evaluate } from 'mathjs';

// const buttons = [
//     ["C", "Del", "%", "/"],
//     ["7", "8", "9", "*"],
//     ["4", "5", "6", "-"],
//     ["1", "2", "3", "+"],
//     ["0", "00", ".", "="]
// ];

// const MAX_INPUT_LENGTH = 25;
// const operators = ["+", "-", "*", "/", "%"];

// const Calculator = () => {
//     const [input, setInput] = useState("");
//     const [result, setResult] = useState("");
//     const [warning, setWarning] = useState(false);
//     const inputRef = useRef(null);

//     const formatPercentage = (expr) => {
//         return expr.replace(/(\d+(\.\d+)?)%/g, (_, number) => `(${number}/100)`);
//     };

//     const calculateResult = (expression) => {
//         try {
//             const formatted = formatPercentage(expression);
//             const evalResult = evaluate(formatted);
//             return Number.isInteger(evalResult)
//                 ? evalResult
//                 : parseFloat(evalResult.toFixed(4));
//         } catch {
//             return "Error";
//         }
//     };

//     const handleWheelScroll = (e) => {
//         if (inputRef.current) {
//             e.preventDefault();
//             inputRef.current.scrollLeft += e.deltaY;
//         }
//     };

//     const handleClick = useCallback((value) => {
//         if (input.length >= MAX_INPUT_LENGTH && !["C", "Del", "=", "Enter"].includes(value)) {
//             setWarning(true);
//             setTimeout(() => setWarning(false), 2000);
//             return;
//         }

//         const lastChar = input.slice(-1);
//         const secondLastChar = input.slice(-2, -1);

//         switch (value) {
//             case "C":
//                 setInput("");
//                 setResult("");
//                 break;
//             case "Del":
//                 setInput(input.slice(0, -1));
//                 break;
//             case "=":
//             case "Enter":
//                 setResult(calculateResult(input));
//                 break;
//             case ".":
//                 const lastNum = input.split(/[\+\-\*\/]/).pop();
//                 if (!lastNum.includes(".")) {
//                     setInput(input + ".");
//                 }
//                 break;
//             case "%":
//                 if (input && /\d$/.test(input) && !lastChar.includes("%")) {
//                     setInput(input + "%");
//                 }
//                 break;
//             default:
//                 if (operators.includes(value)) {
//                     if (input === "") return;
//                     if (operators.includes(lastChar)) {
//                         setInput(input.slice(0, -1) + value);
//                     } else {
//                         setInput(input + value);
//                     }
//                 } else {
//                     if ((value === "0" || value === "00") && input === "") {
//                         setInput("0");
//                     } else if (lastChar === "0" && operators.includes(secondLastChar)) {
//                         return;
//                     } else {
//                         setInput(input + value);
//                     }
//                 }
//         }
//     }, [input]);

//     // Recalculate when input changes (live preview)
//     useEffect(() => {
//         if (input && !operators.includes(input.slice(-1))) {
//             const res = calculateResult(input);
//             setResult(res);
//         } else if (input === "") {
//             setResult("0");
//         }
//     }, [input]);

//     // Keyboard support
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             const key = e.key;
//             if ((/\d/.test(key) || operators.includes(key) || key === "." || key === "Enter" || key === "Backspace" || key === "Delete" || key === "%")) {
//                 if (key === "Backspace") handleClick("Del");
//                 else if (key === "Delete") handleClick("C");
//                 else if (key === "Enter") handleClick("=");
//                 else handleClick(key);
//             }
//         };
//         window.addEventListener("keydown", handleKeyDown);
//         return () => window.removeEventListener("keydown", handleKeyDown);
//     }, [handleClick]);

//     return (
//         <div className="flex items-center justify-center min-h-screen md:p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//             {warning && (
//                 <div className="absolute px-4 py-1 text-sm text-white -translate-x-1/2 bg-yellow-500 rounded shadow-lg top-2 left-1/2 animate-fade-in-out">
//                     Max input length reached!
//                 </div>
//             )}

//             <div className="relative w-full max-w-sm p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
//                 <div className="mb-4 text-right text-white">
//                     <div
//                         ref={inputRef}
//                         onWheel={handleWheelScroll}
//                         className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400 whitespace-nowrap"
//                     >
//                         {input || "0"}
//                     </div>
//                     <div className="text-3xl font-bold">
//                         {result}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-3">
//                     {buttons.flat().map((btn, i) => (
//                         <button
//                             key={i}
//                             onClick={() => handleClick(btn)}
//                             className={`p-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out ${btn === "="
//                                 ? "col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white"
//                                 : btn === "C"
//                                     ? "bg-rose-500 hover:bg-rose-600 text-white"
//                                     : btn === "Del"
//                                         ? "bg-red-500 hover:bg-red-600 text-white"
//                                         : "/-*+%".includes(btn)
//                                             ? "bg-indigo-500 hover:bg-indigo-600 text-white"
//                                             : "bg-white text-gray-800 hover:bg-gray-100"
//                                 }`}
//                         >
//                             {btn}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Calculator;


// Dark/Light Theme

// import React, { useState, useRef, useEffect } from 'react';
// import { evaluate } from 'mathjs';

// const buttons = [
//     ["C", "Del", "%", "/"],
//     ["7", "8", "9", "*"],
//     ["4", "5", "6", "-"],
//     ["1", "2", "3", "+"],
//     ["0", "00", ".", "="]
// ];

// const MAX_INPUT_LENGTH = 25;
// const operators = ["+", "-", "*", "/", "%"];

// const Calculator = () => {
//     const [input, setInput] = useState("");
//     const [result, setResult] = useState("");
//     const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("calc-history")) || []);
//     const [warning, setWarning] = useState(false);
//     const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
//     const [showHistory, setShowHistory] = useState(false);

//     const inputRef = useRef(null);

//     useEffect(() => {
//         document.documentElement.classList.toggle("dark", theme === "dark");
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const handleWheelScroll = (e) => {
//         if (inputRef.current) {
//             e.preventDefault();
//             inputRef.current.scrollLeft += e.deltaY;
//         }
//     };

//     const handleClick = (value) => {
//         if (input.length >= MAX_INPUT_LENGTH && !["C", "Del", "=", "Enter"].includes(value)) {
//             setWarning(true);
//             setTimeout(() => setWarning(false), 2000);
//             return;
//         }

//         const lastChar = input.slice(-1);
//         const prevChar = input.slice(-2, -1);

//         if (value === "C") {
//             setInput("");
//             setResult("");
//         } else if (value === "Del") {
//             setInput(input.slice(0, -1));
//         } else if (value === "=" || value === "Enter") {
//             try {
//                 const formattedInput = input.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
//                 const evalResult = evaluate(formattedInput);
//                 const finalResult = Number.isInteger(evalResult) ? evalResult : parseFloat(evalResult.toFixed(4));

//                 setResult(finalResult);

//                 const newEntry = { expression: input, result: finalResult };
//                 const newHistory = [newEntry, ...history.slice(0, 9)];
//                 setHistory(newHistory);
//                 localStorage.setItem("calc-history", JSON.stringify(newHistory));
//             } catch {
//                 setResult("Error");
//             }
//         } else if (value === "%") {
//             if (input && /\d$/.test(input) && !lastChar.includes("%")) {
//                 setInput(input + "%");
//             }
//         } else if (value === ".") {
//             const lastNum = input.split(/[\+\-\*\/]/).pop();
//             if (!lastNum.includes(".")) {
//                 setInput(input + value);
//             }
//         } else if (operators.includes(value)) {
//             if (input === "") return;
//             if (operators.includes(lastChar)) {
//                 setInput(input.slice(0, -1) + value);
//             } else {
//                 setInput(input + value);
//             }
//         } else {
//             if ((value === "0" || value === "00") && input === "") {
//                 setInput("0");
//             } else if (lastChar === "0" && ["+", "-", "*", "/"].includes(prevChar)) {
//                 return;
//             } else {
//                 setInput(input + value);
//             }
//         }
//     };

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             const key = e.key;
//             if ((/\d/.test(key) || operators.includes(key) || key === "." || key === "Enter" || key === "Backspace" || key === "Delete" || key === "%")) {
//                 if (key === "Backspace") handleClick("Del");
//                 else if (key === "Delete") handleClick("C");
//                 else if (key === "Enter") handleClick("=");
//                 else handleClick(key);
//             }
//         };
//         window.addEventListener("keydown", handleKeyDown);
//         return () => window.removeEventListener("keydown", handleKeyDown);
//     }, [input, history]);

//     return (
//         <div className={`flex flex-col items-center justify-center min-h-screen md:p-4 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//             {warning && (
//                 <div className="absolute px-4 py-1 text-sm text-white -translate-x-1/2 bg-yellow-500 rounded shadow-lg top-2 left-1/2 animate-fade-in-out">
//                     Max input length reached!
//                 </div>
//             )}

//             <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="absolute px-3 py-1 text-sm text-white transition bg-indigo-500 rounded top-4 right-4 hover:bg-indigo-600">
//                 Toggle {theme === "dark" ? "Light" : "Dark"} Mode
//             </button>

//             <div className="relative w-full max-w-sm p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
//                 <div className="mb-4 text-right">
//                     <div ref={inputRef} onWheel={handleWheelScroll} className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400 whitespace-nowrap">
//                         {input || "0"}
//                     </div>
//                     <div className="text-3xl font-bold">
//                         {result || "0"}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-3">
//                     {buttons.flat().map((btn, i) => (
//                         <button
//                             key={i}
//                             onClick={() => handleClick(btn)}
//                             className={`p-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out ${btn === "="
//                                 ? "col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white"
//                                 : btn === "C"
//                                     ? "bg-rose-500 hover:bg-rose-600 text-white"
//                                     : btn === "Del"
//                                         ? "bg-red-500 hover:bg-red-600 text-white"
//                                         : "/-*+%".includes(btn)
//                                             ? "bg-indigo-500 hover:bg-indigo-600 text-white"
//                                             : "bg-white text-gray-800 hover:bg-gray-100"
//                                 }`}
//                         >
//                             {btn}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {history.length > 0 && (
//                 <button
//                     onClick={() => setShowHistory(!showHistory)}
//                     className="px-3 py-1 mt-4 text-sm text-white transition bg-gray-700 rounded hover:bg-gray-600"
//                 >
//                     {showHistory ? "Hide History" : "Show History"}
//                 </button>
//             )}

//             {showHistory && history.length > 0 && (
//                 <div className="w-full max-w-sm p-4 mt-4 overflow-y-auto shadow-lg bg-white/10 backdrop-blur-md rounded-xl max-h-60">
//                     <h2 className="mb-2 text-lg font-semibold">History</h2>
//                     <ul className="space-y-1 text-sm">
//                         {history.map((item, idx) => (
//                             <li key={idx} className="flex justify-between text-gray-300">
//                                 <span>{item.expression}</span>
//                                 <span className="text-emerald-400">{item.result}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Calculator;




// Clear History and Click a history item ➝ fills the expression input


// import React, { useState, useRef, useEffect } from 'react';
// import { evaluate } from 'mathjs';

// const buttons = [
//   ["C", "Del", "%", "/"],
//   ["7", "8", "9", "*"],
//   ["4", "5", "6", "-"],
//   ["1", "2", "3", "+"],
//   ["0", "00", ".", "="]
// ];

// const MAX_INPUT_LENGTH = 25;
// const operators = ["+", "-", "*", "/", "%"];

// const Calculator = () => {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");
//   const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("calc-history")) || []);
//   const [warning, setWarning] = useState(false);
//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
//   const [showHistory, setShowHistory] = useState(false);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleWheelScroll = (e) => {
//     if (inputRef.current) {
//       e.preventDefault();
//       inputRef.current.scrollLeft += e.deltaY;
//     }
//   };

//   const handleClick = (value) => {
//     if (input.length >= MAX_INPUT_LENGTH && !["C", "Del", "=", "Enter"].includes(value)) {
//       setWarning(true);
//       setTimeout(() => setWarning(false), 2000);
//       return;
//     }

//     const lastChar = input.slice(-1);
//     const prevChar = input.slice(-2, -1);

//     if (value === "C") {
//       setInput("");
//       setResult("");
//     } else if (value === "Del") {
//       setInput(input.slice(0, -1));
//     } else if (value === "=" || value === "Enter") {
//       try {
//         const formattedInput = input.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
//         const evalResult = evaluate(formattedInput);
//         const finalResult = Number.isInteger(evalResult) ? evalResult : parseFloat(evalResult.toFixed(4));

//         setResult(finalResult);

//         const newEntry = { expression: input, result: finalResult };
//         const newHistory = [newEntry, ...history.slice(0, 9)];
//         setHistory(newHistory);
//         localStorage.setItem("calc-history", JSON.stringify(newHistory));
//       } catch {
//         setResult("Error");
//       }
//     } else if (value === "%") {
//       if (input && /\d$/.test(input) && !lastChar.includes("%")) {
//         setInput(input + "%");
//       }
//     } else if (value === ".") {
//       const lastNum = input.split(/[\+\-\*\/]/).pop();
//       if (!lastNum.includes(".")) {
//         setInput(input + value);
//       }
//     } else if (operators.includes(value)) {
//       if (input === "") return;
//       if (operators.includes(lastChar)) {
//         setInput(input.slice(0, -1) + value);
//       } else {
//         setInput(input + value);
//       }
//     } else {
//       if ((value === "0" || value === "00") && input === "") {
//         setInput("0");
//       } else if (lastChar === "0" && ["+", "-", "*", "/"].includes(prevChar)) {
//         return;
//       } else {
//         setInput(input + value);
//       }
//     }
//   };

//   const handleHistoryClick = (expression) => {
//     setInput(expression);
//     setResult("");
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("calc-history");
//   };

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       const key = e.key;
//       if ((/\d/.test(key) || operators.includes(key) || key === "." || key === "Enter" || key === "Backspace" || key === "Delete" || key === "%")) {
//         if (key === "Backspace") handleClick("Del");
//         else if (key === "Delete") handleClick("C");
//         else if (key === "Enter") handleClick("=");
//         else handleClick(key);
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [input, history]);

//   return (
//     <div className={`flex flex-col items-center justify-center min-h-screen md:p-4 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//       {warning && (
//         <div className="absolute px-4 py-1 text-sm text-white -translate-x-1/2 bg-yellow-500 rounded shadow-lg top-2 left-1/2 animate-fade-in-out">
//           Max input length reached!
//         </div>
//       )}

//       <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="absolute px-3 py-1 text-sm text-white transition bg-indigo-500 rounded top-4 right-4 hover:bg-indigo-600">
//         Toggle {theme === "dark" ? "Light" : "Dark"} Mode
//       </button>

//       <div className="relative w-full max-w-sm p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
//         <div className="mb-4 text-right">
//           <div ref={inputRef} onWheel={handleWheelScroll} className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400 whitespace-nowrap">
//             {input || "0"}
//           </div>
//           <div className="text-3xl font-bold">
//             {result || "0"}
//           </div>
//         </div>

//         <div className="grid grid-cols-4 gap-3">
//           {buttons.flat().map((btn, i) => (
//             <button
//               key={i}
//               onClick={() => handleClick(btn)}
//               className={`p-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out ${btn === "="
//                   ? "col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white"
//                   : btn === "C"
//                     ? "bg-rose-500 hover:bg-rose-600 text-white"
//                     : btn === "Del"
//                       ? "bg-red-500 hover:bg-red-600 text-white"
//                       : "/-*+%".includes(btn)
//                         ? "bg-indigo-500 hover:bg-indigo-600 text-white"
//                         : "bg-white text-gray-800 hover:bg-gray-100"
//                 }`}
//             >
//               {btn}
//             </button>
//           ))}
//         </div>
//       </div>

//       {history.length > 0 && (
//         <button
//           onClick={() => setShowHistory(!showHistory)}
//           className="px-3 py-1 mt-4 text-sm text-white transition bg-gray-700 rounded hover:bg-gray-600"
//         >
//           {showHistory ? "Hide History" : "Show History"}
//         </button>
//       )}

//       {showHistory && history.length > 0 && (
//         <div className="w-full max-w-sm p-4 mt-4 overflow-y-auto shadow-lg bg-white/10 backdrop-blur-md rounded-xl max-h-60">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold">History</h2>
//             <button onClick={clearHistory} className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">Clear</button>
//           </div>
//           <ul className="space-y-1 text-sm">
//             {history.map((item, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between px-2 py-1 text-gray-300 rounded cursor-pointer hover:bg-white/10"
//                 onClick={() => handleHistoryClick(item.expression)}
//               >
//                 <span>{item.expression}</span>
//                 <span className="text-emerald-400">{item.result}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Calculator;







// Light/dark mode toggle

// History panel toggle

// Clickable history items (re-inserts expression)

// Clear history button

// Smooth entry animation on history items using fadeInUp


// import React, { useState, useRef, useEffect } from 'react';
// import { evaluate } from 'mathjs';

// const buttons = [
//     ['C', 'Del', '%', '/'],
//     ['7', '8', '9', '*'],
//     ['4', '5', '6', '-'],
//     ['1', '2', '3', '+'],
//     ['0', '00', '.', '=']
// ];

// const MAX_INPUT_LENGTH = 25;
// const operators = ['+', '-', '*', '/', '%'];

// const Calculator = () => {
//     const [input, setInput] = useState('');
//     const [result, setResult] = useState('');
//     const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('calc-history')) || []);
//     const [showHistory, setShowHistory] = useState(false);
//     const [warning, setWarning] = useState(false);
//     const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
//     const inputRef = useRef(null);

//     useEffect(() => {
//         document.documentElement.classList.toggle('dark', theme === 'dark');
//         localStorage.setItem('theme', theme);
//     }, [theme]);

//     const handleWheelScroll = (e) => {
//         if (inputRef.current) {
//             e.preventDefault();
//             inputRef.current.scrollLeft += e.deltaY;
//         }
//     };

//     const handleClick = (value) => {
//         if (input.length >= MAX_INPUT_LENGTH && !['C', 'Del', '=', 'Enter'].includes(value)) {
//             setWarning(true);
//             setTimeout(() => setWarning(false), 2000);
//             return;
//         }

//         const lastChar = input.slice(-1);
//         const prevChar = input.slice(-2, -1);

//         if (value === 'C') {
//             setInput('');
//             setResult('');
//         } else if (value === 'Del') {
//             setInput(input.slice(0, -1));
//         } else if (value === '=' || value === 'Enter') {
//             try {
//                 const formattedInput = input.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
//                 const evalResult = evaluate(formattedInput);
//                 const finalResult = Number.isInteger(evalResult) ? evalResult : parseFloat(evalResult.toFixed(4));

//                 setResult(finalResult);

//                 const newEntry = { expression: input, result: finalResult };
//                 const newHistory = [newEntry, ...history.slice(0, 9)];
//                 setHistory(newHistory);
//                 localStorage.setItem('calc-history', JSON.stringify(newHistory));
//             } catch {
//                 setResult('Error');
//             }
//         } else if (value === '%') {
//             if (input && /\d$/.test(input) && !lastChar.includes('%')) {
//                 setInput(input + '%');
//             }
//         } else if (value === '.') {
//             const lastNum = input.split(/[\+\-\*\/]/).pop();
//             if (!lastNum.includes('.')) {
//                 setInput(input + value);
//             }
//         } else if (operators.includes(value)) {
//             if (input === '') return;
//             if (operators.includes(lastChar)) {
//                 setInput(input.slice(0, -1) + value);
//             } else {
//                 setInput(input + value);
//             }
//         } else {
//             if ((value === '0' || value === '00') && input === '') {
//                 setInput('0');
//             } else if (lastChar === '0' && ['+', '-', '*', '/'].includes(prevChar)) {
//                 return;
//             } else {
//                 setInput(input + value);
//             }
//         }
//     };

//     const handleHistoryClick = (expression) => {
//         setInput(expression);
//         setResult('');
//     };

//     const clearHistory = () => {
//         setHistory([]);
//         localStorage.removeItem('calc-history');
//     };

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             const key = e.key;
//             if ((/\d/.test(key) || operators.includes(key) || key === '.' || key === 'Enter' || key === 'Backspace' || key === 'Delete' || key === '%')) {
//                 if (key === 'Backspace') handleClick('Del');
//                 else if (key === 'Delete') handleClick('C');
//                 else if (key === 'Enter') handleClick('=');
//                 else handleClick(key);
//             }
//         };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [input, history]);

//     return (
//         <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
//             {warning && (
//                 <div className="absolute px-4 py-1 text-sm text-white -translate-x-1/2 bg-yellow-500 rounded shadow-lg top-2 left-1/2 animate-fade-in-out">
//                     Max input length reached!
//                 </div>
//             )}

//             <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="absolute px-3 py-1 text-sm text-white transition bg-indigo-500 rounded top-4 right-4 hover:bg-indigo-600">
//                 Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
//             </button>

//             <div className="relative w-full max-w-sm p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
//                 <div className="mb-4 text-right">
//                     <div ref={inputRef} onWheel={handleWheelScroll} className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400 whitespace-nowrap">
//                         {input || '0'}
//                     </div>
//                     <div className="text-3xl font-bold">
//                         {result || '0'}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-3">
//                     {buttons.flat().map((btn, i) => (
//                         <button
//                             key={i}
//                             onClick={() => handleClick(btn)}
//                             className={`p-4 text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out ${btn === '=' ? 'col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white'
//                                 : btn === 'C' ? 'bg-rose-500 hover:bg-rose-600 text-white'
//                                     : btn === 'Del' ? 'bg-red-500 hover:bg-red-600 text-white'
//                                         : '/-*+%'.includes(btn) ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
//                                             : 'bg-white text-gray-800 hover:bg-gray-100'
//                                 }`}
//                         >
//                             {btn}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex justify-between w-full max-w-sm gap-2 px-4 mt-6">
//                 <button onClick={() => setShowHistory(!showHistory)} className="px-4 py-1 text-white transition bg-gray-700 rounded hover:bg-gray-600">
//                     {showHistory ? 'Hide History' : 'Show History'}
//                 </button>
//                 {history.length > 0 && showHistory && (
//                     <button onClick={clearHistory} className="px-4 py-1 text-white transition rounded bg-rose-600 hover:bg-rose-700">
//                         Clear History
//                     </button>
//                 )}
//             </div>

//             {showHistory && history.length > 0 && (
//                 <div className="w-full max-w-sm p-4 mt-4 overflow-y-auto shadow-lg bg-white/10 backdrop-blur-md rounded-xl max-h-60 animate-fadeInUp">
//                     <h2 className="mb-2 text-lg font-semibold">History</h2>
//                     <ul className="space-y-1 text-sm">
//                         {history.map((item, idx) => (
//                             <li
//                                 key={idx}
//                                 onClick={() => handleHistoryClick(item.expression)}
//                                 className="flex justify-between px-2 py-1 text-gray-300 transition-all duration-200 rounded cursor-pointer hover:bg-white/20 animate-fadeInUp"
//                             >
//                                 <span>{item.expression}</span>
//                                 <span className="text-emerald-400">{item.result}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Calculator;






// import React, { useState, useRef, useEffect } from 'react';
// import { evaluate } from 'mathjs';

// const buttons = [
//     ['C', 'Del', '%', '/'],
//     ['7', '8', '9', '*'],
//     ['4', '5', '6', '-'],
//     ['1', '2', '3', '+'],
//     ['0', '00', '.', '=']
// ];

// const MAX_INPUT_LENGTH = 25;
// const operators = ['+', '-', '*', '/', '%'];

// const Calculator = () => {
//     const [input, setInput] = useState('');
//     const [result, setResult] = useState('');
//     const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('calc-history')) || []);
//     const [showHistory, setShowHistory] = useState(false);
//     const [warning, setWarning] = useState(false);
//     const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
//     const inputRef = useRef(null);

//     useEffect(() => {
//         document.documentElement.classList.toggle('dark', theme === 'dark');
//         localStorage.setItem('theme', theme);
//     }, [theme]);

//     const handleWheelScroll = (e) => {
//         if (inputRef.current) {
//             e.preventDefault();
//             inputRef.current.scrollLeft += e.deltaY;
//         }
//     };

//     const handleClick = (value) => {
//         if (input.length >= MAX_INPUT_LENGTH && !['C', 'Del', '=', 'Enter'].includes(value)) {
//             setWarning(true);
//             setTimeout(() => setWarning(false), 2000);
//             return;
//         }

//         const lastChar = input.slice(-1);
//         const prevChar = input.slice(-2, -1);

//         if (value === 'C') {
//             setInput('');
//             setResult('');
//         } else if (value === 'Del') {
//             setInput(input.slice(0, -1));
//         } else if (value === '=' || value === 'Enter') {
//             try {
//                 const formattedInput = input.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
//                 const evalResult = evaluate(formattedInput);
//                 const finalResult = Number.isInteger(evalResult) ? evalResult : parseFloat(evalResult.toFixed(4));

//                 setResult(finalResult);

//                 const newEntry = { expression: input, result: finalResult };
//                 const newHistory = [newEntry, ...history.slice(0, 9)];
//                 setHistory(newHistory);
//                 localStorage.setItem('calc-history', JSON.stringify(newHistory));
//             } catch {
//                 setResult('Error');
//             }
//         } else if (value === '%') {
//             if (input && /\d$/.test(input) && !lastChar.includes('%')) {
//                 setInput(input + '%');
//             }
//         } else if (value === '.') {
//             const lastNum = input.split(/[\+\-\*\/]/).pop();
//             if (!lastNum.includes('.')) {
//                 setInput(input + value);
//             }
//         } else if (operators.includes(value)) {
//             if (input === '') return;
//             if (operators.includes(lastChar)) {
//                 setInput(input.slice(0, -1) + value);
//             } else {
//                 setInput(input + value);
//             }
//         } else {
//             if ((value === '0' || value === '00') && input === '') {
//                 setInput('0');
//             } else if (lastChar === '0' && ['+', '-', '*', '/'].includes(prevChar)) {
//                 return;
//             } else {
//                 setInput(input + value);
//             }
//         }
//     };

//     const handleHistoryClick = (expression) => {
//         setInput(expression);
//         setResult('');
//     };

//     const clearHistory = () => {
//         setHistory([]);
//         localStorage.removeItem('calc-history');
//     };

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             const key = e.key;
//             if ((/\d/.test(key) || operators.includes(key) || key === '.' || key === 'Enter' || key === 'Backspace' || key === 'Delete' || key === '%')) {
//                 if (key === 'Backspace') handleClick('Del');
//                 else if (key === 'Delete') handleClick('C');
//                 else if (key === 'Enter') handleClick('=');
//                 else handleClick(key);
//             }
//         };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [input, history]);

//     return (
//         <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
//             {warning && (
//                 <div className="absolute px-4 py-1 text-sm text-white -translate-x-1/2 bg-yellow-500 rounded shadow-lg top-2 left-1/2 animate-fade-in-out">
//                     Max input length reached!
//                 </div>
//             )}

//             <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="absolute px-3 py-1 text-sm text-white transition bg-indigo-500 rounded top-4 right-4 hover:bg-indigo-600">
//                 Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
//             </button>

//             <div className="relative w-full max-w-sm p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
//                 <div className="mb-4 text-right">
//                     <div ref={inputRef} onWheel={handleWheelScroll} className="max-w-full overflow-hidden overflow-x-auto text-sm text-gray-400 whitespace-nowrap">
//                         {input || '0'}
//                     </div>
//                     <div className="text-3xl font-bold">
//                         {result || '0'}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-3">
//                     {buttons.flat().map((btn, i) => (
//                         <button
//                             key={i}
//                             onClick={() => handleClick(btn)}
//                             className={`p-[0.8rem] sm:p-4 text-base sm:text-xl rounded-xl font-semibold shadow-md transition duration-300 ease-in-out ${btn === '=' ? 'col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white'
//                                 : btn === 'C' ? 'bg-rose-500 hover:bg-rose-600 text-white'
//                                     : btn === 'Del' ? 'bg-red-500 hover:bg-red-600 text-white'
//                                         : '/-*+%'.includes(btn) ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
//                                             : 'bg-white text-gray-800 hover:bg-gray-100'
//                                 }`}
//                         >
//                             {btn}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex justify-between w-full max-w-sm gap-2 px-4 mt-6">
//                 <button onClick={() => setShowHistory(!showHistory)} className="px-4 py-1 text-white transition bg-gray-700 rounded hover:bg-gray-600">
//                     {showHistory ? 'Hide History' : 'Show History'}
//                 </button>
//                 {history.length > 0 && showHistory && (
//                     <button onClick={clearHistory} className="px-4 py-1 text-white transition rounded bg-rose-600 hover:bg-rose-700">
//                         Clear History
//                     </button>
//                 )}
//             </div>

//             {showHistory && history.length > 0 && (
//                 <div className="w-full max-w-sm p-4 mt-4 overflow-y-auto shadow-lg bg-white/10 backdrop-blur-md rounded-xl max-h-60 animate-fadeInUp">
//                     <h2 className="mb-2 text-lg font-semibold">History</h2>
//                     <ul className="space-y-1 text-sm">
//                         {history.map((item, idx) => (
//                             <li
//                                 key={idx}
//                                 onClick={() => handleHistoryClick(item.expression)}
//                                 className="flex justify-between px-2 py-1 text-gray-300 transition-all duration-200 rounded cursor-pointer hover:bg-white/20 animate-fadeInUp"
//                             >
//                                 <span>{item.expression}</span>
//                                 <span className="text-emerald-400">{item.result}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Calculator;
