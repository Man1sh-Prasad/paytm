import { BottomText } from "../components/BottomText"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(username, password)
        axios.post("http://localhost:3000/api/v1/user/signin", {username, password})
        .then(function(response) {
            if(response.data.message === "Invalid username or password") {
                alert(response.data.message)
            }
            setUsername("")
            setPassword("")
            localStorage.setItem("token", response.data.token)
            navigate('/dashboard')
        })
        .catch(function(error) {
            console.log("Error while Signing in",error)
        })
    }

    return <div className="bg-slate-300 w-full h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 h-max rounded-lg p-2 px-4">
                <Heading label={"Signin"} />
                <SubHeading label={"Enter your credentials to access your accont"} />
                <InputBox label={"Email"} placeholder={"john@12gmail.com"} onChange={e => {setUsername(e.target.value)}} />
                <InputBox label={"Password"} placeholder={"12345"} onChange={e => {setPassword(e.target.value)}} />
                <Button label={"Signin"} onClick={handleClick} />
            </div>
        </div>
    </div>
}