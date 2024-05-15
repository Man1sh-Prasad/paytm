export function Balance({value}) {
    return <div className="flex my-4 ml-4">
        <div className="text-md font-semibold">
            Your Balance
        </div>
        <div className="text-md font-semibold text-green-500 ml-4">
            Rs {value}
        </div>
    </div>
}