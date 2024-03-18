import { useEffect, useState } from "react";
import NavBar from "./components/pages/NavBar";
import Login from "./components/pages/Login";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./store/userSlice";
import authService from "./appwrite/auth";
import Footer from "./components/pages/Footer";

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
