import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { authuser, setAuthuser } = useAuthContext();
  const signup = async (x) => {
    const success = handleinputError(x);
    if (!success) return null; // will not continue
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
      });
      const data = await res.json();
      // console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      setAuthuser(data);
      localStorage.setItem("chat-user", JSON.stringify(data));
    } catch (error) {
      console;
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
}

export default useSignup;
const handleinputError = (x) => {
  if (
    !x.fullName ||
    !x.username ||
    !x.password ||
    !x.confirmPassword ||
    !x.gender
  ) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (x.password.length < 6) {
    toast.error("Pass must be at least 6 characters!!");
    return false;
  }
  if (x.password !== x.confirmPassword) {
    toast.error("Pass and Confirm dont match!!!");
    return false;
  }
  return true;
};
