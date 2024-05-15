import { Button } from "./Button";

export function User({user}) {
    return <div className="flex justify-between ml-4 mr-4">
        <div className="flex">
            <div className="h-12 w-12 rounded-full bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center">
                    { user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                {user.firstname} {user.lastname}
            </div>
        </div>
        <div className="fflex flex-col justify-center h-full">
            <Button label={"Send Money"} />
        </div>
    </div>
}