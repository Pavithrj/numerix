
const HistoryButtons = ({ history, setShowHistory, showHistory, clearHistory }) => {
    return (
        <div className="flex w-full max-w-sm justify-evenly">
            {history.length > 0 &&
                <button onClick={() => setShowHistory(!showHistory)} className="px-4 py-1 text-white transition bg-gray-700 rounded hover:bg-gray-600">
                    {showHistory ? "Hide History" : "Show History"}
                </button>
            }

            {history.length > 0 && showHistory &&
                <button onClick={clearHistory} className="px-4 py-1 text-white transition rounded bg-rose-600 hover:bg-rose-700">
                    Clear History
                </button>
            }
        </div>
    )
};

export default HistoryButtons;
