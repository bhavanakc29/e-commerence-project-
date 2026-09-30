import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./_adminSidebar.module.css";

const AdminSidebar = () => {
  const [courseOpen, setCourseOpen] = useState(false);

  return (
    <aside className={Styles.sidebar}>

      <h2>Admin Dashboard</h2>

      <Link
        to="/admin/admin-dashboard/users"
        className={Styles.main_link}
      >
        Users
      </Link>

      <div className={Styles.course_menu}>

        <button
          type="button"
          className={Styles.course_button}
          onClick={() => setCourseOpen((previous) => !previous)}
        >
          <span>Courses</span>

          <span className={Styles.arrow}>
            {courseOpen ? "▲" : "▼"}
          </span>
        </button>

        {courseOpen && (
          <div className={Styles.sub_menu}>

            <Link to="/course/create-course">
              Create Course
            </Link>

            <Link to="/admin/admin-dashboard/courses">
              View Courses
            </Link>

          </div>
        )}

      </div>

    </aside>
  );
};

export default AdminSidebar;