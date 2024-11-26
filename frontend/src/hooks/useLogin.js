import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useLogin = (x) => {
  const [loading, setLoading] = useState(false);
  const { authuser, setAuthuser } = useAuthContext();
  const login = async (x) => {
    const success = handleinputError(x);
    if (!success) return null; // will not continue
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      setAuthuser(data);
      localStorage.setItem("chat-user", JSON.stringify(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
const handleinputError = (x) => {
  if (!x.username || !x.password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
};
