import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./_adminSidebar.module.css";

const AdminSidebar = () => {
  const [courseOpen, setCourseOpen] = useState(false);

  return (
    <aside className={Styles.sidebar}>

      <h2>Admin Dashboard</h2>

      {/* Users */}
      <Link
        to="/admin/admin-dashboard/users"
        className={Styles.main_link}
      >
        Users
      </Link>

      {/* Courses */}
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

        {/* Course Dropdown */}
        {courseOpen && (
          <div className={Styles.sub_menu}>

            <Link to="/course/create-course">
              Create Course
            </Link>

            <Link to="/course/update-course">
              Update Course
            </Link>

          </div>
        )}

      </div>

    </aside>
  );
};

export default AdminSidebar;