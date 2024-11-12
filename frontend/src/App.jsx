import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/singup/SignUp";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Home />
      {/* <Login /> */}
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
