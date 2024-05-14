import { BottomText } from "../components/BottomText"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export function Signin() {
    return <div className="bg-slate-300 w-full h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 h-max rounded-lg p-2 px-4">
                <Heading label={"Signin"} />
                <SubHeading label={"Enter your credentials to access your accont"} />
                <InputBox label={"Email"} placeholder={"john@12gmai.com"} />
                <InputBox label={"Password"} placeholder={"12345"} />
                <Button label={"Signin"} />
            </div>
        </div>
    </div>
}