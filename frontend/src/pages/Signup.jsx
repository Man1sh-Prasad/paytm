import { BottomText } from "../components/BottomText"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export function Signup() {
    return <div className="bg-slate-300 w-full h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 h-max rounded-lg p-2 px-4">
                <Heading label={"Signup"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox label={"First Name"} placeholder={"John"} />
                <InputBox label={"Last Name"} placeholder={"Doe"} />
                <InputBox label={"Email"} placeholder={"john@12gmai.com"} />
                <InputBox label={"Password"} placeholder={"12345"} />
                <Button label={"Signin"} />
                <BottomText label={"Already have an account?"} buttonText={"Signin"}/>
            </div>
        </div>
    </div>
}