import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function LoginPage () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useToken()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
        e.target.reset()
    }

    return (
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-floating mb-3">
                <label className="form-label">Username</label>
                <input name="username" type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} required  />
            </div>

            <div className="form-floating mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <input type="submit"  className="btn btn-primary" value="Login" />
            </form>
            </div>
        </div>
    )
}
