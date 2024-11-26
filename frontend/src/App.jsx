import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/singup/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
function App() {
  const { authuser, setAuthuser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authuser ? <Home /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/login"
          element={authuser ? <Navigate to={"/"} /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={authuser ? <Navigate to={"/"} /> : <SignUp />}
        ></Route>
      </Routes>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Toaster />
    </div>
  );
}

export default App;
