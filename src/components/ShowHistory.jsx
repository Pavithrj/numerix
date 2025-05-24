
const ShowHistory = ({ history, theme, handleHistoryClick }) => {
    return (
        <div className="flex flex-col w-full max-w-sm p-5 shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl">
            <ul className="flex flex-col justify-between gap-2 text-sm">
                {history.map((item, index) => (
                    <li key={index} onClick={() => handleHistoryClick(item.expression)} className={`flex justify-between transition-all duration-500 rounded cursor-pointer hover:bg-white/20 animate-fadeInUp ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                        <div>
                            {item.expression}
                        </div>

                        <div className={`${theme === "dark" ? "text-emerald-400" : "text-black"}`}>
                            {item.result}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default ShowHistory;
