import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import RegisterPage from "../components/pages/RegisterPage/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import BlogPage from "../components/pages/BlogPage/BlogPage";
import authorities from "../config/Authorities";
import AddBlogForm from "../components/pages/BlogPage/AddBlogForm";
import AboutMe from "../components/pages/AboutMe";
import UpdateBlogForm from "../components/pages/BlogPage/UpdateBlogForm";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/register"} element={<RegisterPage />} />
      <Route path={"/blogs"} element={<BlogPage />} />
      <Route path={"/blogs/addBlog"} element={<PrivateRoute authorities={[{id:"",name:authorities.USER_DEFAULT}]} element={<AddBlogForm />} />} />
      <Route path={"/aboutme"} element={<PrivateRoute authorities={[{id:"",name:authorities.USER_DEFAULT}]} element={<AboutMe />} />} />

      <Route
        path="/blogs/:id"
        element={
          <PrivateRoute authorities={[{id:"", name:authorities.USER_MODIFY}]} element={<UpdateBlogForm />}></PrivateRoute>
        }
      />


      <Route
        path={"/users"}
        element={<PrivateRoute authorities={[{id:"",name:authorities.USER_DELETE}]} element={<UserTable />} />}
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute authorities={[{id:"", name:authorities.USER_MODIFY}]} element={<UserPage />}></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute authorities={[{id:"", name:authorities.USER_MODIFY}]} element={<UserPage />}></PrivateRoute>
        }
      />
      <Route path="/unauthorized" element={<h1>You're not authorized you hacker!</h1>} />
{
      <Route path="*" element={<h1>404 Not Found</h1>} />
}
    </Routes>
  );
};

export default Router;
