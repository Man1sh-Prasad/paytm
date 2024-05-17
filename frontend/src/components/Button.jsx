export function Button({label, onClick}) {
    return <div>
        <button onClick={onClick} className="w-full bg-black text-white text-md mt-2 mb-2 px-4 py-1 rounded">
            {label}
        </button>
    </div>
}