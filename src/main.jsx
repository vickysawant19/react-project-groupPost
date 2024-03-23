import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { config } from "dotenv";
// config();

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./components/pages/Login.jsx";

import ErrorPage from "./components/pages/ErrorPage.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import ProtectedRoute from "./components/private/ProtectedRoute.jsx";
import Home from "./components/private/Home.jsx";

import Posts from "./components/private/Posts.jsx";
import Post from "./components/private/Post.jsx";
import PostForm from "./components/private/PostForm.jsx";

import EditPost from "./components/private/EditPost.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route element={<ProtectedRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="addpost" element={<PostForm />} />
        <Route path="posts" element={<Posts />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="editpost/:id" element={<EditPost />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
