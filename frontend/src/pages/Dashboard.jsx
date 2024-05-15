import { useState } from "react";
import { Appbar } from "../components/Appbar.jsx";
import { Balance } from "../components/Balance.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { User } from "../components/User.jsx";

export function Dashboard() {

    const [users, setUsers] = useState([{
        firstname: "Manish",
        lastname: "Prasad",
        _id: 1
    }])

    return <div>
        <Appbar />
        <Balance value={1000000000} />
        <div className="ml-4 mr-4">    
            <InputBox label={"Users"} placeholder={"Search users... "} />
        </div>
        <div>
            {
                users.map(user => <User user={user} />)
            }
        </div>
    </div>
}