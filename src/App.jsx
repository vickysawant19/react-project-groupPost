import { useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-[#52718F] w-full min-h-screen">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
