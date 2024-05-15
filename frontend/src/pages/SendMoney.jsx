import { Heading } from "../components/Heading.jsx";
import { InputBox } from "../components/InputBox";
import { Button } from '../components/Button.jsx'

export function SendMoney() {
    return <div className="h-screen w-full flex justify-center" >
        <div className="flex flex-col justify-center">
            <div className="w-80 h-max rounded bg-white shadow px-6 py-4">
                <Heading label={"Send Money"} />
                <div className="flex mt-10 mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-500 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center">
                        U
                        </div>
                    </div>
                    <div className="flex flex-col justify-center ml-1 font-semibold text-lg">
                        Friend's Name
                    </div>
                </div>
                <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} />
                <div className="flex justify-center">
                    <button className="w-full bg-green-500 text-white text-lg py-1 rounded my-2">
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    </div>
}