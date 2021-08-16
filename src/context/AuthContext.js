import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const authToken = localStorage.getItem("token");
/*   const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId"); */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => authToken && setIsAuthenticated(true), [authToken]);

  const signUp = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError("Passwords do not match");
      setTimeout(() => setError(null), 3000);
      return;
    }
    try {
      setLoading(true);
      const {
        data: { token, userName, userId },
      } = await axios.post(
        `${process.env.REACT_APP_POKEBACKEND_API}auth/signup`,
        data
      );
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      } else {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    }
  };

  const signIn = async (data) => {
    try {
      setLoading(true);
      const {
        data: { token, userName, userId },
      } = await axios.post(
        `${process.env.REACT_APP_POKEBACKEND_API}auth/signin`,
        data
      );
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      } else {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, error, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
