import  { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {error, setError, Register } = useAuth();

  const validatePassword = (e, EnteredPassword) =>{
    e.preventDefault()
    EnteredPassword = e.target.value
    let hasCapitalLetter = false
    let hasSymbol = false
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?"

    for (let i = 0; i < EnteredPassword.length; i++) {
      const char = formData.password[i]
      if (char >= "A" && char <= "Z") hasCapitalLetter = true
      if (symbols.includes(char)) hasSymbol = true
    }

    if (!hasCapitalLetter || !hasSymbol) {
      return "Password must include one capital letter and one symbol"
    }
  } 
  

  const handleRegister = (e) =>{
    e.preventDefault()
    if (!username.trim() || !password.trim() || !email.trim()) return;
    try {
      Register({email, username, password})
      if(!password.value.match(requiredPassword)) throw Error ("Password must contain one ")
    } catch (error) {
      setError(error.message)
      throw error
    }
    setEmail("")
    setUsername("")
    setPassword("");
  }

  return (
    <div className="register-container">
        <form onSubmit={handleRegister}>
        <h1>Register</h1>
          {error && <p className="error">{error}</p>}
          <label htmlFor="email">Email</label>
          <input
            required
            value={email}
            type="email"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          ></input>
           <label htmlFor="username">Username</label>
          <input
            required
            value={username}
            type="text"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input 
            required
            value={password}
            type="password"
            minLength={4}
            maxLength={8}
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button>Sign Up</button>
          <small>
          Already have an account? <Link to={"/login"}>Sign In</Link>
        </small>
        </form>
      </div>
  ) 
};

export default RegisterPage;
