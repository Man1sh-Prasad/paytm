import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading.jsx";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useState } from "react";
import { Button } from "../components/Button.jsx";

export function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name")
    const navigate = useNavigate()
    const [amount, setAmount] = useState();

    const handleTransfer = () => {
        axios.post('http://localhost:3000/api/v1/account/transfer', {
            to: id,
            amount: amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            if(response.data.message === "Transfer Successful") {
                console.log(response);
                alert("Transfer Successfull")
            } else {
                alert("Something went wrong")
            }
            
        })
        .catch(function(error) {
            alert("Something went wrong")
        }) 
        
    }

    return <div className="h-screen w-full flex justify-center" >
        <div className="flex flex-col justify-center">
            <div className="w-80 h-max rounded bg-white shadow px-6 py-4">
                <Heading label={"Send Money"} />
                <div className="flex mt-10 mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-500 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center">
                        {name[0]}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center ml-1 font-semibold text-lg">
                        {name}
                    </div>
                </div>
                <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} onChange={e => {setAmount(e.target.value)}}/>
                <div className="flex flex-col justify-center">
                    <button onClick={handleTransfer} className="w-full bg-green-500 text-white text-lg py-1 rounded mt-4">
                        Initiate Transfer
                    </button>
                    <Button label={"Return to Dashboard"} onClick={e => {
                        navigate('/dashboard')
                    }}/>
                </div>
            </div>
        </div>
    </div>
}