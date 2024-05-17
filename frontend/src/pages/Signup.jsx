import { useNavigate } from "react-router-dom"
import { BottomText } from "../components/BottomText"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"

export function Signup() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleClick = async() => {
        await axios.post("http://localhost:3000/api/v1/user/signup", {
            username,
            firstname,
            lastname,
            password
        })
        .then(function(response) {
            if(response.data.message === 'Email already taken') {
                alert(data.response.message)
                navigate('/signin')
            }
            alert(response.data.message);
            setUsername("");
            setFirstname("");
            setLastname("")
            setPassword("")
            navigate('/signin')
        })
        .catch(function(error) {
            console.log("Error while Signing up.", error)
        })
    }

    return <div className="bg-slate-300 w-full h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 h-max rounded-lg p-2 px-4">
                <Heading label={"Signup"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox label={"First Name"} placeholder={"John"} onChange={e => {setFirstname(e.target.value)}} />
                <InputBox label={"Last Name"} placeholder={"Doe"} onChange={e => {setLastname(e.target.value)}} />
                <InputBox label={"Email"} placeholder={"john@12gmail.com"} onChange={e => {setUsername(e.target.value)}} />
                <InputBox label={"Password"} placeholder={"12345"} onChange={e => {setPassword(e.target.value)}} />
                <Button label={"Signup"} onClick={handleClick} />
                <BottomText label={"Already have an account?"} buttonText={"Signin"} to={'/signin'} />
            </div>
        </div>
    </div>
}