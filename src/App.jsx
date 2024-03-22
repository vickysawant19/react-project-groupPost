import { useEffect, useState } from "react";
import NavBar from "./components/pages/NavBar";
import Login from "./components/pages/Login";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./store/userSlice";
import authService from "./appwrite/auth";
import Footer from "./components/pages/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const checkUserStatus = async () => {
    try {
      setIsLoading(true);
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(login(user));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <>
      <div className="bg-[#52718F] w-full min-h-screen">
        <NavBar />
        {isLoading ? (
          " Loading..."
        ) : (
          <div className="min-h-screen">
            <Outlet />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
