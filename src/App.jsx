import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./pages/HomePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ActivationCode from "./components/auth/ActivationCode";

import ProtectedRoute from "./routes/ProtectedRoute";
import UpdateProfileInfo from "./components/profile/UpdateProfileInfo";
import ProfileContentIndex from "./components/profile/ProfileContentIndex";
import UpdataProfilePicture from "./components/profile/UpdataProfilePicture";
import UpdatePassword from "./components/profile/UpdatePassword";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProfileDashboard from "./components/profile/profileDashboard";
import GetAllUsers from "./components/Admin/GetAllUsers";
import AdminRoute from "./routes/AdminRoute";
import SingleUser from "./components/Admin/SingleUser";
import CreateCourse from "./components/Admin/course/CreateCourse";
import CourseDetails from "./components/Admin/course/CourseDetails";
import CourseList from "./components/Admin/course/CourseList";
import GetAllCourses from "./components/courses/GetAllCourses";

//import UpdateProfileInfo from "./components/profile/UpdateProfileInfo";
//import ProfileIndexPage from "./components/profile/ProfileIndexPage";

const App = () => {
  return (
    <Fragment>
      <Router>
        <section id="navbar">
          <article className="container">
            <aside className="top_header">
              <Navbar />
            </aside>
            <main className="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Auth section */}
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/activate" element={<ActivationCode />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/course/:id" element={<CourseDetails/>}/>
                <Route path="/courses" element={<GetAllCourses/>}/>

                {/* Authenticated Routes */}

                <Route element={<ProtectedRoute />}>
                  <Route path="/user/profile" element={<ProfileDashboard/>}>
                  <Route index element={<ProfileContentIndex  />} />
                  <Route path="update-user-info" element={<UpdateProfileInfo />} />
                  <Route path="update-profile-picture" element={<UpdataProfilePicture/>} />
                  <Route path="update-password" element={<UpdatePassword/>}/>
                  </Route>
               




                
                {/*------------ADMIN routes -------------------*/}
                <Route element={<AdminRoute />}>
                  <Route path="admin/admin-dashboard" element={<AdminDashboard />}>
                      <Route path="users" element={<GetAllUsers/>}/>
                      <Route path="courses" element={<CourseList />} />
                      </Route>
                      <Route path="user/:id" element={<SingleUser/>}/>
                      <Route path="/course/create-course" element={<CreateCourse/>}/>
                       <Route path="/course/create-course/:id" element={<CreateCourse/>}/>

                      

                  </Route>
                   </Route>
                  
                 
             

               
                

              </Routes>
            </main>
          </article>
        </section>
      </Router>
    </Fragment>
  );
};

export default App;
