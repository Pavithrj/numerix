
const WarningMessage = () => {
    return (
        <div className="absolute z-10 px-4 py-1 text-sm text-white transition-all duration-500 bg-yellow-500 rounded shadow-lg w-fit top-2 animate-fadeInUp">
            Max input length reached!
        </div>
    )
};

export default WarningMessage;
