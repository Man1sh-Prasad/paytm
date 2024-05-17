import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Appbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/signup')
    }

    return <div className="shadow flex justify-between h-14">
        <div className="h-full mt-4 ml-4 flex flex-col jusify-center font-semibold">
            PayTM App
        </div>
        <div className="flex pr-4">
            <div className="h-full flex flex-col justify-center mr-4">
                <Button label={"Logout"} onClick={handleLogout} />
            </div>
            <div className="h-full flex flex-col justify-center mr-1">
                Hello
            </div>
            <div className="bg-slate-200 rounded-full w-12 h-12 justify-center mt-1 mr-2">
                <div className="h-full flex flex-col justify-center text-center text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}