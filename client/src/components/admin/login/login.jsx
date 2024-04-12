import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.scss'
import { login } from '../../../repository/auth';
const LoginCard = () => {
    const [inputs, setInputs] = useState({
        username:"",
        password:""
    })

    const [err,setErr] = useState(null)

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        login(inputs).then((result) => {
            if(result === "User not found" || result === "Incorrect Password"){
                navigate('/admin/login');
                setErr(result);  
            }else{
                localStorage.setItem('token',result);
                navigate('/admin');
            }
        })
    }

    const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="loginWrapper">
        <div className="container">
            <div className="left">
                <h1>Admin Panel</h1>
            </div>
            <div className="right">

                <form onSubmit={handleLogin}>
                <h1>Login</h1>
                    <input type="text"
                        placeholder='username'
                        name='username'
                        onChange={handleChange}
                     />

                     <input type="password"
                        placeholder='password'
                        name='password'
                        onChange={handleChange}
                     />
                     <button type='submit'>Login</button>
                      {err && err}
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginCard

