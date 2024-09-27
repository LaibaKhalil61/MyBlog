import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../context';
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post("http://localhost:3004/api/user/signup", {
        email: email,
        username: username,
        password: password
      })
      if (result.status === 200) {
        setLoading(false)
        navigate("/login")
      }
    } 
    catch (err) {
       // server side error
      if (err.response) {
        console.log(err.response);
        alert(`Error: ${err.response.data}`);
      }
      else {
        // network error 
        alert(`Error: ${err.message}`);
      }
    }
    finally {
      setLoading(false)
    }
  }
  // Redirecting to home page
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, navigate])
  
  return (
    <div className='px-5 lg:px-16 xl:px-32 2xl:px-52'>
      {!loading ? <>
        <h2 className='font-bold text-4xl text-center mb-5'>Register</h2>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center'>
          <input
            className='mb-3 py-2 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 2xl:w-1/3 px-3 rounded-sm'
            style={{ border: "1px solid #374151" }}
            name="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" />
          <input
            className='mb-3 py-2 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 2xl:w-1/3 px-3 rounded-sm'
            style={{ border: "1px solid #374151" }}
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" />
          <input
            className='mb-3 py-2 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 2xl:w-1/3 px-3 rounded-sm'
            style={{ border: "1px solid #374151" }}
            name="password"
            required
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" />
          <button type="submit" className='py-2 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 2xl:w-1/3 rounded-sm text-white' style={{ backgroundColor: "#374151", cursor: "pointer" }}>Sign up</button>
        </form>
      </> : <>Loading ....</>}
    </div>
  )
}

export default Signup