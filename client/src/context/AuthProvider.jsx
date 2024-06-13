import { createContext, useContext, useEffect, useState } from "react";
import storageService from "../services/storageService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(storageService.getLoggedInUser());
  const navigate = useNavigate();

  useEffect(() => {
    //checking user is logged
    const loggedInUser = storageService.getLoggedInUser()
    if (loggedInUser) {
      setUser(loggedInUser)
    }
    setError("")
  }, [navigate]);

  const Login = ({username, password}) => {
    const usersList = storageService.getUsers();
    const foundUser = usersList.find((user) => user.username === username);
    console.log(usersList);
    try {
      if (!foundUser) throw Error("User not found.");
      if (foundUser.password !== password) throw Error("Incorrect password.");
    } catch (error) {
      setError(error.message);
      setUser(null)
      throw error;
    }
    storageService.saveLoggedInUser(foundUser);
    setUser(foundUser);
    navigate("/home")
    return foundUser;
  };
  const Register = ({email, username, password}) => {
    const usersList = storageService.getUsers();
    const verifiedEmail = usersList.find((user) => user.email === email);
    const verifiedUsername = usersList.find(
      (user) => user.username === username
    );
    try {
      if (verifiedEmail)
        throw Error("There is already an account with that email.");
      if (verifiedUsername) throw Error("Username is already taken.");
    } catch (error) {
      setError(error.message);
      throw error;
    }
    const newUser = {
      email,
      username,
      password,
    };
    storageService.saveUser([...usersList, newUser]);
    navigate("/login");
  };
  const Logout = () => {
    storageService.clearAll();
    setUser(null);
    navigate("/login")
  };
  const value = {
    user,
    setUser,
    error,
    setError,
    Login,
    Register,
    Logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
