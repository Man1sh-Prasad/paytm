import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar.jsx";
import { Balance } from "../components/Balance.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { User } from "../components/User.jsx";
import axios from  'axios'

export function Dashboard() {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("") 
    const [balance, setBalance] = useState(0)
    
    // header
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }

    useEffect( function() {
         axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {headers})
        .then(function(response) {
            setUsers(response.data.user)
        })
    }, [filter])

    useEffect( function() {
        axios.get('http://localhost:3000/api/v1/account/balance', {headers})
        .then(function(response) {
            console.log(response)
            setBalance(response.data.balance)
        })
    }, [])
    
    return <div>
        <Appbar />
        <Balance value={balance} />
        <div className="ml-4 mr-4">    
            <InputBox label={"Users"} placeholder={"Search users... "} onChange={e => {setFilter(e.target.value)}}/>
        </div>
        <div>
            {
                users.map(user => <User key={user._id} userId={user._id} user={user} />)
            }
        </div>
    </div>
}