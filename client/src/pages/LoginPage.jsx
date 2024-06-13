import { useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, setError, Login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
    Login({ username, password });
    console.log(Login({ username, password }));
    } catch (error) {
      setError(error.message)
      throw error
    }
    setUsername("")
    setPassword("");
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
      <h1>Login</h1>
        {error && <p className="error">{error}</p>}
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
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Login</button>
        <small>
          Don't have an account yet? <Link to={"/register"}>Sign Up</Link>
        </small>
        </form>
    </div>
  );
};
export default LoginPage;
