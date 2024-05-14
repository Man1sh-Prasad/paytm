export function InputBox({placeholder, label}) {
    return <div className="pb-2">
        <div className="font-medium text-left text-sm pb-1">
            {label}
        </div>
        <div className="">
            <input type="text" placeholder={placeholder} className="text-slate-400 text-sm border-slate-300 border rounded w-full px-2 py-1"/>
        </div>
    </div>
}