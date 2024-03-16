import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./store/userSlice";
import authService from "./appwrite/auth";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // const userData = useSelector(selectUser);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="bg-[#52718F] w-full min-h-screen">
          <NavBar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
