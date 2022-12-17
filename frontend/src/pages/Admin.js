import { useState } from "react"
import axios from "axios";

function Admin() {
    const [id,setId] = useState("");
    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.put("/api/v1/user/admin",{id})
    }
    console.log(id)
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="admin">Enter Id</label>
                <input id = "admin" type="text"
                onChange={(e) =>setId(e.target.value)}
                 />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default Admin